
import { useEffect, useState } from "react"
import {searchFligths,searchByPrice,orderByHour} from "../helpers/getData"

export default function SearchBar({info}){

    const [search,setSearch] = useState([])

    const [data,setData] = useState([])

    const  [hour,setHour] = useState("")
    
    

    const  [prices,setPrices] = useState({
      minPrice:0,
      maxPrice:0
    })
   

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

 useEffect(() => {
  setSearch(info)
  setData(info)
}, [info])


const handlePricesChange = (e) => {
  setPrices({
    ...prices,
    [e.target.name]: e.target.value
  })
}

const handlePriceSearch=()=>{
  const resultPrices = searchByPrice(data,prices)
  console.log(resultPrices)
  setSearch(resultPrices)
}

  function handleSearch(e){
  
     const result =  searchFligths(info, input)
     setSearch(result)
     setData(result)
    setInput({
      cityFrom:"",
      cityTo:"",
     date:"",
     passengers:""
    })
  }
   
  const handleSelectHour=(e)=>{
    if(e.target.value !== "all"){
      setHour(e.target.value) 
  const sortHour = orderByHour(data,hour)
  console.log(sortHour)
  
  setSearch(sortHour)
  
  }


    }

  
  /* const handleOrderHour = () => {
    console.log(data)
   
  } */

 
   if(!search){

   return(<h1>Cargando...</h1>)
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
            <button /* disabled={!allValuesFilled} */  onClick ={handleSearch} >Search</button>
            <div>
            {
            Array.isArray(search)? search
               .map(el=>{
                return(
                    <div key ={el.id}>
                    <ol>
                    <li>From:{el.cityFrom}</li>
                    <li>To:{el.cityTo}</li>
                    <li>Price:{el.price}</li>               
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
            <div>

          <label>Filter price by:</label>
          <input
           type = "number"
           placeholder="Min Price"
           name = "minPrice"
           value = {prices.minPrice}
           onChange={handlePricesChange}
          />
         <input 
         type = "number"
         placeholder="Max Price"
         name = "maxPrice"
         value = {prices.maxPrice}        
         onChange={handlePricesChange}
         />
         <button onClick={handlePriceSearch}>Filter</button>
        </div>
            <label>Order by hour</label>
            <select onChange={handleSelectHour}>
              <option value ="all">Select your hour</option>
              <option value ="asc">Asc Hour </option>
              <option value ="desc"> Desc Hour</option>
            </select>

     {/*   <button onClick={handleOrderHour}>Ordening by hour</button> */}
        </div>
    )
              }