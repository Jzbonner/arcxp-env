/*  /components/layouts/basic.jsx  */

import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import TimeStamp from '../_helper_components/article/timestamp/default.jsx';
import SectionLabel from '../_helper_components/global/sectionLabel/default.jsx';

const BasicPageLayout = (props) => {
  const [heading, leadImage, byline, content] = props.children;

  const appContext = useAppContext();
  const { globalContent } = appContext;

  if (!globalContent) return null;

  const {
    first_publish_date: firstPublishDate, display_date: displayDate, label, taxonomy,
  } = globalContent;

  return (
    <>
      <header>
        <h1>{heading}</h1>
        <SectionLabel label={label} taxonomy={taxonomy} />
        <TimeStamp firstPublishDate={firstPublishDate} displayDate={displayDate} />
        <div>{leadImage}</div>
        <div>{byline}</div>
      </header>
      <article>{content}</article>
    </>
  );
};

BasicPageLayout.sections = ['heading', 'leadImage', 'byline', 'content'];

BasicPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicPageLayout;
