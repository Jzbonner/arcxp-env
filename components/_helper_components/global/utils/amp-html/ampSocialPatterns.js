export default [
  // instagram:
  /*
  <amp-instagram
      data-shortcode=''
      data-captioned
      width='400'
      height='400'
      layout='responsive'>
  </amp-instagram>
  */
  {
    name: 'instagram',
    ampTag: 'amp-instagram',
    selfClosing: true,
    internalTags: [],
    idRegex: 'www.instagram.com/p/(.*?)/',
    idRefAttribute: 'data-shortcode',
    ampTagAttributes: [
      {
        name: 'data-captioned',
        defaultvalue: '',
      },
      {
        name: 'width',
        defaultvalue: 400,
      },
      {
        name: 'height',
        defaultvalue: 400,
      },
      {
        name: 'layout',
        defaultvalue: 'responsive',
      },
      {
        name: 'data-block-on-consent',
        defaultvalue: '',
      },
    ],
  },

  /*
  <amp-vimeo
      data-videoid=''
      layout='responsive'
      width='500'
      autoplay
      height='281'>
  </amp-vimeo>
  */
  {
    name: 'vimeo',
    ampTag: 'amp-vimeo',
    selfClosing: true,
    internalTags: [],
    idRegex: '"https://vimeo.com/(.+?)"',
    idRefAttribute: 'data-videoid',
    ampTagAttributes: [
      {
        name: 'width',
        defaultvalue: 640,
      },
      {
        name: 'height',
        defaultvalue: 360,
      },
      {
        name: 'layout',
        defaultvalue: 'responsive',
      },
      {
        name: 'autoplay',
        defaultvalue: '',
      },
      {
        name: 'data-block-on-consent',
        defaultvalue: '',
      },
    ],
  },

  /*
  <amp-dailymotion
    data-videoid=''
    layout='responsive'
    width='480'
    height='270'>
  </amp-dailymotion>
  */
  {
    name: 'dailymotion',
    ampTag: 'amp-dailymotion',
    selfClosing: true,
    internalTags: [],
    idRegex: 'www.dailymotion.com/embed/video/(.*?)?',
    idRefAttribute: 'data-videoid',
    ampTagAttributes: [
      {
        name: 'width',
        defaultvalue: 640,
      },
      {
        name: 'height',
        defaultvalue: 360,
      },
      {
        name: 'layout',
        defaultvalue: 'responsive',
      },
      {
        name: 'autoplay',
        defaultvalue: '',
      },
      {
        name: 'data-mute',
        defaultvalue: true,
      },
      {
        name: 'data-block-on-consent',
        defaultvalue: '',
      },
    ],
  },

  /*
  <amp-youtube
    data-videoid=''
    layout='responsive'
    width='480'
    height='270'>
  </amp-youtube>
  */
  {
    name: 'youtube',
    ampTag: 'amp-youtube',
    selfClosing: true,
    internalTags: [],
    idRegex: 'www.youtube.com/embed/(.*?)',
    idRefAttribute: 'data-videoid',
    ampTagAttributes: [
      {
        name: 'width',
        defaultvalue: 480,
      },
      {
        name: 'height',
        defaultvalue: 270,
      },
      {
        name: 'layout',
        defaultvalue: 'responsive',
      },
      {
        name: 'data-block-on-consent',
        defaultvalue: '',
      },
    ],
  },
];
