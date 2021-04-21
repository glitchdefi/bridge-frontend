import React from 'react';


export default function CardBody({ title, children }) {
    return (
        <>
            <div className="card-body">
                {title && <h5 className="mb-3 d-flex align-items-center justify-content-between">
                    <span>{title}</span>
                </h5>}
                {children}
            </div>
        </>
    );
}
