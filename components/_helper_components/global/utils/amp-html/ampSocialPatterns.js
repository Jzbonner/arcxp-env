/*
  Social pattern configurations

  name: STRING - Simple human readable name to describe the configuration pattern. Field not used.
  ampTag: STRING - The amp social html tag this should create. https://amp.dev/documentation/components/
  selfClosing: BOOLEAN - Current unused; Intent is for future additions. If this amp tag should have inner
                          content elements or close itself.
  internalTags: COMPLEX ARRAY - Currently unused; The intent for this was to create inner configuration
                          objects such as an amp-img placeholder for a video. Should rely on the selfClosing boolean.
  isRegex: STRING - A regular expressions pattern to look for in the content to determine the social
                    configuration to use and to extract the appropriate id for the network.
  idRefAttribute: STRING - The amp html tag attribute to add the extracted id to.
  idIndex: NUMBER - The regular expression array index in which to pull for the ID; 0 - full pattern; 1... - individual index part
  ampTagAttributes: COMPLEX ARRAY - An array of objects describing data attributes that this amp tag uses to configure itself

  =ampTagAttributes Child Object= OBJECT - An object that outlines a key/value amp tag attribute; width="123" or data-embedtype="post"
                            for example. If the object name string matches the idRefAttribute then the defaultvalue is prepended to the
                            network id extracted by the regex.
    -- name: STRING - a data attribute key
    -- defaultvalue: [STRING|BOOLEAN|NUMBER] - A value assigned to this attribute;
*/

/* eslint-disable */
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
    idIndex: 1,
    ampTagAttributes: [{
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
    idIndex: 1,
    ampTagAttributes: [{
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
    idRegex: 'https?://player.vimeo.com/video/([0-9]{1,20})',
    idRefAttribute: 'data-videoid',
    idIndex: 1,
    ampTagAttributes: [{
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
    idIndex: 1,
    ampTagAttributes: [{
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
    idIndex: 1,
    ampTagAttributes: [{
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
    idIndex: 1,
    ampTagAttributes: [{
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
        defaultvalue: 300,
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
    idRegex: 'https?://api.soundcloud.com/tracks/(.{9})',
    idRefAttribute: 'data-trackid',
    idIndex: 1,
    ampTagAttributes: [{
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
  /*
  <amp-facebook
    width="476"
    height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
  </amp-facebook>
  */
  {
    name: 'facebook_video',
    ampTag: 'amp-facebook',
    selfClosing: true,
    internalTags: [],
    idRegex: 'https?://www.facebook.com/(.+?)/videos/([0-9]{1,25})',
    idRefAttribute: 'data-href',
    idIndex: 0,
    ampTagAttributes: [{
        name: 'width',
        defaultvalue: 476,
      },
      {
        name: 'height',
        defaultvalue: 316,
      },
      {
        name: 'data-embed-as',
        defaultvalue: 'video',
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
  <amp-facebook
    width="552"
    height="310"
    layout="responsive"
    data-href="https://www.facebook.com/.../.../1712989015384373">
  </amp-facebook>
  */
  {
    name: 'facebook_post',
    ampTag: 'amp-facebook',
    selfClosing: true,
    internalTags: [],
    idRegex: 'https?:\/\/www\.facebook\.com\/(.+?)\/(posts|photos)\/([a?.?0-9]{1,40})(\/([0-9]{1,20}))?',
    idRefAttribute: 'data-href',
    idIndex: 0, // 0 is the full url match
    ampTagAttributes: [{
        name: 'width',
        defaultvalue: 476,
      },
      {
        name: 'height',
        defaultvalue: 316,
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
  <amp-pinterest
    width="245"
    height="330"
    data-do="embedPin"
    data-url="https://www.pinterest.com/pin/99360735500167749/">
  </amp-pinterest>
  */
  {
    name: 'pinterest',
    ampTag: 'amp-pinterest',
    selfClosing: true,
    internalTags: [],
    idRegex: 'https?://www.pinterest.com/pin/([0-9]{1,25})/?',
    idRefAttribute: 'data-url',
    idIndex: 0,
    ampTagAttributes: [
      {
        name: 'width',
        defaultvalue: 236,
      },
      {
        name: 'height',
        defaultvalue: 430,
      },
      {
        name: 'data-do',
        defaultvalue: 'embedPin',
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
/* eslint-enable */
