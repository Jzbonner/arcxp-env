import React from 'react';

const Correction = (props) => {
    return (
        <div style={{border: '1px solid #000', padding: '10px'}}>
            Content Element Type: <strong>Correction</strong>
            <p dangerouslySetInnerHTML={{ __html: [props.src.content] }}></p>  
          </div>
    )
}

export default Correction;