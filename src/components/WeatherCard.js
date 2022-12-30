import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/Data";
import FavoriteList from './FavoriteList';
import PopularCities from './PopularCities'
import { FaInfo, FaStar, FaTrash, FaCalendarWeek, FaSun, FaMoon } from 'react-icons/fa'



function WeatherCard({ }) {
    const { city, data, setData, setCity, dataList, setDataList, favorites, setFavorites } = useContext(DataContext)
    const [detail, setDetail] = useState(false)
    const [backGround, setBackGraund] = useState('clouds')


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

    useEffect(() => {
        changeBackGroud()
        document.body.className = backGround
        console.log(currentDay[0].weather[0].main)
        console.log(backGround)
    }, [])

    const changeBackGroud = () => {
        switch (currentDay[0].weather[0].main) {
            case 'Clear':
                setBackGraund('clear')
                break
            case 'Clouds':
                setBackGraund('clouds')
                break
            case 'Snow':
                setBackGraund('snow')
                break
            case 'Rain':
                setBackGraund('rain')
                break
            default:
                return
        }
    }



    const maxDeg = (arr) => {
        let maxDeger = Math.floor(arr.map((hour) => hour.main.temp_max).sort((a, b) => b - a)[0]) + 1
        return maxDeger
    }

    const minDeg = (arr) => {
        let minDeg = Math.floor(arr.map((hour) => hour.main.temp_min).sort((a, b) => a - b)[0])
        return minDeg
    }

    let timezone = data.city.timezone;
    let sunrise = data.city.sunrise;
    let sunset = data.city.sunset;

    const rise = new Date((timezone + sunrise) * 1000).toUTCString().slice(17, 22)
    const set = new Date((timezone + sunset) * 1000).toUTCString().slice(17, 22)

    let desc = currentDay[0].weather[0].description
    return (
        <div className="container">

            <div className="favoriteList">
                {favorites.length > 0 ? <FavoriteList /> : <p>Favori listeniz boş</p>}
            </div>
            <div className="weaherCard">


                <div className='cardItem'>

                    <FaStar className="iconFav" onClick={() => favori()} />

                    <div className="cityName">{data.city.name}</div>
                    <div className="degree">{Math.floor(currentDay[0].main.feels_like)} °C </div>
                    <div className="desc">{desc.slice(0, 1).toUpperCase() + desc.slice(1, desc.length).toLowerCase()}  </div>


                    <div className="info">
                        <div className="info2">
                            <div>Y: {maxDeg(currentDay)} °C</div>
             
                        </div >
                        <div className="info2">
                        <div>D: {minDeg(currentDay)} °C</div>
                        </div>
                    
                        <div className="info1">
                            <div><FaSun/> {rise}</div>
                    
                        </div>
                        <div className="info1">
                        <div><FaMoon/> {set}</div>
                        </div>
                    </div>
                </div>
                <div className="hours">
                    {currentDay.map((hour, index) => {
                        return (
                            <div key={index} className=''>
                                <div className='hour'>{hour.dt_txt.slice(10, 16)}</div>
                                {hour.main ? <div>{Math.floor(hour.main.feels_like)} °C</div> : null}
                                {hour.main ? <div>{hour.weather[0].description}</div> : null}
                            </div>
                        )
                    })

                    }
                </div>
                <div className="" >
                    <FaCalendarWeek className="button" onClick={() => setDetail(!detail)} />
                </div>
                <div className="otherDaysList">
                    {detail && otherDays.map((day, index) => {
                        let tarih = day[0].dt_txt.slice(0, 10).split("-").reverse().join(".");
                        return (
                            <div key={index} className='otherDays'>
                                <div className="">{tarih}</div>
                                <div>Y : {maxDeg(day)} °C</div>
                                <div>D : {minDeg(day)} °C</div>
                                <div>{desc.slice(0, 1).toUpperCase() + desc.slice(1, desc.length).toLowerCase()}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="favoriteList">
                <PopularCities />
            </div>


        </div>
    )
}

export default WeatherCard;