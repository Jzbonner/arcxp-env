/*  /components/layouts/article-amp.jsx  */
import React from 'react';
import { useAppContext } from 'fusion:context';
import AmpNavBar from '../_helper_components/article/ampNavBar/default';
import AmpHeadline from '../_helper_components/article/headline/amp.jsx';
import AmpTimeStamp from '../_helper_components/article/timestamp/amp.jsx';

const AmpPageLayout = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;

  if (!globalContent) return null;
  const {
    promo_items: promoItems,
    first_publish_date: firstPublishDate,
    display_date: displayDate,
    label,
    headlines,
  } = globalContent || {};

  const { basic: basicItems } = promoItems || {};
  const { hide_timestamp: hideTimestamp } = label || {};
  const { text: isHideTimestampTrue } = hideTimestamp || {};

  return (
    <>
      <AmpNavBar />
      <main>
        <header>
          <AmpHeadline headlines={headlines} />
          <AmpTimeStamp firstPublishDate={firstPublishDate} displayDate={displayDate} isHideTimestampTrue={isHideTimestampTrue} />
        </header>
        <article>

        </article>
      </main>
    </>
  );
};

export default AmpPageLayout;
