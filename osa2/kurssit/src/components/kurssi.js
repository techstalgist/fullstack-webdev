import React from 'react'

const Otsikko = ({nimi}) => {
    return (
        <h2>{nimi}</h2>
    )
}

const Osa = ({nimi, tehtavia}) => {
    return (
        <li>{nimi} {tehtavia}</li>
    )
}

const Sisalto = ({osat}) => {
    return (
        <div>
            <h3>sisältö</h3>
            <ul>
                {osat.map(o => <Osa key={o.nimi} nimi={o.nimi} tehtavia={o.tehtavia}/>)}
            </ul>
        </div>
    )
}

const Yhteensa = ({osat}) => {
    const summaaja = (acc, alkuarvo) => acc + alkuarvo; 
    return (
        <p>yhteensä {osat.map(el => el.tehtavia).reduce(summaaja)} tehtävää</p>
    )
}

const Kurssi = ({kurssi}) => {
    return (
        <div>
            <Otsikko nimi={kurssi.nimi}/>
            <Sisalto osat={kurssi.osat}/>
            <Yhteensa osat={kurssi.osat}/>
        </div>
    )
}

export default Kurssi