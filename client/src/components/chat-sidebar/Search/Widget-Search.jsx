import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { searchSelectRoom } from "../../../redux/actions/room";

import Autocomplete from "./Autocomplete";

import "./Widget-Search.scss";

const WidgetSearch = props => {
  const dispatch = useDispatch();

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
    dispatch(searchSelectRoom(id));

    // After selection, clear component
    setSearchInput("");
    setUsers([]);
    setGroups([]);
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

      <Autocomplete data={{ users, groups }} handleElement={handleElement} />
    </div>
  );
};

export default WidgetSearch;
