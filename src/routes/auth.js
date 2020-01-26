import { Router } from "express";
import axios from "axios";

const router = new Router();

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
    .then(response =>
      res.redirect(`/validate?access_token=${response.data.access_token}`)
    )
    .catch(response =>
      res.status(401).json({
        message: response.data.error_description
      })
    );
});

/**
 * Validate access_token and get User Information
 */
router.get("/validate", async (req, res) => {
  const accessToken = req.query.access_token;

  getGithubUserInfo(accessToken)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.status(401).json(error);
    });
});

export default router;
