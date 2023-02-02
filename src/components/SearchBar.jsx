
import { useEffect, useState } from "react"

export default function SearchBar({info}){

    const [search,setSearch] = useState([])

const [input,setInput] = useState({
    cityFrom:"",
  cityTo:"",
  date:"",
  passengers:""
})
  
 


 function handleInputChange (e) {
    setInput({
        ...input,
        [e.target.name]:e.target.value
       })  
 }

 const allValuesFilled = Object.values(input).every(value => value !== '')
 


  function handleSearch(){
  if(info.length===0){
    alert("no existen vuelos disponibles")
  }else{
    const datafilt = info.filter(el =>{
        return(
        el.cityFrom.toLowerCase().includes(input.cityFrom.toLowerCase()) && el.cityTo.toLowerCase().includes(input.cityTo.toLowerCase()) && el.date.includes( input.date )&& el.availableSeats > input.passengers
        )
        
    }
    )
     datafilt.length?setSearch(datafilt):setSearch({message:"no se encuentran vuelos disponibles"})
   
    
  }
 
 
  }
 

    return (
        <div>
            <input
            type="text"
            placeholder="Origin"
            onChange={handleInputChange}
            name = "cityFrom"
            value = {input.cityFrom}
            />
            <input
            type="text"
            placeholder="Destinity"
            onChange={handleInputChange}
            name = "cityTo"
            value = {input.cityTo}
            />
            <label>Departure date</label>
            <input
            type="date"
            value = {input.date}
            name = "date"
            onChange={handleInputChange}
            />
            <input 
            type="number"
            placeholder="Number of passengers"
            onChange={handleInputChange}
            name = "passengers"
            value = {input.passengers}
            />
            <button disabled={!allValuesFilled}  onClick ={handleSearch} >Search</button>
            <div>
            {
               search.length? search.map(el=>{
                return(
                    <div key ={el.id}>
                    <ol>
                    <li>From:{el.cityFrom}</li>
                    <li>To:{el.cityTo}</li>                
                    <li>Seats:{el.availableSeats}</li>
                    <li>Date:{el.date}</li>                
                </ol>
                </div>
               )
             
               }
               ):
                <h1>{search.message}</h1>
            
               }
            </div>
            
        </div>
    )
}