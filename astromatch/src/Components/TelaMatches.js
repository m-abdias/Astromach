import React from 'react'
import '../App.css'
import { useState, useEffect } from 'react'
// import styled from 'styled-components'

import logotipo from '../imgs/astromatch-logo.png'
import axios from 'axios'

function TelaMatches(props) {
  const [matches, setMatches] = useState([])
  const urlBase =
    'https://us-central1-missao-newton.cloudfunctions.net/astroMatch/mariana-goncalves'

  useEffect(() => {
    getMatches()
  }, [])

  // Retorna um array de perfis que deram match com você.
  const getMatches = () => {
    axios
      .get(`${urlBase}/matches`)
      .then(response => {
        setMatches(response.data.matches)
      })
      .catch(error => {
        console.log(error)
      })
  }

  // Limpa todos os matches e perfis vistos.
  const clearMatches = () => {
    axios
      .put(`${urlBase}/clear`)
      .then(response => {
        console.log('limpou', response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="TelaMatche">
      <div className="Astromatch">
        <header>
          <div>
            <img
              className="logo-astromatch"
              src={logotipo}
              alt="Logotipo do Astromatch"
            />
          </div>
          <div>
            <svg viewBox="0 0 24 24" onClick={() => props.Voltar('Voltar')}>
              <path d="M16,9C18.33,9 23,10.17 23,12.5V15H17V12.5C17,11 16.19,9.89 15.04,9.05L16,9M8,9C10.33,9 15,10.17 15,12.5V15H1V12.5C1,10.17 5.67,9 8,9M8,7A3,3 0 0,1 5,4A3,3 0 0,1 8,1A3,3 0 0,1 11,4A3,3 0 0,1 8,7M16,7A3,3 0 0,1 13,4A3,3 0 0,1 16,1A3,3 0 0,1 19,4A3,3 0 0,1 16,7M9,16.75V19H15V16.75L18.25,20L15,23.25V21H9V23.25L5.75,20L9,16.75Z"></path>
            </svg>
          </div>
        </header>
        <main>
          <div className="img-card-matche">
            <ul>
              {matches.map(match => {
                return (
                  <li key={match.id}>
                    <img src={match.photo} />
                    <p>{match.name}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </main>
        <footer>
          <button className="clear" onClick={clearMatches}>
            Clear
          </button>
        </footer>
      </div>
    </div>
  )
}

export default TelaMatches
