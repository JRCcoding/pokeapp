import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import electric from '../images/electric_icon.png'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

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
  }, [pokemonName])

  const randomSelection = () => Math.floor(Math.random() * 20)
  const inputRef = useRef(false)

  const [open, setOpen] = useState(false)
  const toggleOpen = () => {
    setOpen(!open)
  }
  useEffect(() => {
    inputRef.current.focus()
  }, [open])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '10%',
        width: '40%',
        margin: '15% auto',
      }}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={'👇'}
          aria-controls='panel1a-content'
          id='panel1a-header'
          onClick={toggleOpen}
        >
          SEARCH:
        </AccordionSummary>
        <AccordionDetails>
          <input
            ref={inputRef}
            type='text'
            value={pokemonName}
            onChange={handleInputChange}
            placeholder='Pikachu...'
            style={{ width: '75%' }}
          />
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
        </AccordionDetails>
      </Accordion>
      <div>
        <button
          onClick={searchPokemon}
          ref={searchButtonRef}
          style={{ display: 'none' }}
        >
          Search
        </button>
      </div>
      {pokemon?.types.map((type) => {
        //////////     GRASS    TYPE    //////////
        if (type.type.name.includes('grass')) {
          return (
            <div className='poke-box grass'>
              <div className='poke-header'>
                <strong>{pokemon.name}</strong>
                <strong>
                  {pokemon.stats.map((stat) => {
                    if (stat.stat.name === 'hp') return stat.base_stat
                  })}
                </strong>
              </div>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className='poke-sprite'
              />
              <div className='poke-move'>
                <p> {pokemon?.moves[randomSelection()]?.move?.name}</p>
                <p> {pokemon?.moves[randomSelection()]?.move?.name}</p>
              </div>
            </div>
          )
          //////////     ELECTRIC    TYPE    //////////
        } else if (type.type.name.includes('electric')) {
          return (
            <div className='poke-box electric'>
              <div className='poke-header'>
                <strong>{pokemon.name}</strong>
                <strong>
                  {pokemon.stats.map((stat) => {
                    if (stat.stat.name === 'hp') return stat.base_stat
                  })}
                </strong>
              </div>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className='poke-sprite'
              />
              <div className='poke-move'>
                <p> {pokemon?.moves[randomSelection()]?.move?.name}</p>
                <p> {pokemon?.moves[randomSelection()]?.move?.name}</p>
              </div>
            </div>
          )
          //////////     FIRE    TYPE    //////////
        } else if (type.type.name.includes('fire')) {
          return (
            <div className='poke-box fire'>
              <div className='poke-header'>
                <strong>{pokemon.name}</strong>
                <strong>
                  {pokemon.stats.map((stat) => {
                    if (stat.stat.name === 'hp') return stat.base_stat
                  })}
                </strong>
              </div>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className='poke-sprite'
              />
              <div className='poke-move'>
                <p> {pokemon.moves[randomSelection()].move.name}</p>
                <p> {pokemon.moves[randomSelection()].move.name}</p>
              </div>
            </div>
          )
          //////////     WATER    TYPE    //////////
        } else if (type.type.name.includes('water')) {
          return (
            <div className='poke-box water'>
              <div className='poke-header'>
                <strong style={{ marginLeft: '15%' }}>{pokemon.name}</strong>
                <strong>
                  {pokemon.stats.map((stat) => {
                    if (stat.stat.name === 'hp') return stat.base_stat
                  })}
                </strong>
              </div>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className='poke-sprite'
              />
              <div className='poke-move'>
                <p> {pokemon.moves[randomSelection()].move?.name}</p>
                <p> {pokemon.moves[randomSelection()].move?.name}</p>
              </div>
            </div>
          )
          //////////     FIGHTING    TYPE    //////////
        } else if (type.type.name.includes('fighting')) {
          return (
            <div className='poke-box fighting'>
              <div className='poke-header'>
                <strong>{pokemon.name}</strong>
                <strong>
                  {pokemon.stats.map((stat) => {
                    if (stat.stat.name === 'hp') return stat.base_stat
                  })}
                </strong>
              </div>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className='poke-sprite'
              />
              <div className='poke-move'>
                <p> {pokemon?.moves[randomSelection()].move?.name}</p>
                <p> {pokemon?.moves[randomSelection()].move?.name}</p>
              </div>
            </div>
          )
        }
        //////////     FAIRY    TYPE    //////////
        else if (type.type.name.includes('fairy')) {
          return (
            <div className='poke-box fairy'>
              <div className='poke-header'>
                <strong style={{ marginLeft: '15%' }}>{pokemon.name}</strong>
                <strong style={{ marginLeft: '12%' }}>
                  {pokemon.stats.map((stat) => {
                    if (stat.stat.name === 'hp') return stat.base_stat
                  })}
                </strong>
              </div>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className='poke-sprite'
              />
              <div className='poke-move'>
                <p> {pokemon?.moves[randomSelection()].move?.name}</p>
                <p> {pokemon?.moves[randomSelection()].move?.name}</p>
              </div>
            </div>
          )
        }
        //////////     DRAGON    TYPE    //////////
        else if (type.type.name.includes('dragon')) {
          return (
            <div className='poke-box dragon'>
              <div className='poke-header'>
                <strong style={{ marginLeft: '15%' }}>{pokemon.name}</strong>
                <strong style={{ marginLeft: '12%' }}>
                  {pokemon.stats.map((stat) => {
                    if (stat.stat.name === 'hp') return stat.base_stat
                  })}
                </strong>
              </div>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className='poke-sprite'
              />
              <div className='poke-move'>
                <p> {pokemon?.moves[randomSelection()].move?.name}</p>
                <p> {pokemon?.moves[randomSelection()].move?.name}</p>
              </div>
            </div>
          )
        }
      })}
      <strong>Height: </strong>
      <span>{pokemon?.height}</span>
    </div>
  )
}

export default PokemonList
