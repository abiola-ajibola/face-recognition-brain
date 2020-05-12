import React from 'react';

const Rank = ({userName, userEntries}) => {
    
    return (
        <div>
            <div className ='white f3'>
                {`${userName}, your current number of entries is ...`}
            </div>
            <div className='white f3' id = 'number'>
                {userEntries}
            </div>
        </div>
    )
}

export default Rank;