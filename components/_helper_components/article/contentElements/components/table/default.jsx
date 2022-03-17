import React from 'react';
import PropTypes from 'prop-types';
import { safeHtml } from '../../../../global/utils/stringUtils';
import './default.scss';

const Table = ({ src }) => {
  const { header = [], rows = [] } = src || {};

  const tableRow = (index, output, cellNumber) => <td key={`table-row-${index + 1}-cell-${cellNumber}`}>
    <span dangerouslySetInnerHTML={{
      __html: safeHtml(output, {
        whiteList: {
          p: [],
          span: ['class', 'style'],
          a: ['href', 'data-*', 'target', 'class', 'on'],
          br: [],
          b: [],
          i: [],
          u: [],
          strong: [],
        },
      }),
    }}/></td>;

  return (
    <div className="b-margin-bottom-d30-m20">
      <table className='c-table b-flexRow b-flexColumn'>
          { header.length > 0 && <thead><tr>
            { header.map((cells, i) => i < 4 && <th key={`table-header-${i}`}><span>{cells.content}</span></th>)}
          </tr></thead>
          }
        <tbody>
          { rows.map((row, i) => <tr key={`table-row-${i}`}>
              {row[0] && tableRow(i, row[0].content, 1)}
              {row[1] && tableRow(i, row[1].content, 2)}
              {row[2] && tableRow(i, row[2].content, 3)}
              {row[3] && tableRow(i, row[3].content, 4)}
          </tr>)}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  src: PropTypes.object,
};

export default Table;
