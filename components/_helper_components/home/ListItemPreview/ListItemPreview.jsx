import React from "react";
import { useContent } from "fusion:content";
import PropTypes from "prop-types";
import "./default.scss";

const ListItemPreview = ({ id }) => {
  const storyData = useContent({
    source: "content-api",
    query: {
      id
    }
  });

  if (storyData && storyData.headlines && storyData.headlines.web) {
    return <div className="c-listItemPreview">{storyData.headlines.web}</div>;
  }

  if (
    storyData &&
    storyData.content_elements &&
    storyData.content_elements[0] &&
    storyData.content_elements[0].type === "text"
  ) {
    return (
      <div className="c-listItemPreview">
        {storyData.content_elements[0].content}
      </div>
    );
  }
  return null;
};

ListItemPreview.PropTypes = {
  id: PropTypes.string
};

export default ListItemPreview;
