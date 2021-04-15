import React from 'react';
import CardBody from './CardBody';

export default function Card({ title, children }) {
    return (
        <>
            <div className="card card-main">
                <CardBody title={title}>{children}</CardBody>
            </div>
        </>
    );
}
