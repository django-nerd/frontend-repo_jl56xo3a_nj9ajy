import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const Gauge = ({ value }) => {
  const pct = Math.max(0, Math.min(100, value))
  const angle = (-90 + (pct / 100) * 180)
  return (
    <div className="relative w-64 h-32">
      <svg viewBox="0 0 100 50" className="w-full h-full">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        <path d="M5 45 A 45 45 0 0 1 95 45" fill="none" stroke="url(#grad)" strokeWidth="10" strokeLinecap="round" />
        <line x1="50" y1="45" x2={50 + 40 * Math.cos((Math.PI/180)*angle)} y2={45 + 40 * Math.sin((Math.PI/180)*angle)} stroke="#e5e7eb" strokeWidth="3" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
        <div className="text-xs uppercase text-slate-400">Conviction</div>
        <div className="text-2xl font-bold text-white">{pct}%</div>
      </div>
    </div>
  )
}

export default function RegimeDashboard() {
  const [data, setData] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/regime-now`).then(r => r.json()).then(setData).catch(() => {})
  }, [])

  const colors = {
    SPY: '#60a5fa', IEF: '#34d399', GLD: '#fbbf24', DBC: '#f87171', SHY: '#a78bfa'
  }

  const pie = useMemo(() => {
    if (!data) return []
    return Object.entries(data.weights).map(([k, v]) => ({ key: k, value: v }))
  }, [data])

  if (!data) return (
    <section id="dashboard" className="relative py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-56 rounded-2xl bg-slate-800/60 border border-slate-700 animate-pulse" />
      </div>
    </section>
  )

  const topRegime = Object.entries(data.probabilities).sort((a,b)=>b[1]-a[1])[0][0]

  return (
    <section id="dashboard" className="relative py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 rounded-2xl bg-slate-900/70 border border-slate-700 p-6">
            <div className="text-slate-300 uppercase text-xs tracking-wider">Live Regime</div>
            <div className="mt-2 text-3xl font-semibold text-white">{topRegime}</div>
            <div className="mt-4">
              <Gauge value={data.conviction} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {Object.entries(data.probabilities).map(([k,v]) => (
                <div key={k} className="flex items-center justify-between rounded-lg bg-slate-800/80 px-3 py-2">
                  <span className="text-slate-300">{k}</span>
                  <span className="text-white font-semibold">{Math.round(v*100)}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2 rounded-2xl bg-slate-900/70 border border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div className="text-slate-300 uppercase text-xs tracking-wider">What the model wants to own right now</div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {pie.map(s => (
                <div key={s.key} className="flex items-center gap-2 bg-slate-800/60 border border-slate-700 rounded-xl px-3 py-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: colors[s.key] }} />
                  <span className="text-white font-semibold">{s.key}</span>
                  <span className="text-slate-300">{Math.round(s.value*100)}%</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-slate-400 text-sm">Benchmark: 60/40</div>
          </div>
        </div>
      </div>
    </section>
  )
}
