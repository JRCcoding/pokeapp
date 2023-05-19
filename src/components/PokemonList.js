import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PokemonList = () => {
  const [allPokemon, setAllPokemon] = useState()
  const [pokemon, setPokemon] = useState()
  const [pokemonURL, setPokemonURL] = useState(
    'https://pokeapi.co/api/v2/pokemon/1'
  )

  const fetchAllPokemon = async () => {
    try {
      const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=10000'
      )
      setAllPokemon(response.data.results)
    } catch (error) {
      console.error(`Error fetching Pokemanz: ${error}`)
    }
  }
  useEffect(() => {
    fetchAllPokemon()
  }, [])

  const fetchPokemon = async () => {
    try {
      const response = await axios.get(pokemonURL)
      setPokemon(response.data)
    } catch (error) {
      console.error(`Error fetching single Pokeman: ${error}`)
    }
  }
  useEffect(() => {
    fetchPokemon()
  }, [pokemonURL])
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        <h3>Pokémon List</h3>
        {allPokemon &&
          allPokemon.map((pokemon) => (
            <div key={pokemon.name}>
              <ul>
                <li onClick={() => setPokemonURL(pokemon.url)}>
                  {pokemon.name}
                </li>
              </ul>
            </div>
          ))}
      </div>
      <div style={{ position: 'fixed', right: '0' }}>
        <h4>Selected Pokémon: </h4>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <br />
        &nbsp;&nbsp;
        <strong>{pokemon?.name.toUpperCase()}</strong>
        <h6>Weight:</h6>
        &nbsp;&nbsp;{pokemon?.weight}
        <h6>Types:</h6>
        {pokemon?.types.map((type) => (
          <ul key={type.slot} style={{ listStyle: 'none' }}>
            <li>{type.type.name.toUpperCase()}</li>
          </ul>
        ))}
        <hr />
      </div>
    </div>
  )
}

export default PokemonList
