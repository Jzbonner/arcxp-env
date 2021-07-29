import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../src/styles/container/_c-headerNav.scss';

const NavFooter = ({ navFooterContent }) => {
  const { children = [] } = navFooterContent || {};
  const filterChildren = children.slice(0, 4);

  return (
    <div className="nav-footer">
      <ul className="nav-footer-links">
        {filterChildren
          && filterChildren.map((child, i) => {
            const title = child && child.navigation && child.navigation.nav_title;
            const url = child && child.site && child.site.site_url;
            const id = child && child._id;
            const filterURL = url || id;
            return (
              <li className="parentLink" key={i}>
                <a href={filterURL}>{title}</a>
                <ul className="nav-footer-subNav">
                  {child.children.map((el, idx) => {
                    const subTitle = el && el.navigation && el.navigation.nav_title;
                    const subUrl = el && el.site && el.site.site_url;
                    const subId = el && el._id;
                    const subFilterUrl = subUrl || subId;
                    return (
                      <li className="nav-footer-subNav-links" key={idx}>
                        <a href={subFilterUrl}>{subTitle}</a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

NavFooter.propTypes = {
  navFooterContent: PropTypes.object,
};

export default NavFooter;
