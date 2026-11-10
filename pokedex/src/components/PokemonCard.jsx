import { Link } from 'react-router-dom'

function PokemonCard({ pokemon }) {

  return (
    <div className="col s12 m6 l3">

      <div className="card hoverable">

        <div className="card-image center-align">
          <img
            src={
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
            style={{
              height: '160px',
              objectFit: 'contain'
            }}
          />
        </div>

        <div className="card-content center-align">

          <span className="card-title">
            {pokemon.name.toUpperCase()}
          </span>

          <p>Número: #{pokemon.id}</p>

          <p>
            Tipo: {pokemon.types
              .map(item => item.type.name)
              .join(', ')}
          </p>

        </div>

        <div className="card-action center-align">

          <Link
            to={`/pokemon/${pokemon.id}`}
            className="btn red darken-2"
          >
            Ver detalhes
          </Link>

        </div>

      </div>
    </div>
  )
}

export default PokemonCard
