import { Router } from "express";
import axios from "axios";

import User from "../models/user";

const router = new Router();

/**
 * Authorize requestCode from Github Application Callback
 */
router.get("/authorize", async (req, res) => {
  const requestCode = req.query.code;
  const clientID = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  // Get user Github access_token
  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestCode}`,
    headers: {
      accept: "application/json"
    }
  })
    .then(async response => {
      const access_token = response.data.access_token;
      await addUserInfoToDatabase(access_token);

      // TODO : change to a react link => save access_token to localStorage
      res.redirect(`/login?access_token=${access_token}`);
    })
    .catch(response =>
      // Catch error from first axios request or from addUserToDatabase
      res.status(401).json({
        message: response.data
          ? response.data.error_description
          : response.message
      })
    );
});

/**
 * Validate access_token and get User Information
 */
router.get("/validate", async (req, res) => {
  const accessToken = req.query.access_token || false;
  const github = req.query.info || false;

  if (accessToken)
    getGithubUserInfo(accessToken)
      .then(async response => {
        if (github) res.json(response);
        else {
          // get user info from db
          const user = await User.findById(response.data.id);
          res.json({
            data: user
          });
        }
      })
      .catch(error => res.status(401).json(error));
});

/**
 *  Get Github user information
 * @param {string} accessToken Access token recovered from authorize route
 */
const getGithubUserInfo = accessToken => {
  return new Promise(async (resolve, reject) => {
    try {
      // Get User info
      const { data } = await axios({
        method: "get",
        url: "https://api.github.com/user",
        headers: {
          Authorization: `token ${accessToken}`
        }
      });

      resolve({ data: data });
    } catch (error) {
      // Maybe not a good access_token
      reject({ message: error.response.data.message });
    }
  });
};

/**
 *  Save / Update Github user information on database
 * @param {string} accessToken Access token recovered from authorize route
 */
const addUserInfoToDatabase = accessToken => {
  return new Promise(async (resolve, reject) => {
    getGithubUserInfo(accessToken)
      .then(async response => {
        const { data } = response;

        const user = new User();

        user._id = data.id;
        user.email = data.email;
        user.login = data.login;

        user.info = {};
        user.info.avatar = data.avatar_url;
        user.info.name = data.name;
        user.info.bio = data.bio;

        if (data.blog.length > 0) {
          user.info.links = { blog: data.blog };
        }

        //save | update user on database
        User.updateOne({ _id: data.id }, user, { upsert: true })
          .then(() => resolve(true))
          .catch(() => resolve(true));
      })
      .catch(error => reject(error));
  });
};

export default router;
