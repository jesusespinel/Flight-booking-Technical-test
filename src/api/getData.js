

const getApiData= async() =>{

    const url = "https://flights-api-production.up.railway.app/api/flights"
    const data =  await fetch(url)
    .then (res =>res.json())
    .then(data =>data)
}
export {getApiData}