import React from "react";
import { useContent } from "fusion:content";

const ListItemPreview = ({ id }) => {
  const storyData = useContent({
    source: "content-api",
    query: {
      id
    }
  });

  console.log(storyData);

  if (storyData && storyData.headlines && storyData.headlines.web) {
    return <div>{storyData.headlines.web}</div>;
  } else if (
    storyData &&
    storyData.content_elements[0] &&
    storyData.content_elements[0].type === "text"
  ) {
    return <div>{storyData.content_elements[0].content}</div>;
  } else {
    return null;
  }
};

export default ListItemPreview;
