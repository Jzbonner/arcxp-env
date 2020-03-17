/*  /components/_helper_components/article/contentElements/components/list/default.jsx */

import React from 'react';
import PropTypes from 'prop-types';
import SubList from '../list/default';
import './styles.scss';

const List = (props) => {
  const { src = {}, childList = false } = props;
  const { items = [], list_type: listType } = src;
  if (!items.length) return null;

  if (props.src.list_type === 'unordered') {
    return (
      <div className={`list ${childList ? null : 'b-margin-bottom-d40-m20'}`}>
        <ul>
          {props.src.items.map((e, i) => {
            if (e.type === 'text') {
              return <li key={`li-${i}`}>{e.content}</li>;
            }
            // eslint-disable-next-line react/jsx-key
            return <SubList src={e} childList={true} key={i} />;
          })}
        </ul>
      </div>

    );
  }
  if (listType === 'ordered') {
    return (
      <div className={`list ${childList ? null : 'b-margin-bottom-d40-m20'}`}>
        <ol>
          {props.src.items.map((e, i) => {
            if (e.type === 'text') {
              return <li key={`li-${i}`}>{e.content}</li>;
            }
            // eslint-disable-next-line react/jsx-key
            return <SubList src={e} childList={true} key={i} />;
          })}
        </ol>
      </div>

    );
  }
  return null;
};

List.propTypes = {
  listType: PropTypes.string,
  items: PropTypes.array,
  src: PropTypes.object,
  childList: PropTypes.bool,
};

export default List;
