import './App.css';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import { useEffect, useState } from 'react';
import { DataContext } from './context/Data';

const url = 'https://api.openweathermap.org/data/2.5/'
const key = '24f4b587a66c966e59769c3b0f9ce4fb'

function App() {
  const [data, setData] = useState({})
  const [dataList, setDataList] = useState([])
  const [city, setCity] = useState('')
  const [favorites, setFavorites] = useState([])

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

  const openDetail=async(cityName)=>{
    const result = `${url}forecast?q=${cityName}&lang=tr&appid=${key}&units=metric`
    const response = await fetch(result);
    const weatherData = await response.json()
    setData(weatherData)
    setDataList(weatherData.list)
    
}

useEffect=(()=>{
  fetchData()
  const localList = JSON.parse(localStorage.getItem('data'))
  setFavorites(localList)
  console.log(localList)

})

  const allData = { data, setData, city, setCity, data, dataList, setDataList, favorites,setFavorites, openDetail }



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
