import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';
import isOhioSite from '../../global/connext/isOhioSite';

const PaywallLimitMessage = ({ siteFullname }) => {
  let blurb = `We count on our readers to help fund the journalists who keep you informed of what's really going on. Subscribe now to get complete access to The ${siteFullname}.`;
  const offerPrice = '99¢';
  if (isOhioSite(siteFullname)) {
    blurb = `We count on our readers to help fund in-depth local journalism. Subscribe now for unlimited digital access to the ${siteFullname}.`;
  }
  return (
    <div className="c-section inline-body subscribe-bar" id="paywallContainer">
      <div className="custom-tmpl-wrapper" id="inlineSubscribe" amp-access='Error!=true AND AccessLevel!="Full Content Access"' amp-access-hide>
        <div className="row heading center">
          <div className="row heading">Subscribe Now to Keep Reading</div>
        </div>
        <div className="row center">
          <div className="col-xs-12 center text">{blurb}</div>
        </div>
        <div className="row center btn-container" data-nxt-template-substep="SubstepName">
          <a on="tap:amp-access.login-SubscribeFromPaywall" data-mg2-action="click" className="btn-link" data-mce-href="{{Subscribe}}" amp-access='UserState!="Subscribed"' amp-access-hide>
            <button className="btn">Subscribe for {offerPrice}</button>
          </a>
          <a on="tap:amp-access.login-loginEmbedded" data-mg2-action="login" className="btn-link" data-mce-href="#" data-mce-selected="1" amp-access='UserState="LoggedOut"' amp-access-hide>
            <button className="btn"> Already have an account? <br />Log In </button>
          </a>
        </div>
        <div className="row center link-container" amp-access='UserState!="LoggedOut" AND UserState!="Subscribed"' amp-access-hide>
          <a on="tap:amp-access.login-activateEmbedded" data-mg2-action="activation" data-mce-href="#" >Already a Subscriber? <br />Access your digital products.</a>
        </div>
      </div>
    </div>
  );
};

PaywallLimitMessage.propTypes = {
  siteFullname: PropTypes.string,
};

export default PaywallLimitMessage;
