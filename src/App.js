import React from 'react';
import { useState, useEffect } from 'react';
import personService from './services/persons.js';
import Header from './components/Header';
import Filter from './components/Filter';
import AddPersonForm from './components/AddPersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredName, setFilteredName] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
    };
    // Prevent the user from being able to add names that already exist in the phonebook, instead replace the old number with a new one if user wants to do it.
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === personObj.name) {
        const question = window.confirm(`${persons[i].name} is already added to phonebook, replace the old number with a new one?`);
        const person = persons.find(person => person.id === persons[i].id);
        const changedPerson = {...person, number: newNumber};
        if (question && newNumber !== '') {
          personService
          .update(persons[i].id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== persons[i].id ? person : response.data));
          });
        }
        setPersons([...persons]);
        return;
      }
    }
    // validate if the user has filled both fields
    if (!newName || !newNumber) {
      alert('Please fill in the all fields');
    }

    if (newName !== '' && newNumber !== '') {
      personService
      .create(personObj)
      .then(response => {
        setPersons([...persons, response.data]);
      });
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

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id);
    const question = window.confirm(`Delete ${person.name}`);
    if (question) {
      personService
      .deleteObject(id, person)
      .then(response => {
        console.log(`${person.name} deleted successfuly`);
        setPersons(persons.filter(person => person.id !== id));
      });
    }
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
      <Persons
        persons={persons}
        onDelete={deletePerson}
      />
    </div>
  );
}

export default App;