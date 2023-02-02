

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
export {getApiData, searchFligths,sortPricesFligths}