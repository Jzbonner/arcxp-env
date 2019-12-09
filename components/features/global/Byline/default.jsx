import React from 'react';
import { useAppContext } from 'fusion:context';

const Byline = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;

  let byline = null;

  const handleMultipleAuthors = (authors, hasOrganization) => {
    let bylineData = null;

    bylineData = authors.map((element, i) => {
      if (element.orgName && element.orgName !== '') {
        return <span>, {element.orgName}</span>;
      }

      if (element.name === 'and') {
        return <span> {element.name} </span>;
      }

      if ((i === authors.length - 1 && !hasOrganization) || i === authors.length - 2 || (authors[i + 1] && authors[i + 1].name === 'and')) {
        return <a key={element.name} href="#">{element.name}</a>;
      }

      return <span key={element.name}><a href="#">{element.name ? `${element.name}` : null}</a>, </span>;
    });

    return bylineData;
  };

  const handleSingleAuthor = (authorData) => {
    let bylineData = null;

    bylineData = authorData.map((element, i) => {
      if (element.orgName) {
        return <span>, {element.orgName}</span>;
      }

      if (i === authorData.length - 1 && !element.orgName) {
        return <a key={element.name} href="#">{element.name} </a>;
      }

      return <a key={element.name} href="#">{element.name}</a>;
    });

    return bylineData;
  };

  const handleOrganization = (authors, organization, isStaff) => {
    if (!isStaff) {
      if (organization.orgName !== '') {
        authors.push(organization);
      }
    } else {
      authors.push({ orgName: 'The Atlanta Journal-Constitution' });
    }
    return authors;
  };

  const finalizeByline = (authors, organization, isStaff) => {
    let hasOrganization = false;
    const { orgName } = organization;

    if (orgName) {
      hasOrganization = true;
    } else {
      hasOrganization = false;
    }

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


  if (globalContent) {
    let organization = null;
    let isStaff = false;
    const credits = globalContent.credits.by;
    const authors = credits.map((element) => {
      if (!organization && (typeof element.org !== 'undefined' || element.org !== '')) {
        organization = {
          orgName: element.org,
        };
      }

      if (element._id && element._id.toUpperCase().includes('AJC')) {
        isStaff = true;
      }

      return {
        name: element.name,
        org: element.org,
      };
    });
    finalizeByline(authors, organization, isStaff);
  }


  return <div>By {byline || null}</div>;
};


export default Byline;
