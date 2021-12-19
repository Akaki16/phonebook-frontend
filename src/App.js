import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Filter from './components/Filter';
import AddPersonForm from './components/AddPersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: 'Arto Hellas',
      number: '577-34-32-12'
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredName, setFilteredName] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data);
      console.log(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };
    // Prevent the user from being able to add names that already exist in the phonebook
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === personObj.name) {
        alert(`${persons[i].name} is already added to phonebook`);
        setPersons([...persons]);
        return;
      }
    }
    // validate if the user has filled both fields
    if (!newName || !newNumber) {
      alert('Please fill in the all fields');
    }

    if (newName !== '' && newNumber !== '') {
      setPersons([...persons, personObj]);
      setNewName('');
      setNewNumber('');
    }

  }

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    const filteredPersons = persons.filter(person => {
      return person.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredPersons(filteredPersons);
  }

  let showFilteredPersons;
  let listColor;

  if (filteredName.length > 0) {
    listColor = 'lightgray';
    showFilteredPersons = filteredPersons.map(person => {
      return (
        <h3 key={person.id}>{person.name}: {person.number}</h3>
      );
    });
  } else {
    showFilteredPersons = '';
    listColor = '';
  }

  return (
    <div>
      <Header />
      <Filter
        value={filteredName}
        onChange={(e) => setFilteredName(e.target.value)}
        handleSearch={handleSearch}
      />
      <div style={{backgroundColor: listColor}} className='filtered-list'>
        {showFilteredPersons}
      </div>
      <AddPersonForm
        onSubmitPerson={addPerson}
        newName={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
      />
      <Persons persons={persons} />
    </div>
  );
}

export default App;