
import { useEffect, useState } from "react"
import { searchFligths, searchByPrice, orderByHour ,getApiDetail} from "../helpers/getData"

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
    console.log(resultPrices)
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
      console.log(sortHour)

      setSearch(sortHour)

    }
  }

  const changeIdFligth=(e) =>{
    const dataDetail = async () => {
      const infoDetails= await getApiDetail(e.target.value)
      setDetail(infoDetails)
    }
    dataDetail()
    .catch((err) => {
      console.log(err.message);
   });
      setShowModal(true)
  }

  const handleCloseModal= (e) =>{
    setShowModal(false)

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
                        <button onClick={handleCloseModal}>Close</button>
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