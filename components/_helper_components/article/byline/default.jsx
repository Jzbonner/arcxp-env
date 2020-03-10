import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const Byline = ({ by = [] }) => {
  let byline;

  const handleOrganization = (authors = []) => {
    const authorsAndOrgs = authors.map((author) => {
      // staff
      if (author.isStaff && author.affiliations) return { name: author.name, org: author.affiliations, url: author.url };

      // external
      if (author.org && !author.affiliations) return { name: author.name, org: author.org };

      // unknown org
      if (!author.org && !author.affiliations) return { name: author.name, org: null };

      return null;
    });

    return authorsAndOrgs;
  };

  const handleAuthors = (authors = []) => {
    const bylineData = authors.map((author, i) => {
      const { url } = author || {};

      if (!author.name) return null;
      // multiple authors
      if (authors.length > 1) {
        return <span key={author.name}>
          {i === 0 && 'By '}
          { url && <a href={url || '/staff'}>{author.name}</a> }
          { !url && author.name }
          {author.org ? `  -  ${author.org}` : ''}
        </span>;
      }
      // only one author
      return <span key={author.name}>
        {i === 0 && 'By '}
        { url && <a href={url || '/staff'}>{author.name}</a> }
        { !url && author.name }
        {author.org ? `,  ${author.org}` : ''}
      </span>;
    });
    return bylineData;
  };

  const finalizeByline = (authors = []) => {
    const finalAuthorData = handleOrganization(authors);
    const bylineData = handleAuthors(finalAuthorData);
    byline = bylineData;
  };

  if (by.length > 0) {
    const authors = by.map((element) => {
      let isStaff = false;

      if (element._id) isStaff = true;

      return {
        name: (element.additional_properties
              && element.additional_properties.original
              && element.additional_properties.original.byline) || element.name,
        org: element.org,
        affiliations: element.additional_properties
          && element.additional_properties.original
          && element.additional_properties.original.affiliations,
        isStaff,
        url: element.url,
      };
    });
    finalizeByline(authors);
  }

  return byline ? <div className="byline b-margin-bottom-d40-m20">{byline}</div> : null;
};

Byline.propTypes = {
  by: PropTypes.array,
};

export default Byline;
