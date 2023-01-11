
import { useContext, useEffect } from "react";
import { DataContext } from "../context/Data";
import { FaTimes } from 'react-icons/fa'

function FavoriteList() {
    const { favorites, setFavorites, openDetail } = useContext(DataContext)

    const removeItem = (id) => {
        setFavorites(favorites.filter((item) => {
            return item.city.id != id
        }));
    }

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <div>
            {favorites.map((item, index) => {
                return (

                    <div key={index} className="fav">
                        <div className="favIcon">
                            <FaTimes className="icon" value={item.city.id} onClick={() => removeItem(item.city.id)} />
                        </div>
                        <div key={index} className='favCard' onClick={() => openDetail(item.city.name)} >
                            <div className="favItem" >
                                <div className='favCity' >{item.city.name}</div>
                                <div className="favDesc">{item.list[0].weather[0].description.slice(0, 1).toUpperCase() + item.list[0].weather[0].description.slice(1, item.list[0].weather[0].description.length).toLowerCase()}</div>

                            </div>
                            <div className="favItem" >
                                <div className="favDegree">{Math.floor(item.list[0].main.feels_like)}°
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default FavoriteList;