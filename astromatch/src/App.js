import React from 'react'
import './App.css'
import { useState } from 'react'

import TelaInicial from './Components/TelaInicial'
import TelaMatches from './Components/TelaMatches'

function App() {
  // Estado para exibir e setar as telas do applicativo.
  const [telaExibir, setTelaExibir] = useState('Tela Inicial')

  // Função para alterar as telas
  const trocarDeTela = () => {
    if (telaExibir === 'Tela Inicial') {
      setTelaExibir('Matches')
    } else {
      setTelaExibir('Tela Inicial')
    }
  }

  return (
    <div>
      {telaExibir === 'Tela Inicial' ? (
        <TelaInicial Matches={trocarDeTela} />
      ) : (
        <TelaMatches Voltar={trocarDeTela} />
      )}
    </div>
  )
}

export default App
