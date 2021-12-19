import React from 'react';
import Person from './Person';
import PropTypes from 'prop-types';

const Persons = ({ persons, onDelete }) => {
    return (
        <div className='list'>
            <h2>Numbers</h2>
            <hr />
            <br />
            {persons.map((person) => {
                return (
                    <Person
                        onDelete={onDelete}
                        key={person.id}
                        person={person}
                    />
                );
            })}
        </div>
    );
}

Persons.propTypes = {
    persons: PropTypes.array
};

export default Persons;