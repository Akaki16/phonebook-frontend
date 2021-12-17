import React from 'react'
import PropTypes from 'prop-types';

const AddPersonForm = ({ onSubmitPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
        <div onSubmit={onSubmitPerson}>
            <form className='add-form'>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        placeholder='Enter new name'
                        value={newName}
                        onChange={handleNameChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='number'>Number</label>
                    <input
                        type='tel'
                        placeholder='Enter new number'
                        value={newNumber}
                        onChange={handleNumberChange}
                    />
                </div>
                <div className='form-group'>
                    <button className='add-btn' type='submit'>
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}

AddPersonForm.propTypes = {
    onSubmitPerson: PropTypes.func,
    newName: PropTypes.string,
    handleNameChange: PropTypes.func,
    newNumber: PropTypes.string,
    handleNumberChange: PropTypes.func
};

export default AddPersonForm;