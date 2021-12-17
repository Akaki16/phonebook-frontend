import React from 'react'
import PropTypes from 'prop-types';

const Filter = ({ value, onChange, handleSearch }) => {
    return (
        <div className='filter'>
            <input
                type='text'
                placeholder='Search person/persons'
                value={value}
                onChange={onChange}
                onKeyUp={handleSearch}
            />
        </div>
    );
}

Filter.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    handleSearch: PropTypes.func
};

export default Filter;