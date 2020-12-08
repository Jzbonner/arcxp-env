import React from 'react';
import './default.scss';

const PaywallLimitMessage = () => <div className="c-section inline-body subscribe-bar" id="paywallContainer" amp-access="Error != true AND AccessLevel != 'Full Content Access'" amp-access-hide>
  <div className="contener container-fluid">
    <div className="custom-tmpl-wrapper" id="inlineSubscribe">
      <div className="row heading center">
        <div className="col-xs-12 heading">Subscribe Now to Keep Reading</div>
      </div>
      <div className="row center">
        <div className="col-xs-12 center text">We count on our readers to help fund the journalists who keep you informed of what&apos;s really going on. Subscribe now to get complete access to The Atlanta-Journal Constitution.</div>
      </div>
      <div className="row center btn-container" data-nxt-template-substep="SubstepName">
        <div amp-access='UserState != "Subscribed"' amp-access-hide>
          <a on="tap:amp-access.login-SubscribeInMarket" data-mg2-action="click" className="btn-link" data-mce-href="{{Subscribe}}" >
            <button className="btn">Subscribe for $9.99/Month</button>
          </a>
        </div>
        <div amp-access='UserState = "LoggedOut"' amp-access-hide>
          <a on="tap:amp-access.login-loginEmbedded" data-mg2-action="login" className="btn-link" data-mce-href="#" data-mce-selected="1" amp-access="AccessLevel != 'Full Content Access'">
            <button className="btn"> Already have an account? <br />Log In </button>
          </a>
        </div>
      </div>
      <div className="row center link-container" amp-access='UserState != "LoggedOut" AND UserState != "Subscribed"' amp-access-hide>
        <a on="tap:amp-access.login-activateEmbedded" data-mg2-action="activation" data-mce-href="#" >Already a Print Subscriber? <br />Access your digital products.</a>
      </div>
    </div>
  </div>
</div>;

export default PaywallLimitMessage;
