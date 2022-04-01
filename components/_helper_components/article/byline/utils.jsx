import React from 'react';
import get from 'lodash/get';

/**
 *
 * @param {Object} author Single author object
 */
const creditParser = (element = {}) => {
  let isStaff = false;
  if (get(element, '_id')) isStaff = true;

  // If the author info is not in site service it returns as a reference on the story not inflated.
  // Simply parse the id and pretty print it.
  const byType = get(element, 'type');
  if (byType === 'reference') {
    const nameArray = get(element, 'referent.id', '')
      .toLowerCase()
      .split('-')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1));
    return {
      id: get(element, '_id'),
      name: nameArray.join(' '),
      isStaff,
      firstName: nameArray[0],
      lastName: nameArray[nameArray.length - 1],
    };
  }

  // Else return the formatted author object adjusted with fallbacks.
  return {
    id: get(element, 'additional_properties.original._id', get(element, '_id')),
    name: get(element, 'additional_properties.original.byline', get(element, 'name')),
    org: get(element, 'org'),
    affiliations: get(element, 'additional_properties.original.affiliations'),
    status: get(element, 'additional_properties.original.status'),
    isStaff,
    url: get(element, 'url'),
    firstName: get(element, 'additional_properties.original.firstName', get(element, 'firstName')),
    lastName: get(element, 'additional_properties.original.lastName', get(element, 'lastName')),
  };
};

/**
 *
 * @param {Array} authors Array of authors
 */
const handleAuthors = (authors = []) => {
  const bylineData = authors.map((author, i) => {
    const {
      id, org, name, status,
    } = author || {};

    if (!name) return null;

    // initial filter to remove numbers (in the case of a single numeric value in Affiliations, which is "true" in this test)
    let finalOrg = (org * 1 > -1) ? null : org;
    if (finalOrg.indexOf(',') > -1) {
      // secondary test for when there are multiple entries; we split & remove those that are numbers ONLY, but allow letters or mixed values to pass through to rendering
      let orgArray = org.split(',');
      orgArray = orgArray.filter(orgPart => orgPart.replace(/[ 0-9]/gi, '').length > 0);
      // if all values were numeric then orgArray is now empty, so we don't want anything to proceed.  otherwise, we rejoin the array of values
      finalOrg = orgArray.length ? orgArray.join(',') : null;
    }

    const authorUrl = `/staff/${id}/`;

    return <span key={name}>
      {i === 0 && !name.includes('By ') && 'By '}
      {authorUrl && status && <a href={authorUrl} rel="author">{name}</a>}
      {(!authorUrl || !status) && name}
      {/* (org * 1 > -1) is a bit of a hack to rule out the use of affiliations for Ohio filtering; AS1-3 */}
      {finalOrg && `${authors.length > 1 ? ' - ' : ', '}${finalOrg}`}
    </span>;
  });
  return bylineData;
};

/**
 *
 * @param {Array} authors Array of authors
 */
const handleOrganization = (authors = []) => authors.map((author) => {
  // staff
  const id = get(author, 'id');
  const isStaff = get(author, 'isStaff');
  const affiliations = get(author, 'affiliations');
  const name = get(author, 'name');
  const url = get(author, 'url');
  const status = get(author, 'status');
  const firstName = get(author, 'firstName');
  const lastName = get(author, 'lastName');
  const org = get(author, 'org');

  if (isStaff && affiliations) {
    return {
      id,
      name,
      org: affiliations,
      url,
      status,
      firstName,
      lastName,
    };
  }

  // external
  if (org && !affiliations) return { name, org };

  // unknown org
  if (!org && !affiliations) return { name, org: null };

  return null;
});

export {
  creditParser,
  handleAuthors,
  handleOrganization,
};
