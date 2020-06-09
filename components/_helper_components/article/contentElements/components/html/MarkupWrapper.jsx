/* eslint-disable */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Parser } from 'htmlparser2'
import { safeHtml } from '../../../../global/utils/stringUtils';

class MarkupWrapper extends PureComponent {
  constructor(props) {
    super(props)

    //console.log("MarkupWrapper => ", props.html)

    if (!props.src) {
      // don't have a defined endpoint so we need to parse the html
      let inScript = false
      let src = ''
      let script = ''

      const parser = new Parser({
        onopentag: function (tag, attribs) {
          if (tag !== 'script') return
          let { src: insrc } = attribs
          if (!insrc) inScript = true
          else src = insrc
          //console.log("onopentag => ", attribs.src)
        },
        ontext: function (text) {
          if (!inScript) return
          script = text
          //console.log("ontext => ", script)
        },
        onclosetag: function (tag) {
          if (tag !== 'script') return
          inScript = false
        }
      })

      parser.write(this.props.html)
      parser.end()

      this.scriptsList = [];
      // if (src) this.scriptSrc = src
      // if (script) this.scriptText = script
      if (src) this.scriptsList.push({ src })
      if (script) this.scriptsList.push({ srcText: script })

      this.parsedMarkup = safeHtml(this.props.html, {});

      //console.log(">>> MarkupWrapper scripts => ", this.scriptsList, this.parsedMarkup)
    }
  }

  componentDidMount() {

    if (this.scriptsList.length) {

      this.scriptsList.forEach(item => {

        if (item.src) {
          // if the endpoint is more than 1024 char, something is wrong
          const type = `src-${item.src}`.substring(0, 1024)
          if (window[type]) return
          window[type] = true
        }

        const script = document.createElement('script')
        //script.async = true
        if (item.src) script.src = item.src
        if (item.srcText) script.text = item.srcText
        console.log("script add => ", script);
        document.getElementsByTagName('body')[0].appendChild(script)

      })
    }
  }

  render() {
    if (this.props.render) return this.props.render()
    return <div className="custom-html" dangerouslySetInnerHTML={{ __html: this.parsedMarkup, }} />
  }
}

MarkupWrapper.propTypes = {
  html: PropTypes.string,
  src: PropTypes.string,
  render: PropTypes.func,
}

export default MarkupWrapper;
/* eslint-enable */
