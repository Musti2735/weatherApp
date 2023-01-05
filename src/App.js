import './App.css';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import { useEffect, useState } from 'react';
import { DataContext } from './context/Data';

const url = 'https://api.openweathermap.org/data/2.5/'
const key = '94dd583e6b4a62df0bd4411aeba8bc53'

function App() {
  const [data, setData] = useState({})
  const [dataList, setDataList] = useState([])
  const [city, setCity] = useState('')
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('data')) || [])
  

  function getLocation(){
    return navigator.geolocation.getCurrentPosition(displayLocationInfo)
  }

  function displayLocationInfo(position) {
    const lon = position.coords.longitude;
    const lat = position.coords.latitude;
    const localGeo = `${url}forecast?lat=${lat}&lon=${lon}&lang=tr&appid=${key}&units=metric`
    fetch(localGeo)
    .then(res=>res.json())
    .then(localData=>{
       setDataList(localData.list)
       setData(localData)
    })
  
  } 


  useEffect(()=>{
getLocation()
  
  },[])



  const fetchData = async () => {
    const result = `${url}forecast?q=${city}&lang=tr&appid=${key}&units=metric`
    const response = await fetch(result);
    const weatherData = await response.json()
    setData(weatherData)
    setDataList(weatherData.list)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    setCity('')
  }

  const openDetail = async (cityName) => {
    const result = `${url}forecast?q=${cityName}&lang=tr&appid=${key}&units=metric`
    const response = await fetch(result);
    const weatherData = await response.json()
    setData(weatherData)
    setDataList(weatherData.list)
  }


  const allData = { data, setData, city, setCity, data, dataList, setDataList, favorites, setFavorites, openDetail }



  return (
    <DataContext.Provider value={allData}>
      <div className="App">

        <Header />
        <div className='form'>
          <form onSubmit={handleSubmit} >
            <input placeholder="Şehir..."

              className='input' type="text" value={city} onChange={(e) => setCity(e.target.value)} />

          </form>
        </div>

        {data.city ? <WeatherCard /> : null}



      </div>
    </DataContext.Provider>
  );
}

export default App;
