import './App.css'
import PokemonList from './components/PokemonList'
import logo from './images/poke_logo.png'

function App() {
  return (
    <>
      <div className='header'>
        <img src={logo} alt='Pokémon Logo' style={{ height: '75px' }} />
      </div>

      <PokemonList />
    </>
  )
}

export default App
