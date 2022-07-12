import React, { Fragment } from "react";
import "./Search.css";

const Search = ({ search, setSearch }) => {
    return (
        <Fragment>
            <input
                className='search-field'
                type='text'
                placeholder='Search by name, email or role'
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
        </Fragment>
    );
};

export default Search;
