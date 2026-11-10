const API_URL = 'https://pokeapi.co/api/v2'

export async function getPokemons(offset = 0) {
  const response = await fetch(
    `${API_URL}/pokemon?limit=20&offset=${offset}`
  )

  if (!response.ok) {
    throw new Error('Erro ao buscar Pokémons')
  }

  return response.json()
}

export async function getPokemonDetails(id) {
  const response = await fetch(
    `${API_URL}/pokemon/${id}`
  )

  if (!response.ok) {
    throw new Error('Pokémon não encontrado')
  }

  return response.json()
}

export async function getPokemonTypes() {
  const response = await fetch(`${API_URL}/type`)

  if (!response.ok) {
    throw new Error('Erro ao buscar tipos')
  }

  return response.json()
}

export async function getPokemonByType(type) {
  const response = await fetch(`${API_URL}/type/${type}`)

  if (!response.ok) {
    throw new Error('Erro ao buscar Pokémon por tipo')
  }

  return response.json()
}