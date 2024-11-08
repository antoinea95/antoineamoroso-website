import { About } from "./components/layout/About/About";
import { Hero } from "./components/layout/Hero/Hero";


function App() {

  return (
      <main className="font-degular text-sm sm:text-base">
        <Hero />
        <About />
        <div className="h-dvh"></div>
      </main>
  );
}

export default App;
