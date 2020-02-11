import React from 'react';
import { useContent } from 'fusion:content';
import './default.scss';
import getLinkURL from '../../layouts/_helper_functions/getLinkUrl';

const Copyright = () => {
  const siteContent = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'BottomNavTermsOfUse',
    },
  });


  const { children } = siteContent || {};
  const [ajc = [], visitor_agreement = [], privacy_policy = [], ad_choices = [], careers = []] = children || [];

  const year = new Date().getFullYear();

  return (
    <div className="c-copyright">
      &copy; {year} <a href={getLinkURL(ajc)}>{ajc.name}.</a> All Rights Reserved. By using this website, you accept the terms of our{' '}
      <a href={getLinkURL(visitor_agreement)}>{visitor_agreement.name}</a> and{' '}
      <a href={getLinkURL(privacy_policy)}>{privacy_policy.name}</a>, and understand your options regarding{' '}
      <a href={getLinkURL(ad_choices)}>{ad_choices.name}</a>. Learn about <a href={getLinkURL(careers)}>{careers.name}</a> at Cox
      Enterprises.
    </div>
  );
};
export default Copyright;
