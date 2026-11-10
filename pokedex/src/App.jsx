import { Routes, Route } from 'react-router-dom'
import PokemonDetails from './pages/PokemonDetails'
import Home from './pages/Home'

function App() {

  return (

    <>

      <nav className="red darken-2">
        <div className="nav-wrapper container">
        </div>
      </nav>

      <Routes>

        <Route path="/" element={<Home />} />
         <Route
          path="/pokemon/:id"
          element={<PokemonDetails />}
        />

      </Routes>

    </>

  )
}

export default App
