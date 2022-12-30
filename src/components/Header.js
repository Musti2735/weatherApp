import { useState } from "react";

function Header() {
    const [date, setDate] = useState(new Date())

    let day;
    switch (date.getDay()) {
        case 1:
           day = 'Pazartesi'
            break;
        case 2:
            day =   'Salı'
            break;
        case 3:
            day =   'Çarşamba'
            break;
        case 4:
            day =   'Perşembe'
            break;
        case 5:
            day =   'Cuma'
            break;
        case 6:
            day =   'Cumartesi'
            break;
        case 7:
            day =   'Pazar'
            break;
        default:
    }

    return (
        <div className="navigation">
            <div className="navItem">
            <h3>Weather App</h3>
            </div>
            <div className="navItem"><p>Gamze ve Safiye'ye Sevgilerle...</p></div>
            <div className="navItem">
            <p>{`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${day}`}</p>
            <p>{`${date.getHours()}:${date.getMinutes()}`}</p>
            </div>

        </div>
    )
}

export default Header;

//Header kısmında uygulamanın ismini ve tarih/saat bilgisini gösterdik.