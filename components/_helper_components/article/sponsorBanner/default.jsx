import React from 'react';
import { useContent } from 'fusion:content';

const SponsorBanner = () => {
  const data = useContent({
    source: 'site-api',
    query: { section: '/configsection/sponsor' },
  });

  console.log('SPONSOR HIERARCHY', data);

  return <>SPONSOR BANNER</>;
};

export default SponsorBanner;
