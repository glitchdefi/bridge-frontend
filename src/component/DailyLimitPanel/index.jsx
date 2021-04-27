import React from 'react';

export default function DailyLimitPanel(props) {
    return (
        <>
            <div className="mb-3 d-flex align-items-center justify-content-between font-14">
                <div>Daily limit {props.a} per address ({props.b} / {props.c})</div>
                <div className="p-progress">
                    <div className="p-progress-value" style={{ width: '60%' }}></div>
                </div>
            </div>
        </>
    );
}
