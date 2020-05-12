import React from 'react';

const FaceRecognition = ({ imageURL, boxes }) => {
    return (
        <div className='center mt3 mb3'>
            <div style={{ width: '300px', height: 'auto', position: 'relative' }}  >
                {boxes.map((box,i) => {
                    return (
                    <div key = {(box.top + i).toString()} style={{ ...box, border: 'solid green', position: 'absolute' }} ></div>
                    )
                })}
                <img src={imageURL} alt={'sample'} width={'300px'} height={'auto'} id='imageInput' />
            </div>
        </div>
    )
}

export default FaceRecognition;