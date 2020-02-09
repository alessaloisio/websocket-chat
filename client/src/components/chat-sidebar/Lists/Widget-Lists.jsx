import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchListComplete } from "../../../redux/actions/sidebar";

import List from "./Widget-Lists-Element";

const WidgetLists = () => {
  const dispatch = useDispatch();
  const sidebar = useSelector(state => state.sidebar.data);

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

export default WidgetLists;
