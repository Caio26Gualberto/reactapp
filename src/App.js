import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import api from './services/api'
import './styles.css'

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {
    if (input === '') {
      alert('Preencha com algum dado!')
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')

    } catch {
      alert('Ops, erro ao buscar o Cep')
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className='title'>Buscador CEP</h1>

      <div className='containerInput'>
        <input type='text' placeholder='Digite seu cep' value={input} onChange={(event) => setInput(event.target.value)}></input>
        <button className='buttonSearch'><FiSearch size={25} color='#FFF' onClick={handleSearch} /></button>
      </div>
      <div>
        {Object.keys(cep).length > 0 && (
          <main className='main'>
            <h2>CEP: {cep.cep}</h2>
            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento === '' ? 'N/A' : cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
          </main>
        )}

      </div>
    </div>
  );
}

export default App;
