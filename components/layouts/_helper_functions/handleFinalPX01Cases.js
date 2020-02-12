import React from 'react';
import Section from '../../_helper_components/article/section/Section';
import PX01 from '../../_helper_components/global/ads/px01/default';

const handleFinalPX01Cases = (contentElements = [], maxNumberOfParagraphs = 0, ads = {}) => {
  const { RP09StoryDesktop, RP09StoryTablet, PX01AdSlot } = ads;
  const start = 3;

  if (maxNumberOfParagraphs === 4 || maxNumberOfParagraphs >= 5) {
    const stop = maxNumberOfParagraphs === 4 ? 4 : 5;
    // split section
    return (
      <>
        <Section elements={contentElements} startIndex={start} stopIndex={stop} rightRailAd={RP09StoryDesktop} />
        <PX01 adSlot={PX01AdSlot} />
        <Section elements={contentElements} startIndex={stop} rightRailAd={RP09StoryDesktop} insertedAds={[
          { insertAfterParagraph: 7, adArray: [RP09StoryTablet] },
        ]} />
      </>
    );
  }

  // unaltered section
  return (
    <Section
      elements={contentElements}
      startIndex={start}
      rightRailAd={RP09StoryDesktop}
      insertedAds={[
        { insertAfterParagraph: 7, adArray: [RP09StoryTablet] },
      ]}
    />
  );
};

export default handleFinalPX01Cases;
