/*  /components/_helper_components/article/contentElements/components/list/default.jsx */

import React from 'react';
import PropTypes from 'prop-types';
import SubList from '../list/default';
import './styles.scss';

const List = (props) => {
  const { src = {} } = props;
  const { items = [], list_type: listType } = src;
  if (!items.length) return null;

  if (props.src.list_type === 'unordered') {
    return (
      <div className="list">
        <ul>
          {props.src.items.map((e) => {
            if (e.type === 'text') {
              return <li>{e.content}</li>;
            }
            // eslint-disable-next-line react/jsx-key
            return <SubList src={e} />;
          })}
        </ul>
      </div>

    );
  }
  if (listType === 'ordered') {
    return (
      <div className="list">
        <ol>
          {props.src.items.map((e) => {
            if (e.type === 'text') {
              return <li>{e.content}</li>;
            }
            // eslint-disable-next-line react/jsx-key
            return <SubList src={e} />;
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
};

export default List;
