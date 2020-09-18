import React, { useRef, useEffect } from "react";
import { useContent } from "fusion:content";

const isAuthMenu = ({ isMobile, showUserMenu, setShowUserMenu, source }) => {
  const loginEl = useRef(null);

  const siteContent = useContent({
    source: "site-api",
    query: {
      hierarchy: "LoggedOutMenu"
    }
  });

  const { children } = siteContent || {};

  useEffect(() => {
    if (typeof window.localStorage !== "undefined") {
      const expirationTime = localStorage.getItem("logoutMenuExpiration");

      // Update expiration no matter what
      const newDate = new Date();
      localStorage.setItem("logoutMenuExpiration", newDate);

      const now = new Date();
      const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

      const nowInMs = Date.parse(now);
      const midnightInMs = Date.parse(midnight);
      const expirationInMs = Date.parse(expirationTime);

      // Display menu if any of these are true
      if (
        !expirationTime ||
        nowInMs - expirationInMs > 1000 * 1 ||
        (expirationInMs < midnightInMs && midnightInMs < nowInMs)
      ) {
        loginEl.current.classList.remove("fadeInOut");
        loginEl.current.classList.add("fadeInOut");
      }
    }
  }, []);

  return (
    <>
      <div onClick={() => setShowUserMenu(!showUserMenu)}>
        <img src={source} />
        <div className="nav-itemText login-text">Log in</div>
      </div>

      <div
        ref={loginEl}
        className={`section login-menu ${
          isMobile && showUserMenu ? "isVisible" : ""
        }`}
      >
        <div className={"section-item"}>
          <a>
            <img src={source} />
            <div className="nav-itemText login-text">Log In</div>
          </a>
        </div>
        <div
          className={`subNav ${isMobile && showUserMenu ? "isVisible" : ""}`}
        >
          {!isMobile && (
            <a
              href="#"
              className="btn-profile"
              data-mg2-action="register"
              onClick={e => {
                e.preventDefault();
                setShowUserMenu(!showUserMenu);
              }}
            >
              Log in
            </a>
          )}
          <ul className={"subNav-flyout"}>
            {isMobile && (
              <li className={"flyout-item"}>
                <a
                  href="#"
                  className="btn-profile"
                  data-mg2-action="register"
                  onClick={e => {
                    e.preventDefault();
                    setShowUserMenu(!showUserMenu);
                  }}
                >
                  <b>Log In</b>
                </a>
              </li>
            )}

            {children.map(child => {
              const destination = child._id.includes("/configsection")
                ? child.site.site_url
                : _id;
              return (
                <li className={"flyout-item"} key={child.name}>
                  <a href={destination} target="_blank">
                    {child.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default isAuthMenu;
