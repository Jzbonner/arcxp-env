import React from "react";
import { useAppContext } from "fusion:context";

const getMetaValues = () => {
  const appContext = useAppContext();
  const { metaValue } = appContext;

  return { data: metaValue("live") };
};

export default getMetaValues;
