import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import debounce from '../../../features/gallery/_helper_functions/debounce';
import './default.scss';

let baseText = '';

const ListItemPreview = ({ id }) => {
  const containerEl = useRef(null);
  const textEl = useRef(null);
  const [text, setText] = useState('');
  const [preRender, setPreRender] = useState(false);

  const storyData = useContent({
    source: 'content-api',
    query: {
      id,
    },
  });

  const lineClamp = (container, paragraph) => {
    if (container && container.current && paragraph && paragraph.current) {
      const containerHeight = container.current.clientHeight;
      let newText = '';

      while (paragraph.current.clientHeight > containerHeight) {
        newText = paragraph.current.innerText;

        newText = newText.substring(0, newText.length - 3);
        newText = newText.split(' ');
        newText.pop();
        newText = newText.join(' ');
        newText = newText.concat('...');
        paragraph.current.innerText = newText; // eslint-disable-line no-param-reassign
      }

      return newText;
    }
    return null;
  };

  useEffect(() => {
    if (storyData && storyData.headlines && storyData.headlines.web) {
      baseText = storyData.headlines.web.concat('...');
      setText(storyData.headlines.web.concat('...'));
      setPreRender(true);
    }

    if (
      storyData
      && storyData.content_elements
      && storyData.content_elements[0]
      && storyData.content_elements[0].type === 'text'
    ) {
      baseText = storyData.content_elements[0].content.concat('...');
      setText(storyData.content_elements[0].content.concat('...'));
      setPreRender(true);
    }
  }, [storyData]);

  useEffect(() => {
    setText(lineClamp(containerEl, textEl));
  }, [preRender]);

  const handleResize = () => {
    textEl.current.style.opacity = 0;

    const runResize = debounce(() => {
      textEl.current.innerText = baseText;
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
