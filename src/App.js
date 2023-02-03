import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import { getApiData } from './helpers/getData';

function App() {

   const [info,setInfo] = useState()
  

  useEffect(()=>{
    const data = async () => {
      const info = await getApiData()
      setInfo(info)
    }
    data()
    .catch((err) => {
      console.log(err.message);
   });
  },[]) 

   

  
 
  return (
    <div className="App">
      <h1>Indatum Booking Fligths App</h1>
      <SearchBar info={info}
        />

      
    </div>
  );
  }

export default App;
