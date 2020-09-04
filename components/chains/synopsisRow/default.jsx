import React from "react";
import "./default.scss";

const SynopsisRow = props => {
  return (
    <div className="c-synopsis-row b-margin-bottom-d30-m20">
      {props.children}
    </div>
  );
};

export default SynopsisRow;
