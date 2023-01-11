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

    let days = date.getDate()
    let mounth = date.getMonth()+1
    let year = date.getFullYear()
    let hour = date.getHours()
    let minutes = date.getMinutes()

    return (
        <div className="header">
            <div className="navItem">
            <h3>Weather App</h3>
            </div>

            <div className="navItem">
            <p>{`${days<10 ? '0'+days:days}.${mounth+1<10 ? '0'+mounth : mounth}.${year} ${day}`}</p>
            <p>{`${hour<10 ? '0'+hour:hour}:${minutes<10?'0'+minutes:minutes}`}</p>
            </div>

        </div>
    )
}

export default Header;

//Header kısmında uygulamanın ismini ve tarih/saat bilgisini gösterdik.