import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import debounce from '../../../features/gallery/_helper_functions/debounce';
import { safeHtml } from '../../global/utils/stringUtils';
import './default.scss';

const ListItemPreview = ({ id }) => {
  const containerEl = useRef(null);
  const textEl = useRef(null);
  const [text, setText] = useState('');
  const [preRender, setPreRender] = useState(false);
  const [baseText, _setBaseText] = useState('');
  const baseTextRef = useRef(baseText);

  const setBaseText = (data) => {
    baseTextRef.current = data;
    _setBaseText(data);
  };

  const storyData = useContent({
    source: 'content-api',
    query: {
      id,
    },
  });

  const lineClamp = (container, paragraph) => {
    if (container && container.current && paragraph && paragraph.current) {
      const containerHeight = container.current.clientHeight;
      let newText = paragraph.current.innerText;

      while (paragraph.current.clientHeight > containerHeight) {
        newText = newText.substring(0, newText.length - 3);
        newText = newText.split(' ');
        newText.pop();
        newText = newText.join(' ');
        if (newText.length < paragraph.current.innerText.length) {
          newText = newText.concat('...');
        }
        paragraph.current.innerText = newText; // eslint-disable-line no-param-reassign
      }

      return newText;
    }
    return null;
  };

  useEffect(() => {
    if (storyData && storyData.headlines && storyData.headlines.web) {
      setBaseText(storyData.headlines.web);
      setText(storyData.headlines.web);
      setPreRender(true);
    } else if (
      storyData
      && storyData.content_elements
      && storyData.content_elements[0]
      && storyData.content_elements[0].type === 'text'
    ) {
      let previewData = storyData.content_elements[0].content;
      if (storyData.content_elements[0].content.length < 90
      && storyData.content_elements[1]) {
        previewData = `${storyData.content_elements[0].content} ${storyData.content_elements[1].content}`;
      }
      const textContent = safeHtml(previewData, { whiteList: {} });
      setBaseText(textContent.concat('...'));
      setText(textContent.concat('...'));
      setPreRender(true);
    }
  }, [storyData]);

  useEffect(() => {
    setText(lineClamp(containerEl, textEl));
  }, [preRender]);

  const handleResize = () => {
    textEl.current.style.opacity = 0;

    const runResize = debounce(() => {
      textEl.current.innerText = baseTextRef.current;
      setText(lineClamp(containerEl, textEl));
      textEl.current.style.opacity = 1;
    }, 500);

    runResize();
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize, true);
    return () => {
      window.removeEventListener('resize', handleResize, true);
    };
  }, []);

  return (
    <div className='c-listItemPreview' ref={containerEl}>
      <p ref={textEl}>{text}</p>
    </div>
  );
};

ListItemPreview.propTypes = {
  id: PropTypes.string,
};

export default ListItemPreview;
