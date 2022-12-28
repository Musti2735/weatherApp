import { useContext, useEffect, useState } from "react";
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
    const otherDays = [secondDay, thirdDay, fourthDay, fifthDay]    
     

    const favori = () => {
        if (favorites.length == 0) {
            setFavorites([...favorites, data])
        }
        else if (favorites.length == 10) {
            console.log('daha fazla eklenemez')
        }
        else {
            for (let i = 0; i < favorites.length; i++) {
                if (data == favorites[i]) {
                    setFavorites(favorites)
                }
                else {
                    setFavorites([...favorites, data])
                }
            }
        }
    }



const maxDeg =(arr)=>{
    let maxDeger = Math.floor(arr.map((hour) => hour.main.temp_max).sort((a, b) => b - a)[0]) + 1
    return maxDeger
}

const minDeg=(arr)=>{
   let minDeg =  Math.floor(arr.map((hour) => hour.main.temp_min).sort((a, b) => a - b)[0])
   return minDeg
}

console.log(data.city.sunrise)

let timezone = data.city.timezone;
let sunrise = data.city.sunrise;
let sunset = data.city.sunset;

const rise = new Date((timezone+sunrise)*1000).toUTCString()
const set = new Date((timezone+sunset)*1000).toUTCString()

console.log(rise);
console.log(set)



    return (

        <div className="card"  >

            <h3>{data.city.name}</h3>
            <div>
                <h4>{Math.floor(currentDay[0].main.feels_like)} °C </h4>
                <p>En Yüksek {maxDeg(currentDay)} °C</p>
                <p>En Düşük {minDeg(currentDay)} °C</p>

                <sun rise={1672205281} />
                <p>Hava durumu {currentDay[0].weather[0].description} {currentDay[0].weather[0].icon} </p>
                <p>Gündoğumu {rise}</p>
                <p>Günbatımı {set}</p>
                <img src={`http://openweathermap.org/img/w/${currentDay[0].weather[0].icon}.png`}></img>
            </div>

            <div>
                <button onClick={() => setDetail(!detail)} >Detay</button>
                <button onClick={() => favori()} >Favori</button>
            </div>
            <div className="hours">
                {detail && currentDay.map((hour, index) => {
                    return (
                        <div key={index} className='hour'>
                            <p>{hour.dt_txt.slice(10, 16)}</p>
                            {hour.main ? <p>Gündüz: {Math.floor(hour.main.temp_max)} °C</p> : null}
                            {hour.main ? <p>Gece: {Math.floor(hour.main.temp_min)} °C</p> : null}
                            {hour.main ? <p>Hava : {hour.weather[0].description}</p> : null}
                        </div>
                    )
                })

                }
            </div>
            <div className="hours">
                <h3>Diğer günler</h3>
                {otherDays.map((day, index) => {

                    let tarih =day[0].dt_txt.slice(0,10).split("-").reverse().join(".");
       
                    return (
                        <div key={index} className='hour'>
                            <h4>{tarih}</h4>
                            <p>En Yüksek {maxDeg(day)} °C</p>
                            <p>En Düşük {minDeg(day)} °C</p>
                        </div>
                    )
                })}
            </div>

            {favorites.length > 0 ? <FavoriteList /> : <p>Favori listeniz boş</p>}

        </div>
    )
}

export default WeatherCard;