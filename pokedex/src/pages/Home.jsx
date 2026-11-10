import { useEffect, useState } from 'react'

import {
  getPokemons,
  getPokemonDetails,
  getPokemonTypes,
  getPokemonByType
} from '../services/api'

import PokemonCard from '../components/PokemonCard'

function Home() {

  const [pokemons, setPokemons] = useState([])
  const [types, setTypes] = useState([])

  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(true)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const limit = 20

  // Buscar tipos disponíveis
  useEffect(() => {

    async function loadTypes() {

      try {
        const data = await getPokemonTypes()
        setTypes(data.results)
      } catch (error) {
        console.error(error)
      }

    }

    loadTypes()

  }, [])

  // Buscar Pokémons da página atual
  useEffect(() => {

    let active = true

    async function loadPokemons() {

      try {

        setLoading(true)
        setError('')

        setPokemons([])

        const offset = (page - 1) * limit // Variáveis para armazenar resultados e verificar se há próxima página

        let results = []
        let nextPage = false

        if (selectedType) {

          // Buscar por tipo
          const data = await getPokemonByType(selectedType)

          results = data.pokemon.slice(
            offset,
            offset + limit
          ).map(item => item.pokemon)

          nextPage = offset + limit < data.pokemon.length

        } else {

          // Buscar lista geral
          const data = await getPokemons(offset)

          results = data.results

          nextPage = Boolean(data.next)

        }

        // Buscar detalhes dos 20 Pokémons
        const details = await Promise.all(

          results.map(pokemon => {

            const id = pokemon.url
              .split('/')
              .filter(Boolean)
              .pop()

            return getPokemonDetails(id)

          })

        )

        if (!active) return

        setPokemons(details)
        setHasNext(nextPage)

      } catch (error) {

        if (!active) return

        console.error(error)
        setError('Não foi possível carregar os Pokémons.')

      } finally {

        if (active) {
          setLoading(false)
        }

      }

    }

    loadPokemons()

    return () => {
      active = false
    }

  }, [page, selectedType])

  // Busca por nome na página atual
  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  )

  // Alterar filtro de tipo
  function handleTypeChange(event) {

    setSelectedType(event.target.value)
    setPage(1) // A listagem começa na primeira página ao alterar o filtro, de maneira que os pokemons não sejam ignorados

  }

  // Próxima página
  function nextPage() {

    if (hasNext && !loading) {
      setPage(previous => previous + 1)
    }

  }

  // Página anterior
  function previousPage() {

    if (page > 1 && !loading) {
      setPage(previous => previous - 1)
    }

  }

  return (

    <div className="container">

      <h3 className="center-align">
        Pokédex
      </h3>

      {/* Aqui começa a busca por nome */}
      <div className="input-field">

        <input
          type="text"
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="Digite o nome do Pokémon..."
        />

        <label className="active">
          Buscar Pokémon
        </label>

      </div>

    {/* Aqui começa a busca por tipo */}
      <div className="input-field">

        <select
          className="browser-default"
          value={selectedType}
          onChange={handleTypeChange}
        >

          <option value="">
            Todos os tipos
          </option>

          {types
            .filter(type =>
              !['unknown', 'shadow'].includes(type.name)
            )
            .map(type => (

              <option
                key={type.name}
                value={type.name}
              >
                {type.name.toUpperCase()}
              </option>

            ))}

        </select>

      </div>

      {/* Carregamento */}
      {loading && (

        <div className="center-align">

          <div className="progress">
            <div className="indeterminate red"></div>
          </div>

          <p>Carregando Pokémons...</p>

        </div>

      )}

      {/* Erro */}
      {error && (

        <div className="card-panel red lighten-4">
          {error}
        </div>

      )}

      {/* Lista de Pokémons */}
      <div className="row">

        {filteredPokemons.map(pokemon => (

          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
          />

        ))}

      </div>

      {/* Nenhum resultado */}
      {!loading && filteredPokemons.length === 0 && !error && (

        <div className="center-align">

          <h5>Nenhum Pokémon encontrado!</h5>

        </div>

      )}


      {!loading && !error && (

        <div className="center-align">

          <button
            className="btn grey darken-1"
            onClick={previousPage}
            disabled={page === 1}
            style={{ marginRight: '10px' }}
          >
            <i className="material-icons left">
            </i>
            Anterior
          </button>

          <button
            className="btn red darken-2"
            onClick={nextPage}
            disabled={!hasNext}
          >
            Próxima
            <i className="material-icons right">
              chevron_right
            </i>
          </button>

        </div>

      )}

      <br />

    </div>

  )

}

export default Home
