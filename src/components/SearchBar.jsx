
import { useEffect, useState } from "react"
import { searchFligths, searchByPrice, orderByHour ,getApiDetail,getApiExchangeRate,calculatedMiles} from "../helpers/getData"

export default function SearchBar({ info}) {

 

  const [search, setSearch] = useState([])
  const [data, setData] = useState([])
  const [hour, setHour] = useState("")
//------------------------------------------------
  const [showModal,setShowModal] = useState(false)
  const [detail,setDetail] = useState({})
  //--------------------------------------------------
  const [prices, setPrices] = useState({
    minPrice: 0,
    maxPrice: 0
  })
//-----------------------------------------------------

  const [input, setInput] = useState({
    cityFrom: "",
    cityTo: "",
    date: "",
    passengers: ""
  })
//-------------------------------------------------------

const [exChangeRate,setExchangeRate] = useState(0)
const [selectCurrency,setSelectCurrency] = useState("COP")
const [indatumMiles,setIndatumMiles] = useState(0)




//-------------------------------------------------------

useEffect(()=>{
  const rates = async() =>{
  const info = await getApiExchangeRate()
  setExchangeRate(info.conversion_rates.COP)
  }
  rates()
},[])

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
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

  const handlePriceSearch = () => {
    const resultPrices = searchByPrice(data, prices)
    setSearch(resultPrices)
  }

  function handleSearch(e) {

    const result = searchFligths(info, input)
    setSearch(result)
    setData(result)
    setInput({
      cityFrom: "",
      cityTo: "",
      date: "",
      passengers: ""
    })
  }

  const handleSelectHour = (e) => {
    if (e.target.value !== "all") {
      setHour(e.target.value)
      const sortHour = orderByHour(data, hour)
      setSearch(sortHour)

    }
  }

  const changeIdFligth=(e) =>{
    const dataDetail = async () => {
      const infoDetails= await getApiDetail(e.target.value)
       setDetail(infoDetails)
      const IndatumGainedMiles =  calculatedMiles(info,exChangeRate,selectCurrency,e.target.value)
        setIndatumMiles(IndatumGainedMiles)  
    }
    dataDetail()
    .catch((err) => {
      console.log(err);
   });
      setShowModal(true)
  }
  

  const handleCloseModal= (e) =>{
    setShowModal(false)

  }
  const handleSelectCurrency=(e)=>{
      setSelectCurrency(e.target.value)

  }

  



  if (!search) {

    return (<h1>Cargando...</h1>)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Origin"
        onChange={handleInputChange}
        name="cityFrom"
        value={input.cityFrom}
      />
      <input
        type="text"
        placeholder="Destinity"
        onChange={handleInputChange}
        name="cityTo"
        value={input.cityTo}
      />
      <label>Departure date</label>
      <input
        type="date"
        value={input.date}
        name="date"
        onChange={handleInputChange}
      />
      <input
        type="number"
        placeholder="Number of passengers"
        onChange={handleInputChange}
        name="passengers"
        value={input.passengers}
      />
      <button /* disabled={!allValuesFilled} */ onClick={handleSearch} >Search</button>
      <div>
        {
          Array.isArray(search) ? search
            .map(el => {
              return (
                <div key={el._id}>
                  <ol>
                    <li>From:{el.cityFrom}</li>
                    <li>To:{el.cityTo}</li>
                    <li>Price:{el.price}</li>
                    <li>Seats:{el.availableSeats}</li>
                    <li>Date:{el.date}</li>
                  </ol>
                  <button  value ={el._id} onClick={(e)=>changeIdFligth(e)}>Purchase</button>
                              
                </div>
              )

            }
            ) :
            <h1>{search.message}</h1>

        }
      </div>
      <div>
      {          
                    showModal && detail && (
                      <ul>
                        <h1>SOY MODAL!</h1>
                        <li>Id:{detail._id}</li>
                        <li>From:{detail.cityTo}</li>
                        <li>To:{detail.cityFrom}</li>
                        <li>Price:{detail.price}</li>
                        <li>Seats:{detail.availableSeats}</li>
                        <li>Date:{detail.date}</li>
                        <label>Please select the currency for your purchase:</label>
                        <select onChange={handleSelectCurrency}>   
                        <option value="COP">COP</option>          
                        <option value="USD">USD</option>
                         </select>
                          <li><p>Congratulations!,You have won {indatumMiles} for the purchasing of you fligth!!</p></li>
                            <button> Confirm Purchase</button>
                          <button onClick={handleCloseModal}>Cancel Purchase</button>                                        
                      </ul>
                   
                      
                    )
                  }
                
      </div>
      <div>
        <label>Filter price by:</label>
        <input
          type="number"
          placeholder="Min Price"
          name="minPrice"
          value={prices.minPrice}
          onChange={handlePricesChange}
        />
        <input
          type="number"
          placeholder="Max Price"
          name="maxPrice"
          value={prices.maxPrice}
          onChange={handlePricesChange}
        />
        <button onClick={handlePriceSearch}>Filter</button>
      </div>
      <label>Order by hour</label>
      <select onChange={handleSelectHour}>
        <option value="all">Select your hour</option>
        <option value="asc">Asc Hour </option>
        <option value="desc"> Desc Hour</option>
      </select>
    </div>
  )
}