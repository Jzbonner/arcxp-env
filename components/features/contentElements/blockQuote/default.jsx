import React from 'react';

const BlockQuote = (props) => {
    console.log('PROPS', props)
    return (
        <div style={{border: '1px solid #000', padding: '10px'}}>
            Content Element Type: <strong>Block Quote</strong>
            <p dangerouslySetInnerHTML={{ __html: [props.src.content] }}></p>
        </div>
    )
}

export default BlockQuote;