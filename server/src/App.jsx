import './App.css';
import {gql, useQuery} from '@apollo/client'
import Persons from './components/Persons';
import { ALL_PERSONS } from './components/queries';
import { useState } from 'react';
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'

function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000
  })

  if(result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(()=>{
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div className="App">
     <Notify errorMessage={errorMessage}/>
     <Persons persons={result.data.allPersons}/>
     <PersonForm setError={notify}/>
     <PhoneForm setError={notify}/>
    </div>
  );
}

const Notify = ({errorMessage}) => {
  if( !errorMessage) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}
export default App;
