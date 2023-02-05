

const getApiData= async() =>{

    const url = "https://flights-api-production.up.railway.app/api/flights"
    const data =  await fetch(url)
    .then (res =>res.json())
    .then(data =>data)
    return sortPricesFligths(data)
}

const searchFligths = (info,input)=>{ 
    const search = info.filter(el =>
        el.cityFrom.toLowerCase().includes(input.cityFrom.toLowerCase()) && el.cityTo.toLowerCase().includes(input.cityTo.toLowerCase()) && el.date.includes( input.date )&& el.availableSeats > input.passengers
    ) 
    return search.length ? search : {message: 'No hay vuelos disponibles'}
}

const sortPricesFligths = (info) =>{
    const sortPrices = info.sort((a, b) => a.price - b.price )
    return sortPrices

}


const searchByPrice =(info,prices)=>{

    const result = info.filter( el=>el.price >= prices.minPrice && el.price <= prices.maxPrice )
    console.log(result)
    return result.length? result:{message: "No hay vuelos disponibles con ese precio"}
}

const orderByHour =(info,order)=>{
 const sort =  order === "asc" ? info.sort((a,b)=> Date.parse(a.date) - Date.parse(b.date)):
 info.sort((a,b)=> Date.parse(b.date) - Date.parse(a.date))
 console.log(sort)
 
 return sort
}

const getApiDetail = async(id)=>{

    const url = `https://flights-api-production.up.railway.app/api/flights/${id}`
    const data =  await fetch(url)
    .then (res =>res.json())
    .then(data =>data)
    
    return data
}


const API_KEY= "0386930f5763e2b711a8a4f5"
const getApiExchangeRate = async()=>{
    const url =`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`
   const data = await fetch(url)
   .then (res =>res.json())
   .then(data=>data)
   return data
}

const calculatedMiles=(info,exChangeRate,selectCurrency,id)=>{
    const fligth= info?.find(el=>el._id === id)
    const miles = (selectCurrency === "COP"? fligth?.price * exChangeRate : fligth?.price)
    console.log(miles)
    return Math.round(miles/1.67)
}

calculatedMiles()
export {getApiData, searchFligths,sortPricesFligths,searchByPrice,orderByHour,getApiDetail,getApiExchangeRate,calculatedMiles}