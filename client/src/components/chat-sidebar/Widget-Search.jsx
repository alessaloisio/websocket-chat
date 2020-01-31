import React, { useState } from "react";

import axios from "axios";

export default () => {
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
    const groups = await axios.get(`/users/search/${value}`); // TODO: EDIT URL
    setGroups(groups.data.data || []);
  };

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
                    <li key={element.id}>
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
