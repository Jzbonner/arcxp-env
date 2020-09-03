import React from "react";
import PropTypes from "prop-types";
import Lead from "./../Lead/default";
import "./default.scss";

const TopPhotoNoPhoto = (customFields = {}) => {
  const newCustomFields = {
    ...customFields,
    customFields: {
      ...customFields.customFields,
      displayClass: "5-Item Feature - No Photo"
    }
  };

  return (
    <div className="topPhotoNoPhoto">
      <Lead {...newCustomFields} />
    </div>
  );
};

TopPhotoNoPhoto.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig(["collections", "query-feed"]).tag({
      name: "Content"
    })
  })
};

export default TopPhotoNoPhoto;
