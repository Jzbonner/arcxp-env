/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import getProperties from "fusion:properties";
import { useFusionContext } from "fusion:context";
import fetchEnv from "../../utils/environment";
import "../../../../../src/styles/container/_c-headerNav.scss";
import userIcon from "../../../../../resources/icons/login/user-icon.svg";
import userIconWhite from "../../../../../resources/icons/login/user-icon-white.svg";
import NotAuthMenu from "./notAuthMenu";
import IsAuthMenu from "./isAuthMenu";

const Login = ({ isMobile, isFlyout, isSticky }) => {
  let source;
  if (!isMobile || !isFlyout) {
    source = userIcon;
  } else {
    source = userIconWhite;
  }

  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const currentEnv = fetchEnv();
  const { connext } = getProperties(arcSite);
  const { isEnabled = false } = connext[currentEnv] || {};

  if (!isEnabled) {
    return null;
  }

  const [userState, _setUserState] = useState("");
  const [showUserMenu, _setShowUserMenu] = useState(false);
  const userStateRef = React.useRef(userState);
  const showUserMenuRef = React.useRef(showUserMenu);

  const setUserState = data => {
    userStateRef.current = data;
    _setUserState(data);
  };

  const setShowUserMenu = data => {
    if (isMobile) {
      if (!isSticky) {
        showUserMenuRef.current = data;
        _setShowUserMenu(data);
      } else if (userStateRef.current !== "logged-out") {
        window.location.href = profileLink;
      }
    }
  };

  const useWindowEvent = (event, trigger) => {
    const callback = () => setUserState(trigger);
    useEffect(() => {
      window.addEventListener(event, callback);
      return () => window.removeEventListener(event, callback);
    }, [event, trigger]);
  };

  useWindowEvent("connextLoggedIn", "logged-in");
  useWindowEvent("connextLoggedOut", "logged-out");
  useWindowEvent("connextIsSubscriber", "authenticated");

  return (
    <li className={`nav-login nav-items ${isSticky ? "isSticky" : ""}`}>
      {/* <NotAuthMenu
        isMobile={isMobile}
        showUserMenu={showUserMenu}
        setShowUserMenu={setShowUserMenu}
        source={source}
        userStateRef={userStateRef}
      /> */}
      <IsAuthMenu
        isMobile={isMobile}
        showUserMenu={showUserMenu}
        source={source}
        userStateRef={userStateRef}
      />
    </li>
  );
};

Login.propTypes = {
  isMobile: PropTypes.bool,
  isFlyout: PropTypes.bool,
  isSticky: PropTypes.bool
};

export default Login;
