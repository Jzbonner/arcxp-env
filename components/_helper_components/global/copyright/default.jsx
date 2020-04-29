import React from 'react';
import { useContent } from 'fusion:content';
import copyrightFilter from '../../../../content/filters/copyright';
import './default.scss';
import getLinkURL from '../../../layouts/_helper_functions/getLinkUrl';

const Copyright = () => {
  const siteContent = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'BottomNavTermsOfUse',
    },
    filter: copyrightFilter,
  });

  const { children } = siteContent || {};
  const [ajc = [], visitor_agreement = [], privacy_policy = [], ad_choices = [], careers = []] = children || [];

  const ajcName = ajc.navigation && ajc.navigation.nav_title;
  const visitorAgreementName = visitor_agreement.navigation && visitor_agreement.navigation.nav_title;
  const privacyPolicyName = privacy_policy.navigation && privacy_policy.navigation.nav_title;
  const adChoicesName = ad_choices.navigation && ad_choices.navigation.nav_title;
  const careersName = careers.navigation && careers.navigation.nav_title;

  const year = new Date().getFullYear();

  return (
    <div className="c-copyright">
      <div className="copyright">
        &copy; {year} <a href="/">{ajcName}.</a> All Rights Reserved. By using this website, you accept the terms of our{' '}
        <a href={getLinkURL(visitor_agreement)}>{visitorAgreementName}</a> and <a href={getLinkURL(privacy_policy)}>{privacyPolicyName}</a>,
        and understand your options regarding <a href={getLinkURL(ad_choices)}>{adChoicesName}</a>. Learn about{' '}
        <a href={getLinkURL(careers)}>{careersName}</a>.
      </div>
    </div>
  );
};
export default Copyright;
