import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import { getApiData } from './api/getData';

function App() {

   const [info,setInfo] = useState()
   const [result,setResult] = useState([])

  useEffect(()=>{
    fetch("https://flights-api-production.up.railway.app/api/flights")
    .then(res=>res.json())
    .then(data =>{
    console.log(data)
   setInfo(data)
    })
    .catch((err) => {
      console.log(err.message);
   });
  },[]) 

   

 
  return (
    <div className="App">
      <h1>Hola mundo</h1>
      <SearchBar info={info}
        />

      
    </div>
  );
  }

export default App;
