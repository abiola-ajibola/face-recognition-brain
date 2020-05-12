import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav className='f3' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p className=' dim pa3 link black underline pa3 pointer' onClick={() => onRouteChange('signin')}>Sign Out</p>
            </nav>
        )
    } else {
        return (
            <nav className='f3' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p className=' dim pa3 link black underline pa3 pointer' onClick={() => onRouteChange('signin')}>Sign In</p>
                <p className=' dim pa3 link black underline pa3 pointer' onClick={() => onRouteChange('register')}>Register</p>
            </nav>
        )
    }
}

export default Navigation;