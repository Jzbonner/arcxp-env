import React from 'react';
import { useContent } from 'fusion:content';

const Footer = () => {
  const siteContent = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'BottomNav',
    },
  });

  const { children } = siteContent || {};
  const [row2_col1 = [], row2_col2 = [], row2_col3 = [], row2_col4 = []] = children || [];

  return (
    <footer className="b-placeholder c-footer">
      <div className="row-1">Logo | Sign Up For Newsletter</div>
      <div className="row-2">
        <ul>
          <li>{row2_col1.name}</li>
          {row2_col1.children && row2_col1.children.map((val, i) => <li key={i}>{val.name}</li>)}
        </ul>
        <ul>
          <li>{row2_col2.name}</li>
          {row2_col2.children && row2_col2.children.map((val, i) => <li key={i}>{val.name}</li>)}
        </ul>
        <ul>
          <li>{row2_col3.name}</li>
          {row2_col3.children && row2_col3.children.map((val, i) => <li key={i}>{val.name}</li>)}
        </ul>
        <ul>
          <li>{row2_col4.name}</li>
          {row2_col4.children && row2_col4.children.map((val, i) => <li key={i}>{val.name}</li>)}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
