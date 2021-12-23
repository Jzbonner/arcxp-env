/*  /components/_helper_components/article/contentElements/components/list/default.jsx */

import React from 'react';
import PropTypes from 'prop-types';
import SubList from '../list/default';
import { safeHtml } from '../../../../global/utils/stringUtils';

const List = (props) => {
  const { src = {}, childList = false } = props;
  const { items = [], list_type: listType } = src;
  const isUnorderedList = listType === 'unordered';
  if (!items.length) return null;

  const itemsOutput = () => items.map((e, i) => {
    const { type, content } = e;
    if (type === 'text') {
      return <li key={`li-${i}`} dangerouslySetInnerHTML={{ __html: safeHtml(content) }}></li>;
    }
    // eslint-disable-next-line react/jsx-key
    return <SubList src={e} childList={true} key={i} />;
  });

  return (
    <div className={`list ${childList ? '' : 'b-margin-bottom-d40-m20'}`}>
      {isUnorderedList && <ul>
        {itemsOutput()}
      </ul>}
      {!isUnorderedList && <ol>
        {itemsOutput()}
      </ol>}
    </div>
  );
};

List.propTypes = {
  listType: PropTypes.string,
  items: PropTypes.array,
  src: PropTypes.object,
  childList: PropTypes.bool,
};

export default List;
