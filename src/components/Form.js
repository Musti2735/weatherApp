import { useContext } from "react";
import { DataContext } from "../context/Data";

function Form() {

    const { city, setCity, handleSubmit } = useContext(DataContext)

    return (

        <div className='form'>
            <form onSubmit={handleSubmit} >
                <div>
                    <input placeholder="Şehir..."
                        className='input' type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <button className="formBtn">Ara</button>
            </form>
        </div>
    )
}

export default Form;;