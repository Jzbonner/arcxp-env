import React from 'react';
import { useAppContext } from 'fusion:context';
import './default.scss';

const sectionLabel = () => {
  const context = useAppContext();
  const { globalContent } = context;
  const sectionPath = globalContent.taxonomy.primary_section ? globalContent.taxonomy.primary_section.path : 'No section Label';
  const sectionName = globalContent.taxonomy.primary_section ? globalContent.taxonomy.primary_section.name : 'No section Name';

  return (
    <a className="section-label" href={sectionPath}>
      {sectionName}
    </a>
  );
};

export default sectionLabel;
