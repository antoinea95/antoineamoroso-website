import { Hero } from "./components/layout/Hero/Hero"
import { NavBar } from "./components/nav/NavBar"

function App() {

  return (
      <main className="font-degular px-10 py-4 text-sm sm:text-base h-screen max-h-dvh">
        <header>
          <NavBar />
        </header>
        <Hero />
      </main>
     
  )
}

export default App
