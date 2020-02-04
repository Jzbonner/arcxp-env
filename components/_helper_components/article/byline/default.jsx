import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const Byline = ({ by = [] }) => {
  let byline;

  const handleMultipleAuthors = (authors = [], hasOrganization = false) => {
    const bylineData = authors.map((element, i) => {
      if (element.orgName && element.orgName !== '') {
        return <span key={element.name}>, {element.orgName}</span>;
      }

      if (element.name === 'and') {
        return <span key={element.name}> {element.name} </span>;
      }

      if ((i === authors.length - 1 && !hasOrganization) || i === authors.length - 2 || (authors[i + 1] && authors[i + 1].name === 'and')) {
        return <a key={element.name} href="#">{element.name}</a>;
      }

      return <span key={element.name}><a href="#">{element.name ? `${element.name}` : null}</a>, </span>;
    });

    return bylineData;
  };

  const handleSingleAuthor = (authorData = []) => {
    const bylineData = authorData.map((element, i) => {
      if (element.orgName) {
        return <span key={element.name}>, {element.orgName}</span>;
      }

      if (i === authorData.length - 1 && !element.orgName) {
        return <a key={element.name} href="#">{element.name} </a>;
      }

      return <a key={element.name} href="#">{element.name}</a>;
    });

    return bylineData;
  };

  const handleOrganization = (authors = [], organization = {}, isStaff = false) => {
    const [firstAuthor] = authors;

    if (!isStaff) {
      if (organization.orgName !== '') {
        authors.push(organization);
      }
    } else if (isStaff && authors.length === 1 && firstAuthor && firstAuthor.affiliations) {
      authors.push({ orgName: firstAuthor.affiliations });
    } else {
      authors.push({ orgName: 'The Atlanta Journal-Constitution' });
    }

    return authors;
  };

  const finalizeByline = (authors = [], organization = {}, isStaff = false) => {
    const { orgName = '' } = organization;
    const hasOrganization = !!orgName;

    // multiple authors //
    if (authors.length > 1) {
      authors.splice(authors.length - 1, 0, { name: 'and' });
      const finalAuthorData = handleOrganization(authors, organization, isStaff);
      const bylineData = handleMultipleAuthors(finalAuthorData, hasOrganization);
      byline = bylineData;
    } else {
      // only one author //
      const finalAuthorData = handleOrganization(authors, organization, isStaff);
      const bylineData = handleSingleAuthor(finalAuthorData);
      byline = bylineData;
    }
  };

  if (by.length > 0) {
    let organization = null;
    let isStaff = false;

    const authors = by.map((element) => {
      if (!organization && (typeof element.org !== 'undefined' || element.org !== '')) {
        organization = {
          orgName: element.org,
        };
      }

      if (element._id) {
        isStaff = true;
      }

      return {
        name: element.name,
        org: element.org,
        affiliations: element.additional_properties
          && element.additional_properties.original
          && element.additional_properties.original.affiliations,
      };
    });

    finalizeByline(authors, organization, isStaff);
  }

  return byline ? <div className="byline b-margin-bottom-d40-m20">By {byline}</div> : null;
};

Byline.propTypes = {
  by: PropTypes.array,
};

export default Byline;
