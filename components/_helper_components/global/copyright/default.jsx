import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import copyrightFilter from '../../../../content/filters/copyright';
import '../../../../src/styles/container/_c-copyright.scss';
import getCopyLinks from '../../../layouts/_helper_functions/getCopyLinks';
import BackToTop from '../../backToTop/default';

const Copyright = ({ isSidebar, cssClass = '', hideBackToTop = false }) => {
  const siteContent = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'BottomNavTermsOfUse',
    },
    filter: copyrightFilter,
  });

  const { children } = siteContent || {};
  const [ajc = [], visitor_agreement = [], privacy_policy = [], ad_choices = [], careers = [], ccpa = []] = children || [];

  const ajcName = ajc.navigation && ajc.navigation.nav_title;
  const visitorAgreementName = visitor_agreement.navigation && visitor_agreement.navigation.nav_title;
  const privacyPolicyName = privacy_policy.navigation && privacy_policy.navigation.nav_title;
  const adChoicesName = ad_choices.navigation && ad_choices.navigation.nav_title;
  const careersName = careers.navigation && careers.navigation.nav_title;
  const ccpaName = ccpa.navigation && ccpa.navigation.nav_title;

  const year = new Date().getFullYear();

  return (
    <div className="copyright-wrapper b-sectionHomeMaxWidth">
      <div className="c-copyright">
        <div className={`copyright ${cssClass}`}>
          <div className="rights">
            &copy; {year} {ajcName}. {!isSidebar && <br />} All Rights Reserved. {!isSidebar && <br />}
          </div>
        By using this website, you accept the terms of our{' '}
          <div className="privacy">
            <a href={getCopyLinks(visitor_agreement)}>{visitorAgreementName}</a>,{' '}
            <a href={getCopyLinks(privacy_policy)}>{privacyPolicyName}</a>, <a href={getCopyLinks(ccpa)}>{ccpaName}</a>, and understand your options regarding{' '}<a href={getCopyLinks(ad_choices)}>{adChoicesName}</a>.
        </div>
          <div className="learn-more">
            {isSidebar ? <a href={getCopyLinks(careers)}><span>Learn about</span> {careersName}.</a> : <a href={getCopyLinks(careers)}>Learn about {careersName}.</a>}
        </div>
        </div>
        {!isSidebar && !hideBackToTop && <BackToTop />}
      </div>
    </div>
  );
};

Copyright.propTypes = {
  isSidebar: PropTypes.bool,
  cssClass: PropTypes.string,
  hideBackToTop: PropTypes.bool,
};

export default Copyright;
