import React from "react";
import "./default.scss";

const Row = props => {
  return <div className="row">{props.children}</div>;
};

export default Row;
