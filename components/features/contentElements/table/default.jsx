import React from 'react';

const Table = (props) => {
    return (
        <div style={{border: '1px solid #000', padding: '10px'}}>
            Content Element Type: <strong>Table</strong>
            <p dangerouslySetInnerHTML={{ __html: [props.src.content] }}></p>        </div>
    )
}

export default Table;
