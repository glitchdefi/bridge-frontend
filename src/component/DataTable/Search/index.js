import React, { useState } from "react";

const Search = ({ onSearch, placeholder = "Search" }) => {
    const [search, setSearch] = useState("");

    const onInputChange = value => {
        setSearch(value);
        onSearch(value);
    };
    return (
        <div className="table-input-search d-flex align-items-center" style={{ border: '1px solid rgba(206, 212, 218,.2)', borderRadius: '16px' }}>
            <span className="mdi mdi-magnify ms-3 me-1"></span>
            <input
                type="text"
                className="form-control form-control-sm"
                style={{ backgroundColor: 'transparent', border: '0', boxShadow: 'none', outline: 0, color:'#999' }}
                placeholder={placeholder}
                value={search}
                onChange={e => onInputChange(e.target.value)}
            />
        </div>
    );
};

export default Search;
