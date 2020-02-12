import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const Byline = ({ by = [] }) => {
  let byline;

  const handleOrganization = (authors = []) => {
    // cleans up authors array items

    const authorsAndOrgs = authors.map((author) => {
      if (author.affiliations) {
        return {
          name: author.name,
          org: author.affiliations,
        };
      }
      if (author.org && !author.affiliations) {
        return {
          name: author.name,
          org: author.org,
        };
      }
      if (!author.org && !author.affiliations) {
        return {
          name: author.name,
          org: null,
        };
      }

      return null;
    });

    console.log('authors after organize', authorsAndOrgs);

    return authorsAndOrgs;
  };

  const handleMultipleAuthors = (authors = []) => {
    const bylineData = authors.map((author, i) => {
      if (author.name) {
        return <span key={author.name}>{i === 0 && 'By '}<a href="#">{author.name}</a>{author.org ? `  -  ${author.org}` : ''}</span>;
      }
      return null;
    });
    return bylineData;
  };

  const handleSingleAuthor = (authors = []) => {
    const bylineData = authors.map((author, i) => {
      if (author.name) {
        return <span key={author.name}>{i === 0 && 'By '}<a href="#">{author.name}</a>{author.org ? `,  ${author.org}` : ''}</span>;
      }

      return null;
    });
    return bylineData;
  };

  const finalizeByline = (authors = []) => {
    // multiple authors //
    if (authors.length > 1) {
      const finalAuthorData = handleOrganization(authors);
      const bylineData = handleMultipleAuthors(finalAuthorData);
      byline = bylineData;
    } else {
      // only one author //
      const finalAuthorData = handleOrganization(authors);
      const bylineData = handleSingleAuthor(finalAuthorData);
      byline = bylineData;
    }
  };

  if (by.length > 0) {
    let organization = null;
    const authors = by.map((element) => {
      if (!organization && (typeof element.org !== 'undefined' || element.org !== '')) {
        organization = {
          orgName: element.org,
        };
      }

      return {
        name: element.name,
        org: element.org,
        affiliations: element.additional_properties
          && element.additional_properties.original
          && element.additional_properties.original.affiliations,
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
