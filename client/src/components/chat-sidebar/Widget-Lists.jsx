import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchListComplete } from "../../redux/actions/sidebar";

import List from "./Widget-Lists-Element";

const WidgetLists = props => {
  const { dispatch, sidebar } = props;

  useEffect(() => {
    dispatch(fetchListComplete());
  }, []);

  return (
    <>
      {sidebar &&
        Object.keys(sidebar).map(key => {
          if (sidebar[key].length)
            return <List name={key} list={sidebar[key]} />;
        })}
    </>
  );
};

export default connect(state => ({
  sidebar: state.sidebar.data
}))(WidgetLists);
