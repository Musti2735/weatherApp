import './App.css';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import { useState } from 'react';
import { DataContext } from './context/Data';

const url = 'https://api.openweathermap.org/data/2.5/'
const key = '24f4b587a66c966e59769c3b0f9ce4fb'

function App() {
  const [data, setData] = useState({})
  const [dataList, setDataList] = useState([])
  const [city, setCity] = useState('izmir')
  const [favorites, setFavorites] = useState([])

  const fetchData = async () => {
    const result = `${url}forecast?q=${city}&lang=tr&appid=${key}&units=metric`
    const response = await fetch(result);
    const weatherData = await response.json()
    setData(weatherData)
    setDataList(weatherData.list)
    console.log(weatherData)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    setCity('')
  }

  const allData = { data, setData, city, setCity, data, dataList, setDataList, favorites, setFavorites }

  return (
    <DataContext.Provider value={allData}>
      <div className="App">

        <Header />
        <div className='form'>
          <form onSubmit={handleSubmit} >
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            <button type='submit'>Buton</button>
          </form>
        </div>
        <div className='d-flex justify-content-center mt-5'>
            {data.city ? <WeatherCard /> : null}
        </div>

    
      </div>
    </DataContext.Provider>
  );
}

export default App;
