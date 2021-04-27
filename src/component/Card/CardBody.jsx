import React from 'react';
import { Link } from 'react-router-dom';

export default function CardBody({ title, children }) {
    return (
        <>
            <div className="card-body">
                <h5 className="mb-3 d-flex align-items-center justify-content-center text-uppercase text-center">{title}</h5>
                {children}
            </div>
        </>
    );
}
