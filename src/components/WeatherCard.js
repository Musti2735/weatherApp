import { useContext, useState } from "react";
import { DataContext } from "../context/Data";
import FavoriteList from "./FavoriteList";

function WeatherCard({ }) {
    const { city, data, setData, setCity, dataList, setDataList, favorites, setFavorites } = useContext(DataContext)
    const [detail, setDetail] = useState(false)


    const currentDay = dataList.filter((day) => day.dt_txt.slice(0, 10) === dataList[0].dt_txt.slice(0, 10))
    const secondDay = dataList.filter((day) => day.dt_txt.slice(0, 10) === dataList[currentDay.length].dt_txt.slice(0, 10))
    const thirdDay = dataList.filter((day) => day.dt_txt.slice(0, 10) === dataList[currentDay.length + 8].dt_txt.slice(0, 10))
    const fourthDay = dataList.filter((day) => day.dt_txt.slice(0, 10) === dataList[currentDay.length + 16].dt_txt.slice(0, 10))
    const fifthDay = dataList.filter((day) => day.dt_txt.slice(0, 10) === dataList[currentDay.length + 24].dt_txt.slice(0, 10))

    const addFavorites=()=>{
        let favoriteData = favorites.push(data)
        console.log(favorites)
        setFavorites(favoriteData)
    }

    return (

        <div className="card">
            <h3>{data.city.name}</h3>
            <div>
            <h4>{Math.floor(currentDay[0].main.feels_like)} °C </h4>
                <p>En Yüksek {Math.floor(currentDay.map((hour) => hour.main.temp_max).sort((a, b) => b - a)[0])+1} °C</p>
                <p>En Düşük {Math.floor(currentDay.map((hour) => hour.main.temp_min).sort((a, b) => a - b)[0])} °C</p>
          
                <p>Hava durumu {currentDay[0].weather[0].description} {currentDay[0].weather[0].icon} </p>
            </div>

            <div>
                <button onClick={() =>setDetail(!detail) } >Detay</button>
                <button onClick={() => addFavorites()} >Favori</button>
            </div>
            <div className="hours">
            {detail && currentDay.map((hour, index) => {
                                return (
                                    <div key={index} className='hour'>
                                        <p>Saat: {hour.dt_txt.slice(10, 16)}</p>
                                        {hour.main ? <p>Derece: {Math.floor(hour.main.temp_max)} °C</p> : null}
                                        {hour.main ? <p>Hava : {hour.weather[0].description}</p> : null}
                                    </div>
                                )
                            })
          
            }
            </div>
           <FavoriteList/>
        </div>
            )
}

 export default WeatherCard;