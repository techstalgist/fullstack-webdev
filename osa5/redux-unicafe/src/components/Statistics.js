import React from 'react'
import Statistic from './Statistic'

const Statistics = (props) => {
    const {arviot} = props;
    const arvioita = (arviot) => arviot.good+arviot.ok+arviot.bad
    
    const pyorista = (numero) => {
      return Math.round(numero * 10) / 10
    }

    const metriikat = (arviot) => {
      const hyva = arviot.good
      const huono = arviot.bad
      const jakaja = arvioita(arviot)
      if (jakaja === 0) return {ka: 0, pos: 0}

      const pos = pyorista(hyva/jakaja*100)
      const ka = pyorista((hyva - huono) / jakaja)
      return {ka, pos}
    }
  
    const statistiikat = (arviot) => {
      if (arvioita(arviot) === 0) {
        return (<p>Yhtään palautetta ei ole annettu</p>)
      }
      return (
        <div>
          <table>
            <tbody>
              <Statistic name="hyvä" value={arviot.good} />
              <Statistic name="neutraali" value={arviot.ok} />
              <Statistic name="huono" value={arviot.bad} />
              <Statistic name="keskiarvo" value={metriikat(arviot).ka} />
              <Statistic name="positiivisia" value={metriikat(arviot).pos + " %"} />
            </tbody>
          </table>
        </div>
      )
    }
  
    return (
      <div>
        <h1>Statistiikka</h1>
        {statistiikat(arviot)}
      </div>
    )
}

export default Statistics