import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ src }) => {
  const { header = [], rows = [] } = src || {};
  return (
    <div className="b-margin-bottom-d30-m20">
      <table>
        <tbody>
          <tr>
          { header.map((cells, i) => <th key={`table-header-${i}`}>{cells.content}</th>)}
          </tr>
          { rows.map((row, i) => <tr key={`table-row-${i}`}>
              {row[0] && <td key={`table-row-${i + 1}-cell-1`}>{row[0].content}</td>}
              {row[1] && <td key={`table-row-${i + 1}-cell-2`}>{row[1].content}</td>}
              {row[2] && <td key={`table-row-${i + 1}-cell-3`}>{row[2].content}</td>}
              {row[3] && <td key={`table-row-${i + 1}-cell-4`}>{row[3].content}</td>}
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
