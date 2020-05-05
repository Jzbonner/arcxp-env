export default [
  // instagram:
  /*
  <amp-twitter
    width="375"
    height="472"
    layout="responsive"
    data-tweetid="xxxx">
  </amp-twitter>
  */
  {
    name: 'twitter',
    ampTag: 'amp-twitter',
    selfClosing: true,
    internalTags: [],
    idRegex: 'https?://twitter.com/[a-zA-Z_]{1,20}/status/([0-9]*)',
    idRefAttribute: 'data-tweetid',
    ampTagAttributes: [
      {
        name: 'width',
        defaultvalue: 375,
      },
      {
        name: 'height',
        defaultvalue: 472,
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
    idRegex: 'https?://www.youtube.com/embed/([a-zA-Z0-9-]{11})',
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
  /*
  <amp-reddit
    layout="responsive"
    width="300"
    height="400"
    data-embedtype="post"
    data-src="https://www.reddit.com/r/me_irl/comments/52rmir/me_irl/?ref=share&amp;ref_source=embed">
  </amp-reddit>
  */
  {
    name: 'reddit',
    ampTag: 'amp-reddit',
    selfClosing: true,
    internalTags: [],
    idRegex: '"https?://www.reddit.com/r/(.+?)"',
    idRefAttribute: 'data-src',
    ampTagAttributes: [
      {
        name: 'data-src',
        defaultvalue: 'https://www.reddit.com/r/',
      },
      {
        name: 'data-embedtype',
        defaultvalue: 'post',
      },
      {
        name: 'width',
        defaultvalue: 300,
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
  <amp-soundcloud
    width="480"
    height="480"
    layout="responsive"
    data-trackid="243169232"
    data-visual="true">
  </amp-soundcloud>
  https://soundcloud.com/ikmacgregor/popriot-unbreakable
  */
  {
    name: 'soundcloud',
    ampTag: 'amp-soundcloud',
    selfClosing: true,
    internalTags: [],
    // idRegex: 'https?://api.soundcloud.com/tracks/(\d+){9}',
    idRefAttribute: 'data-trackid',
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
      {
        name: 'data-visual',
        defaultvalue: 'true',
      },
    ],
  },
];
