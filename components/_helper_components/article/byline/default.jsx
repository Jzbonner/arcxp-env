import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import getSponsorData from '../../../layouts/_helper_functions/getSponsorData';
import './default.scss';

const Byline = ({ by = [], sections }) => {
  let byline;

  const appContext = useAppContext();
  const { contextPath } = appContext;

  const handleOrganization = (authors = []) => {
    const authorsAndOrgs = authors.map((author) => {
      // staff
      if (author.isStaff && author.affiliations) {
        return {
          id: author.id,
          name: author.name,
          org: author.affiliations,
          url: author.url,
          status: author.status,
          firstName: author.firstName,
          lastName: author.lastName,
        };
      }

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
      const {
        id, org, name, status,
      } = author || {};

      if (!name) return null;

      const authorUrl = `${contextPath}/staff/${id}/`;

      return <span key={name}>
        {i === 0 && !name.includes('By ') && 'By '}
        {authorUrl && status && <a href={authorUrl}>{name}</a>}
        {(!authorUrl || !status) && name}
        {org ? `${authors.length > 1 ? ' - ' : ', '}${org}` : null}
      </span>;
    });
    return bylineData;
  };

  const sponsorContentLabel = getSponsorData(sections);

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
        id: (element.additional_properties
          && element.additional_properties.original
          && element.additional_properties.original._id) || element._id,
        name: (element.additional_properties
          && element.additional_properties.original
          && element.additional_properties.original.byline) || element.name,
        org: element.org,
        affiliations: element.additional_properties
          && element.additional_properties.original
          && element.additional_properties.original.affiliations,
        status: element.additional_properties
          && element.additional_properties.original
          && element.additional_properties.original.status,
        isStaff,
        url: element.url,
        firstName: (element.additional_properties
          && element.additional_properties.original
          && element.additional_properties.original.firstName) || element.firstName,
        lastName: (element.additional_properties
          && element.additional_properties.original
          && element.additional_properties.original.lastName) || element.lastName,
      };
    });
    finalizeByline(authors);
  }

  if (sponsorContentLabel !== null) {
    return <div className="byline b-margin-bottom-d40-m20">By {sponsorContentLabel}</div>;
  }
  return byline ? <div className="byline b-margin-bottom-d40-m20">{byline}</div> : null;
};

Byline.propTypes = {
  by: PropTypes.array,
  sections: PropTypes.array,
};

export default Byline;
