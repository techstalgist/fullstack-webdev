import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <h1>{props.kurssi}</h1>
    )
}

const Osa = (props) => {
    return (
        <p>{props.nimi} {props.tehtavia}</p>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            {props.osat.map((o) => {
                    return (
                        <Osa key={o.nimi} nimi={o.nimi} tehtavia={o.tehtavia} />
                    )
                }
            )}    
        </div>
    )
}

const Yhteensa = (props) => {
    let lkm = 0;
    props.osat.forEach((o) => lkm += o.tehtavia);
    return (
        <p>yhteensä {lkm} tehtävää</p>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10,
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14
          }
        ]
    }

  return (
    <div>
      <Otsikko kurssi={kurssi.nimi}/>
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)