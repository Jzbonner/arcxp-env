import React from "react";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import fetchEnv from "../../utils/environment";

const isAuthMenu = ({ isMobile, showUserMenu, source, userStateRef }) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const currentEnv = fetchEnv();
  const { connext, cdnSite } = getProperties(arcSite);
  const { siteCode } = connext[currentEnv] || {};

  let connextSite = cdnSite;
  if (arcSite === "dayton") {
    connextSite = "daytondailynews";
  } else if (
    arcSite === "dayton-daily-news" ||
    arcSite === "springfield-news-sun"
  ) {
    connextSite = connextSite.replace(/-/g, "");
  }

  const accountSubdomain = `//${currentEnv !== "prod" ? "test-" : ""}myaccount`;

  const connextDomain = `${accountSubdomain}.${connextSite}.com/${
    siteCode ? siteCode.toLowerCase() : connextSite
  }`;
  const profileLink = `${connextDomain}/myprofile`;

  return (
    <>
      <div>
        <img src={source} />
        <div className="nav-itemText login-text is-profileAuthed">
          My Profile
        </div>
      </div>

      <div
        className={`section is-profileAuthed ${
          isMobile && showUserMenu ? "isVisible" : ""
        }`}
      >
        <div className={"section-item"}>
          <a href={profileLink}>
            <img src={source} />
            <div className="nav-itemText login-text">My Profile</div>
          </a>
        </div>
        <div
          className={`subNav ${isMobile && showUserMenu ? "isVisible" : ""}`}
        >
          {!isMobile && (
            <a href="#" className="btn-profile" data-mg2-action="logout">
              Logout
            </a>
          )}
          <ul className={"subNav-flyout"}>
            {isMobile && (
              <li className={"flyout-item"}>
                <a
                  href="#"
                  className="nav-profileLogout"
                  data-mg2-action="logout"
                >
                  <b>Logout</b>
                </a>
              </li>
            )}
            <li className={"flyout-item"}>
              <a href={`${connextDomain}/dashboard`} target="_blank">
                My Account
              </a>
            </li>
            <li className={"flyout-item"}>
              <a href={`${connextDomain}/preference`} target="_blank">
                Newsletters
              </a>
            </li>
            <li className={"flyout-item"}>
              <a
                href={`//events.${
                  arcSite === "dayton" ? "dayton" : connextSite
                }.com`}
              >
                Events
              </a>
            </li>
            <li className={"flyout-item"}>
              <a href="/our-products/">Our Products</a>
            </li>
            {userStateRef.current !== "authenticated" && (
              <li className={"flyout-item MG2activation"}>
                <a href="#" data-mg2-action="activation">
                  Activate My Account
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default isAuthMenu;
