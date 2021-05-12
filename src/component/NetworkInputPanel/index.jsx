import React, { useEffect, useState } from 'react';

export default function NetworkInputPanel({
    label,
    networkList,
    selectedNetwork,
    onNetworkChange,
}) {
    const [currentNetwork, setCurrentNetwork] = useState(selectedNetwork);

    useEffect(() => {
        setCurrentNetwork(selectedNetwork);
    }, [selectedNetwork]);

    const handleNetworkChange = (network) => {
        setCurrentNetwork(network);
        onNetworkChange(network);
    };

    // //console.log("currentNetwork===>", currentNetwork);

    return (
        <>
            <div className="p-form-group mb-3">
                <label className="form-label p-main-text">{label}</label>
                <div className="p-network p-0">
                    {currentNetwork.badge && (
                        <span className="badge p-network-tag">
                            {currentNetwork.badge}
                        </span>
                    )}
                    <img
                        height="40"
                        src={`/images/networks/${currentNetwork.id}-icon.svg` } alt="network"
                    />
                    <div className="p-network-name">
                        <span className="pe-md-1 pe-0">{currentNetwork.name}</span>
                        <div className="dropdown">
                            <a
                                className="btn btn-sm btn-select-network dropdown-toggle"
                                id="dropdownMenuNetwork1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="mdi mdi-chevron-down font-20"></i>
                            </a>
                            <ul
                                className="network-dropdown-menu dropdown-menu dropdown-menu-end"
                                aria-labelledby="dropdownMenuNetwork1"
                            >
                            
                                {networkList.map((value) => {
                                    return (
                                        <li key={value.id}>
                                            <a
                                                className="dropdown-item"
                                                onClick={() =>
                                                    handleNetworkChange(value)
                                                }
                                            >
                                                {value.name}
                                                {value.name ===
                                                    currentNetwork.name && (
                                                    <i className="ms-2 mdi mdi-check text-info"></i>
                                                )}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
