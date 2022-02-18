import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const Table = ({ src }) => {
  const { header = [], rows = [] } = src || {};
  return (
    <div className="b-margin-bottom-d30-m20">
      <table className='c-table b-flexRow b-flexColumn'>
          { header.length > 0 && <thead><tr>
            { header.map((cells, i) => i < 4 && <th key={`table-header-${i}`}><span>{cells.content}</span></th>)}
          </tr></thead>
          }
        <tbody>
          { rows.map((row, i) => <tr key={`table-row-${i}`}>
              {row[0] && <td key={`table-row-${i + 1}-cell-1`}><span>{row[0].content}</span></td>}
              {row[1] && <td key={`table-row-${i + 1}-cell-2`}><span>{row[1].content}</span></td>}
              {row[2] && <td key={`table-row-${i + 1}-cell-3`}><span>{row[2].content}</span></td>}
              {row[3] && <td key={`table-row-${i + 1}-cell-4`}><span>{row[3].content}</span></td>}
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
