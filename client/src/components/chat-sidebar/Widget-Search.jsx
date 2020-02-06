import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { searchSelectRoom } from "../../redux/actions/room";

const WidgetSearch = props => {
  // MANAGE STATES
  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  const handleSearch = async e => {
    const value = e.target.value;
    setSearchInput(value);

    // Search User
    const users = await axios.get(`/users/search/${value}`);
    setUsers(users.data.data || []);

    // Search Groups
    const groups = await axios.get(`/groups/search/${value}`);
    setGroups(groups.data.data || []);
  };

  const handleElement = id => {
    props.dispatch(searchSelectRoom(id));

    setSearchInput("");
    setUsers([]);
    setGroups([]);
  };

  // SHOW AUTOCOMPLETE WHEN "searchInput" change
  const autocomplete = () => {
    const data = {
      users,
      groups
    };

    return (
      <div className="autocomplete">
        {Object.keys(data).map(key => {
          if (data[key].length > 0) {
            return (
              <>
                <span className="title">{key}</span>
                <ul className={key}>
                  {data[key].map(element => (
                    <li
                      key={element._id}
                      onClick={() => handleElement(`${element._id}`)}
                    >
                      <img src={element.info.avatar} alt="Avatar" />
                      <p>{element.info.name}</p>
                    </li>
                  ))}
                </ul>
              </>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="Widget-Search">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={e => handleSearch(e)}
        />
        <button>
          <i className="flaticon-loupe"></i>
        </button>
      </div>

      {autocomplete()}
    </div>
  );
};

export default connect()(WidgetSearch);