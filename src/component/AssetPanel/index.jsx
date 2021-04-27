import React from 'react';

export default function AssetPanel({ tokenName }) {
    return (
        <>
            <div className="p-form-group mb-3">
                <label className="form-label p-main-text">Asset</label>
                <div className="p-input-group mt-1 justify-content-start">
                    <img height="18" src="/images/logo.png" />
                    <span className="ms-2 p-main-text">{tokenName}</span>
                </div>
            </div>
        </>
    );
}
