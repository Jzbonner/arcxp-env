import React from 'react';
import { useAppContext } from 'fusion:context';
import './default.scss';

const sectionLabel = () => {
  const context = useAppContext();
  const { globalContent } = context;
  const {
    taxonomy: {
      primary_section: { path, name },
    },
  } = globalContent || {};
  if (!path && !name) return null;
  return (
    <a className="section-label" href={path}>
      {name}
    </a>
  );
};

export default sectionLabel;
