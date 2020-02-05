import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { fetchListComplete } from "../../redux/actions/sidebar";

import List from "./Widget-Lists-Element";

// const list = [
//   {
//     _id: "123456789",
//     username: "Alicia",
//     avatar: "https://i.pravatar.cc/32",
//     status: "busy",
//     unread: 2
//   }
// ];

const WidgetLists = props => {
  const { dispatch, sidebar } = props;

  useEffect(() => {
    dispatch(fetchListComplete());
  }, []);

  return <div></div>;

  // <List name="Favorites" list={list} />
};

export default connect(state => ({
  sidebar: state.sidebar
}))(WidgetLists);
