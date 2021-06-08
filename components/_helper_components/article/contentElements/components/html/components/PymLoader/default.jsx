import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Parser } from 'htmlparser2';
import get from 'lodash/get';
import './default.scss';

class PymLoader extends PureComponent {
  constructor(props) {
    super(props);

    let data = {};

    const parser = new Parser({
      onopentag: (tag, attribs) => {
        if (tag !== 'pymloader') return;
        data = attribs;
      },
    });

    parser.write(this.props.html);
    parser.end();
    this.pymCfg = data;
  }

  /* eslint-disable */
  componentDidMount() {
    const pymCfg = get(this, 'pymCfg');
    const pymUrl = get(pymCfg, 'url');
    const pymId = get(pymCfg, 'id');

    if (pymUrl && pymId) {
      const timeStamp = new Date().getTime();
      const pymScript = document.createElement('script');
      pymScript.async = true;
      pymScript.src = 'https://pym.nprapps.org/pym.v1.min.js';
      pymScript.addEventListener('load', (event) => {
        const pymItem = new pym.Parent(pymId, `${pymUrl}?${timeStamp}`, {})
      });
      document.getElementsByTagName('body')[0].appendChild(pymScript);
    }
  }
  /* eslint-enable */

  render() {
    const pymCfg = get(this, 'pymCfg');
    const pymId = get(pymCfg, 'id');
    if (pymId) return <div id={pymId}></div>;
    return <></>;
  }
}

PymLoader.propTypes = {
  html: PropTypes.string,
  src: PropTypes.string,
  render: PropTypes.func,
};

export default PymLoader;
