import { useMemo } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  const title = useMemo(() => 'RegimeEye', [])
  const subtitle = 'A tactical asset allocation terminal built for CIOs'

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      <div className="absolute inset-0 opacity-90">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-950/70 to-slate-950 pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_8px_40px_rgba(59,130,246,0.35)]"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-slate-200"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <a href="#dashboard" className="inline-flex items-center gap-2 rounded-xl bg-blue-500/90 hover:bg-blue-500 text-white px-5 py-3 text-base font-semibold shadow-lg shadow-blue-500/25 transition">
            Launch Live Dashboard
          </a>
          <a href="#backtest" className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white px-5 py-3 text-base font-semibold backdrop-blur">Time Machine</a>
        </motion.div>
      </div>
    </section>
  )
}
