import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

const PokemonList = () => {
  const [pokemon, setPokemon] = useState()
  const [pokemonURL, setPokemonURL] = useState(
    'https://pokeapi.co/api/v2/pokemon/1'
  )
  /////   for search
  const [pokemonName, setPokemonName] = useState('')
  const [error, setError] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const searchButtonRef = useRef(null)

  useEffect(() => {
    if (pokemonName === '') {
      setSuggestions([])
    }
  })

  const searchPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      )
      setPokemon(response.data)
      setError(null)
    } catch (error) {
      setPokemon(null)
      setError('Pokémanz not found!')
    }
  }
  const fetchSuggestions = async (inputValue) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`
      )
      const pokemonList = response.data.results
      const filteredSuggestions = pokemonList
        .filter((pokemon) => pokemon.name.startsWith(inputValue.toLowerCase()))
        .map((pokemon) => pokemon.name)
      setSuggestions(filteredSuggestions)
    } catch (error) {
      console.error('Error fetching Pokémanz:', error)
    }
  }
  const handleSuggestionClick = (suggestion) => {
    setPokemonName(suggestion)
    setSuggestions([])
  }
  const handleInputChange = (e) => {
    setPokemonName(e.target.value)
    fetchSuggestions(e.target.value)
  }

  useEffect(() => {
    if (pokemonName !== '') {
      searchPokemon()
    }
  }, [pokemonName])
  /////

  const fetchPokemon = async () => {
    try {
      const response = await axios.get(pokemonURL)
      setPokemon(response.data)
    } catch (error) {
      console.error(`Error fetching single Pokéman: ${error}`)
    }
  }
  useEffect(() => {
    fetchPokemon()
  }, [pokemonURL])

  return (
    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5%' }}>
      <div>
        <input
          type='text'
          value={pokemonName}
          onChange={handleInputChange}
          placeholder='Enter Pokémon name'
          style={{ marginTop: '5%' }}
        />
        <button onClick={searchPokemon} ref={searchButtonRef}>
          Search
        </button>
        {error && <p>{error}</p>}
        {suggestions?.length > 0 && (
          <ul>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='poke-box'>
        <h4>Selected Pokémon:</h4>
        <img src={pokemon?.sprites.front_default} alt={pokemon?.name} />
        <br />
        &nbsp;&nbsp;
        <strong>{pokemon?.name.toUpperCase()}</strong>
        <h6>Weight:</h6>
        &nbsp;&nbsp;{pokemon?.weight}
        <h6>Type(s):</h6>
        {pokemon?.types.map((type) => (
          <ul key={type.slot} style={{ listStyle: 'none' }}>
            <li>{type.type.name.toUpperCase()}</li>
          </ul>
        ))}
      </div>
    </div>
  )
}

export default PokemonList
