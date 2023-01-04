
import { useContext } from "react";
import { DataContext } from "../context/Data";
import { FaInfo, FaStar, FaTimes } from 'react-icons/fa'

function FavoriteList() {
    const { favorites, setFavorites, openDetail } = useContext(DataContext)

    

    return (
        <div>
            <h4 className='favHeader'>Favoriler</h4>
            {favorites.map((item, index) => {
                return (

                    <div key={index} className="fav">
                        <div className="favIcon">
                            <FaTimes className="icon" value={item.city.id} onClick={() => setFavorites(favorites.filter((delItem) => {
                                return delItem.city.id != item.city.id
                            }))} />
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