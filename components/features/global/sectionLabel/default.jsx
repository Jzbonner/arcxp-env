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
  const sectionPath = path || null;
  const sectionName = name || null;

  return (
    <a className="section-label" href={sectionPath}>
      {sectionName}
    </a>
  );
};

export default sectionLabel;
