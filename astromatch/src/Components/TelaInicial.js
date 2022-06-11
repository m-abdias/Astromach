import React from 'react'
import axios from 'axios'
import '../App.css'
import { useEffect, useState } from 'react'

import logotipo from '../imgs/astromatch-logo.png'

function TelaInicial(props) {
  const [profile, setProfile] = useState({})
  const [like, setLike] = useState([])
  const urlBase =
    'https://us-central1-missao-newton.cloudfunctions.net/astroMatch/mariana-goncalves'

  // Função useEffect para renderizar os perfis na tela
  useEffect(() => {
    getProfileToChoose()
  }, [])

  // Retorna um perfil que ainda não foi visto por você.
  const getProfileToChoose = () => {
    axios
      .get(`${urlBase}/person`)
      .then(response => {
        setProfile(response.data.profile)
        console.log('get perfil', response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  // Recebe um id e uma escolha (choice). A escolha é a opção do usuário no momento do swipe. Deve ser true ou false.  (Ao clicar no like)
  const choosePersonYes = () => {
    const body = {
      id: profile.id,
      choice: 'true'
    }
    axios
      .post(`${urlBase}/choose-person`, body)
      .then(response => {
        setLike(response.data.profile)
        console.log('arraylike', like)
        getProfileToChoose()
      })
      .catch(error => {
        console.log(error)
      })
  }

  // Recebe um id e uma escolha (choice). A escolha é a opção do usuário no momento do swipe. Deve ser true ou false.  (Ao clicar no Deslike)
  const choosePersonNo = () => {
    const body = {
      id: profile.id,
      choice: 'false'
    }
    axios
      .post(`${urlBase}/choose-person`, body)
      .then(response => {
        setLike(response.data.profile)
        console.log('arraylike', like)
        getProfileToChoose()
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
    <div className="TelaInicial">
      <div className="Astromatch">
        <header className="Cabeçalho">
          <img
            className="logo-astromatch"
            src={logotipo}
            alt="Logotipo do Astromatch"
          />
          <svg
            className="logo-matches"
            viewBox="0 0 24 24"
            onClick={() => props.Matches('Matches')}
          >
            <path d="M22.59,7.92L23.75,9.33L19,14.08L16.25,11.08L17.41,9.92L19,11.5L22.59,7.92M6,5A3,3 0 0,1 9,8A3,3 0 0,1 6,11A3,3 0 0,1 3,8A3,3 0 0,1 6,5M11,5A3,3 0 0,1 14,8A3,3 0 0,1 11,11C10.68,11 10.37,10.95 10.08,10.85C10.65,10.04 11,9.06 11,8C11,6.94 10.65,5.95 10.08,5.14C10.37,5.05 10.68,5 11,5M6,13C8,13 12,14 12,16V18H0V16C0,14 4,13 6,13M12.62,13.16C14.63,13.5 17,14.46 17,16V18H14V16C14,14.82 13.45,13.88 12.62,13.16Z"></path>
          </svg>
        </header>
        <main>
          <div className="card-person" key={profile.id}></div>
          <div className="img-card-person">
            <img src={profile.photo} />
          </div>
          <div className="description-person">
            <p className="perfil-idade">
              <strong>
                {profile.name}, {profile.age}
              </strong>
            </p>
            <p>{profile.bio}</p>
          </div>
        </main>
        <footer>
          <button className="no" onClick={choosePersonNo}>
            x
          </button>
          <button className="clear" onClick={clearMatches}>
            Clear
          </button>
          <button className="yes" onClick={choosePersonYes}>
            ♥
          </button>
        </footer>
      </div>
    </div>
  )
}

export default TelaInicial
