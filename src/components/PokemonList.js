import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

const PokemonList = () => {
  const [pokemon, setPokemon] = useState()
  const [pokemonURL, setPokemonURL] = useState()
  /////   for search
  const [pokemonName, setPokemonName] = useState('')
  const [error, setError] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const searchButtonRef = useRef(null)

  useEffect(() => {
    if (pokemonName === '') {
      setSuggestions([])
    }
  }, [])

  const searchPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      )
      setPokemon(response.data)
      setError(null)
    } catch (error) {
      setPokemon(null)
      // setError('Pokémanz not found!')
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
        <button
          onClick={searchPokemon}
          ref={searchButtonRef}
          style={{ display: 'none' }}
        >
          Search
        </button>
        {error && <p>{error}</p>}
        {suggestions?.length > 0 && (
          <ul className='list'>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className='list-item'
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      {pokemon ? (
        <div className='poke-box'>
          <strong className='poke-title'>{pokemon.name}</strong>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className='poke-sprite'
          />
          <h2>
            {pokemon.stats.map((stat) => {
              if (stat.stat.name === 'hp') {
                return stat.base_stat
              }
            })}
          </h2>
          {/*
                TO DISPLAY TYPES, USEFUL FOR REFERENCE LATER
            <h6>Type(s):</h6>
          {pokemon?.types.map((type) => (
            <ul key={type.slot} style={{ listStyle: 'none' }}>
              <li>{type.type.name.toUpperCase()}</li>
            </ul>
          ))} */}
        </div>
      ) : (
        <div style={{ marginLeft: '10%', fontSize: '2rem' }}>
          Pick a Pokémon
        </div>
      )}
    </div>
  )
}

export default PokemonList
