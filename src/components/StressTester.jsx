import { useMemo, useState } from 'react'

export default function StressTester() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [tenY, setTenY] = useState(5.0)
  const [oil, setOil] = useState(85)
  const [infl, setInfl] = useState(3.5)
  const [result, setResult] = useState(null)

  const submit = async () => {
    const assumptions = { us10y: parseFloat(tenY), oil: parseFloat(oil), inflation: parseFloat(infl) }
    const r = await fetch(`${baseUrl}/api/stress-test`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Quick Stress', assumptions }) })
    setResult(await r.json())
  }

  return (
    <section id="stress" className="relative py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-2xl bg-slate-900/70 border border-slate-700 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="text-slate-300 uppercase text-xs tracking-wider">What-if Stress Tester</div>
            <div className="text-white text-2xl font-semibold">Inject a scenario</div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 text-sm mb-2">US 10y Yield (%)</label>
                <input className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-white" type="number" step="0.1" value={tenY} onChange={e=>setTenY(e.target.value)} />
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-2">Oil ($/bbl)</label>
                <input className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-white" type="number" step="1" value={oil} onChange={e=>setOil(e.target.value)} />
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-2">Inflation (%)</label>
                <input className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-white" type="number" step="0.1" value={infl} onChange={e=>setInfl(e.target.value)} />
              </div>
            </div>
            <button onClick={submit} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 font-semibold">Run Stress Test</button>
          </div>
          <div className="lg:col-span-1 rounded-xl bg-slate-800/60 border border-slate-700 p-4">
            <div className="text-slate-300 uppercase text-xs tracking-wider">Result</div>
            {result ? (
              <div className="mt-3 space-y-2">
                <div className="text-white font-semibold">Conviction: {result.conviction}%</div>
                <div className="text-slate-300 text-sm">Suggested weights:</div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {Object.entries(result.weights).map(([k,v]) => (
                    <div key={k} className="flex items-center justify-between bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2">
                      <span className="text-white font-semibold">{k}</span>
                      <span className="text-slate-300">{Math.round(v*100)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-3 text-slate-400 text-sm">Enter assumptions and run a stress test.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
