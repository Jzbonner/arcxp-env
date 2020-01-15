/*  /components/_helper_components/article/contentElements/components/list/default.jsx  */

import React from 'react';
import PropTypes from 'prop-types';

const listItems = {
  unordered: 'ul',
  ordered: 'ol',
  ul: 'ul',
  ol: 'ol',
};

const isList = (item) => {
  const { type } = item;
  return type === 'list';
};

const renderListItem = (item, index, nextItem = {}) => {
  const { content } = item;
  const properListType = listItems[nextItem.list_type];
  const nextItemIsAList = isList(nextItem);

  return (
    <li key={index}>
      <span dangerouslySetInnerHTML={{ __html: content }} />
      {nextItemIsAList ? <List key={index} items={nextItem.items} listType={properListType} /> : null}
    </li>
  );
};

const List = (props) => {
  const { src = {} } = props;
  const { items = [] } = src;

  if (!items.length) return null;

  return (
    <ol className="b-margin-bottom-d60-m40">
      {items.map((item, index) => {
        if (isList(item) && items[index - 1] && !isList(items[index - 1])) return null;
        if (isList(item)) {
          return <List listType={listItems[item.list_type] || 'ul'} items={item.items} />;
        }
        const nextItem = items[index + 1];
        return renderListItem(item, index, nextItem);
      })}
    </ol>
  );
};

List.propTypes = {
  listType: PropTypes.string,
  className: PropTypes.string,
  items: PropTypes.array,
  src: PropTypes.string,
};

export default List;
