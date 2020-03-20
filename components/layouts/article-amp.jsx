/*  /components/layouts/article-amp.jsx  */
import React from 'react';
import { useAppContext } from 'fusion:context';

const AmpPageLayout = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;

  if (!globalContent) return null;
  const {
    canonical_url: articleURL,
  } = globalContent || {};

  return (
    <h1>{ articleURL }</h1>
  );
};

export default AmpPageLayout;
