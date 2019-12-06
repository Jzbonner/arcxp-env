import React from 'react';

const HTML = (props) => {
    return (
        <div style={{border: '1px solid #000', padding: '10px'}}>
            Content Element Type: <strong>HTML</strong>
            <p dangerouslySetInnerHTML={{ __html: [props.src.content] }}></p>
        </div>
    )
}

export default HTML;