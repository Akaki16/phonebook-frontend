import React from 'react'
import PropTypes from 'prop-types';

const Person = ({ person }) => {
    return (
        <h3>{person.name}: {person.number}</h3>
    );
}

Person.propTypes = {
    person: PropTypes.object
};

export default Person;