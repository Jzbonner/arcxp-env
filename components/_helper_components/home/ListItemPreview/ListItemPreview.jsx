import React from "react";
import { useContent } from "fusion:content";
import "./default.scss";

const ListItemPreview = ({ id }) => {
  const storyData = useContent({
    source: "content-api",
    query: {
      id
    }
  });

  if (storyData && storyData.headlines && storyData.headlines.web) {
    return <div className="listItemPreview">{storyData.headlines.web}</div>;
  }

  if (
    storyData &&
    storyData.content_elements &&
    storyData.content_elements[0] &&
    storyData.content_elements[0].type === "text"
  ) {
    return (
      <div className="listItemPreview">
        {storyData.content_elements[0].content}
      </div>
    );
  }
  return null;
};

export default ListItemPreview;
