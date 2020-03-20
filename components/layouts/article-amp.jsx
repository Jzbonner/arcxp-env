/*  /components/layouts/article-amp.jsx  */
import React from 'react';
import { useAppContext } from 'fusion:context';
import AmpNavBar from '../_helper_components/article/ampNavBar/default';
import Headline from '../_helper_components/article/headline/default.jsx';
import TimeStamp from '../_helper_components/article/timestamp/default.jsx';

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
          <Headline headlines={headlines} basicItems={basicItems} />
          <div className="b-margin-bottom-d15-m10 c-label-wrapper b-pageContainer">
            <TimeStamp firstPublishDate={firstPublishDate} displayDate={displayDate} isHideTimestampTrue={isHideTimestampTrue} />
          </div>
        </header>
        <article>

        </article>
      </main>
    </>
  );
};

export default AmpPageLayout;
