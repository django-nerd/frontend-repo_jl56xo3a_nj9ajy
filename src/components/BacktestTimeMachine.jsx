import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

function Line({ points, color }) {
  const path = useMemo(() => {
    if (!points?.length) return ''
    const maxY = Math.max(...points.map(p => p.value))
    const minY = Math.min(...points.map(p => p.value))
    const range = Math.max(1, maxY - minY)
    const w = 700, h = 220
    const step = w / (points.length - 1)
    return points.map((p, i) => {
      const x = i * step
      const y = h - ((p.value - minY) / range) * h
      return `${i === 0 ? 'M' : 'L'} ${x},${y}`
    }).join(' ')
  }, [points])
  return <path d={path} fill="none" stroke={color} strokeWidth="2" />
}

export default function BacktestTimeMachine() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [curve, setCurve] = useState([])
  const [idx, setIdx] = useState(120)

  useEffect(() => {
    fetch(`${baseUrl}/api/backtest`).then(r => r.json()).then(d => {
      setCurve(d.equity_curve)
    })
  }, [])

  const sliced = useMemo(() => curve.slice(0, Math.max(1, Math.min(curve.length, idx))), [curve, idx])
  const taa = useMemo(() => sliced.map((p,i) => ({ i, value: p.taa })), [sliced])
  const saa = useMemo(() => sliced.map((p,i) => ({ i, value: p.saa })), [sliced])
  const sixty = useMemo(() => sliced.map((p,i) => ({ i, value: p.sixty_forty })), [sliced])

  return (
    <section id="backtest" className="relative py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-2xl bg-slate-900/70 border border-slate-700 p-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-slate-300 uppercase text-xs tracking-wider">Time Machine</div>
              <div className="text-white text-2xl font-semibold">Backtest Replay</div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1"><span className="w-2 h-2 bg-sky-400 rounded-full" /> <span className="text-slate-300">TAA</span></div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-400 rounded-full" /> <span className="text-slate-300">SAA</span></div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-400 rounded-full" /> <span className="text-slate-300">60/40</span></div>
            </div>
          </div>
          <div className="mt-6 overflow-x-auto">
            <svg viewBox="0 0 700 220" className="w-full min-w-[700px] h-[220px]">
              <Line points={taa} color="#38bdf8" />
              <Line points={saa} color="#34d399" />
              <Line points={sixty} color="#fbbf24" />
            </svg>
          </div>
          <div className="mt-6">
            <input type="range" min={1} max={curve.length || 1} value={idx} onChange={e => setIdx(parseInt(e.target.value))} className="w-full" />
            <div className="mt-2 text-slate-400 text-sm">{sliced[sliced.length-1]?.date || ''}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
