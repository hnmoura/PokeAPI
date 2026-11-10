import { useEffect, useState } from 'react'

import { useParams, Link } from 'react-router-dom'

import { getPokemonDetails } from '../services/api'

function Details() {

  const { id } = useParams()

  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {

    async function loadDetails() {

      try {

        setLoading(true)
        setError('')

        const data = await getPokemonDetails(id)

        setPokemon(data)

      } catch {

        setError('Não foi possível carregar os detalhes.')

      } finally {

        setLoading(false)

      }

    }

    loadDetails()

  }, [id])

  if (loading) {
    return (
      <div className="container center-align">
        <h5>Carregando detalhes...</h5>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container center-align">
        <p>{error}</p>
        <Link to="/" className="btn red">
          Voltar
        </Link>
      </div>
    )
  }

  if (!pokemon) return null

  return (

    <div className="container">

      <div className="center-align">

        <h3>{pokemon.name.toUpperCase()}</h3>

        <h5>{pokemon.id}</h5>

        <img
          src={
            pokemon.sprites.other?.['official-artwork']
              ?.front_default || pokemon.sprites.front_default
          }
          alt={pokemon.name}
          style={{ width: '250px' }} //Serve para padronizar o tamanho da imagem, porque os pokemons têm tamanhos diferentes
        />

      </div>

      <div className="card-panel">

        <h5>Informações gerais</h5>

        <p>
          <strong>Altura:</strong> {pokemon.height / 10} m
        </p>

        <p>
          <strong>Peso:</strong> {pokemon.weight / 10} kg
        </p>

        <p>
          <strong>Experiência base:</strong> {pokemon.base_experience ?? 'Não disponível'}
        </p>

      </div>

      <div className="card-panel">

        <h5>Tipos</h5>

        {pokemon.types.map(item => (
          <span
            key={item.type.name}
            className="new badge red"
            data-badge-caption=""
          >
            {item.type.name}
          </span>
        ))}

      </div>

      <div className="card-panel">

        <h5>Habilidades</h5>

        {pokemon.abilities.map(item => (
          <p key={item.ability.name}>
            {item.ability.name}
          </p>
        ))}

      </div>

      <div className="center-align">

        <Link to="/" className="btn red darken-2">
          Voltar
        </Link>

      </div>

      <br />

    </div>

  )
}

export default Details