import React from 'react';

const AmpCustomStyles = () => (
  <style amp-custom="">
    {
      `
        html {
          box-sizing: border-box;
          height: 100%;
          font-size: 16px;
        }

        main {
          display: flex;
          flex-direction: column;

        }

        *, *:before, *:after {
          margin: 0;
          padding: 0;
          box-sizing: inherit;
        }

        .amp-nav {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px;
          font-size: 1.5rem;
        }

        .c-headline {
          margin: 0 18px 40px;
          padding: 20px 25px;
          border-radius: 6px;
          box-shadow: 0 2px 26px 4px rgba(0, 0, 0, 0.1);
          background-color: #ffffff;
        }

        .c-headline h1 {
          font-size: 28px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.32;
          letter-spacing: -0.3px;
          text-align: center;
          color: #000000;
        }

        .article-timestamp {
          color: #000000;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          text-align: center;
        }
      `
    }
  </style>
);

export default AmpCustomStyles;
