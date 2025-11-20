import Hero from './components/Hero'
import RegimeDashboard from './components/RegimeDashboard'
import BacktestTimeMachine from './components/BacktestTimeMachine'
import StressTester from './components/StressTester'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Hero />
      <RegimeDashboard />
      <BacktestTimeMachine />
      <StressTester />
      <footer className="py-10 text-center text-slate-500">© {new Date().getFullYear()} RegimeEye — Tactical Allocation Terminal</footer>
    </div>
  )
}

export default App
