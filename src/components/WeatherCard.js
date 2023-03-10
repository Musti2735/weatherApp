import { useEffect, useState, useContext } from "react";
import { DataContext } from "../context/Data";
import FavoriteList from './FavoriteList';
import { FaStar, FaSun, FaMoon, FaArrowDown, FaArrowUp, FaWind } from 'react-icons/fa'
import Form from "./Form";

function WeatherCard({ }) {
    const { data, dataList, favorites, setFavorites, showFavorite, setShowFavorite } = useContext(DataContext)
    const [detail, setDetail] = useState(false)

    const currentDay = dataList.filter((day) => day.dt_txt.slice(0, 10) === dataList[0].dt_txt.slice(0, 10))
    const secondDay = dataList.filter((day) => day.dt_txt.slice(0, 10) === dataList[currentDay.length].dt_txt.slice(0, 10))
    const thirdDay = dataList.filter((day) => day.dt_txt.slice(0, 10) === dataList[currentDay.length + 8].dt_txt.slice(0, 10))
    const fourthDay = dataList.filter((day) => day.dt_txt.slice(0, 10) === dataList[currentDay.length + 16].dt_txt.slice(0, 10))
    const fifthDay = dataList.filter((day) => day.dt_txt.slice(0, 10) === dataList[currentDay.length + 24].dt_txt.slice(0, 10))
    const otherDays = [secondDay, thirdDay, fourthDay, fifthDay]

    const addFavori = (id) => {
        if (favorites.length == 0) {
            setFavorites([...favorites, data])
        }
        else {
            let newList = favorites.find((item) => item.city.id === id)
            if (newList === undefined) {
                setFavorites([...favorites, data])
            }
            else {
                console.log('daha önce eklendi')
            }
        }

    }

    const icon = currentDay[0].weather[0].icon

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

    const desc = (arr) => {
        let desc = arr.map((day) => day.weather[0].description)
        return desc
    }

    return (
        <div className="container">
            <div className="favoriteList--a">
                {favorites.length > 0 &&
                    <FavoriteList />}
            </div>
            <div className="card">
                <Form />
                {
                    favorites.length > 0 && <div className="toggleBtn" onClick={() => setShowFavorite(!showFavorite)}>Favoriler <div className="span">{favorites.length}</div> </div>
                }
                <div className="favoriteList--b">
                    {showFavorite && favorites.length > 0 && <FavoriteList />
                    }
                </div>
                <div className='cardItem'>
                    <div className="iconFav">
                        <FaStar onClick={() => addFavori(data.city.id)} />
                    </div>
                    <div className="cityName">{data.city.name}</div>
                    <div className="degree">{Math.floor(currentDay[0].main.feels_like)} °C </div>
                    <div className="desc">{desc(currentDay)[0].slice(0, 1).toUpperCase() + desc(currentDay)[0].slice(1, desc(currentDay)[0].length).toLowerCase()} </div>
                    <div className="image">
                        <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="img"></img>
                    </div>
                </div>
                <div className="info">
                    <div className="info1">
                        <div>
                            <FaArrowUp />
                            <div>{maxDeg(currentDay)}°</div>

                        </div >
                        <div>
                            <FaArrowDown />
                            <div>{minDeg(currentDay)}°</div>
                        </div>

                        <div>
                            <FaSun />
                            <div> {rise}</div>

                        </div>
                        <div>
                            <FaMoon />
                            <div> {set}</div>
                        </div>
                        <div>
                            <FaWind />
                            <div>{currentDay[0].wind.speed} km/s</div>

                        </div >
                    </div>
                    <div className="info2">
                        {dataList.slice(0, 5).map((hour, index) => {
                            return (
                                <div key={index}>
                                    <div>{hour.dt_txt.slice(10, 13)}</div>
                                    {hour.main ? <img width="40" height="40" src={`http://openweathermap.org/img/w/${hour.weather[0].icon}.png`} alt="img"></img> : null}
                                    {hour.main ? <div>{Math.floor(hour.main.feels_like)}°</div> : null}


                                </div>
                            )
                        })

                        }
                    </div>
                </div>
                <div className="showDays" onClick={() => setDetail(!detail)} >Haftalık Görünüm
                </div>
                <div className="otherDaysList">
                    {detail && otherDays.map((day, index) => {
                        let tarih = day[0].dt_txt.slice(0, 10).split("-").reverse().join(".");
                        const d = new Date(day[0].dt_txt.slice(0, 10))
                        let dayOfWeek;
                        switch (d.getDay()) {
                            case 0:
                                dayOfWeek = 'Pazar'
                                break;
                            case 1:
                                dayOfWeek = 'Pazartesi'
                                break;
                            case 2:
                                dayOfWeek = 'Salı'
                                break;
                            case 3:
                                dayOfWeek = 'Çarşamba'
                                break;
                            case 4:
                                dayOfWeek = 'Perşembe'
                                break;
                            case 5:
                                dayOfWeek = 'Cuma'
                                break;
                            case 6:
                                dayOfWeek = 'Cumartesi'
                                break;
                            default:
                                break;
                        }
                        return (
                            <div key={index} className='otherDays'>
                                <div className="">{tarih}</div>
                                <div>{dayOfWeek}</div>
                                <div><FaArrowUp /> {maxDeg(day)}° <FaArrowDown /> {minDeg(day)}°</div>
                                <div className="descInfo">{desc(day)[4]}</div>
                                <img width="40" height="40" src={`http://openweathermap.org/img/w/${day[4].weather[0].icon}.png`} alt="img"></img>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="favoriteList--a">
            </div>
        </div>
    )
}

export default WeatherCard;