import React from 'react';

export default function Container({ children }) {
    return(
        <>
            <div className="page-container">
                <div className="container">{children}</div>
            </div>
        </>
    );
}
