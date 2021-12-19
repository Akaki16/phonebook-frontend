import React from 'react'
import PropTypes from 'prop-types';

const Person = ({ person, onDelete }) => {
    return (
        <h3>{person.name}: {person.number} <button onClick={() => onDelete(person.id)}>Delete</button></h3>
    );
}

Person.propTypes = {
    person: PropTypes.object
};

export default Person;