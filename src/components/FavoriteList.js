import { useContext } from "react";
import { DataContext } from "../context/Data";

function FavoriteList() {
    const { favorites, setFavorites, openDetail } = useContext(DataContext)

    return (
        <div>
            <h4>Favoriler</h4>
            {favorites.map((item, index) => {
                return (
                    <div key={index} className='hours' >
                        <h3>{item.city.name}</h3>
                        <p>{Math.floor(item.list[0].main.feels_like)}°C  </p>
                        <button value={item.city.name} onClick={() => openDetail(item.city.name)}>Göster</button>
                        <button value={item.city.id} onClick={() => setFavorites(favorites.filter((delItem) => {
                            return delItem.city.id != item.city.id
                        }))} >Favoriden Kaldır</button>
                    </div>
                )
            })}
        </div>
    )
}

export default FavoriteList;