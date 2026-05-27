'use client'
import { motion } from 'framer-motion'

const TENTACLES = [
  { d: 'M 63 172 C 20 215 5 258 22 285 Q 16 300 30 298', delay: 0.0, dir: -1, sw: 10 },
  { d: 'M 87 193 C 52 228 42 268 58 292 Q 52 308 66 305', delay: 0.2, dir: 1,  sw: 11 },
  { d: 'M 112 202 C 84 236 80 276 98 297 Q 93 312 106 310', delay: 0.4, dir: -1, sw: 12 },
  { d: 'M 136 205 C 118 242 116 280 134 300 Q 130 316 142 314', delay: 0.6, dir: 1,  sw: 13 },
  { d: 'M 164 205 C 182 242 184 280 166 300 Q 170 316 158 314', delay: 0.5, dir: -1, sw: 13 },
  { d: 'M 188 202 C 216 236 220 276 202 297 Q 207 312 194 310', delay: 0.3, dir: 1,  sw: 12 },
  { d: 'M 213 193 C 248 228 258 268 242 292 Q 248 308 234 305', delay: 0.1, dir: -1, sw: 11 },
  { d: 'M 237 172 C 280 215 295 258 278 285 Q 284 300 270 298', delay: 0.7, dir: 1,  sw: 10 },
]

export function OctopusMascot({ className }: { className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -16, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg
        viewBox="0 0 300 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <defs>
          <radialGradient id="bodyGrad" cx="38%" cy="28%" r="65%">
            <stop offset="0%" stopColor="#FF6B75" />
            <stop offset="55%" stopColor="#E63946" />
            <stop offset="100%" stopColor="#C02030" />
          </radialGradient>
          <filter id="bodyglow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#E63946" floodOpacity="0.35" />
          </filter>
        </defs>

        {TENTACLES.map((t, i) => (
          <motion.path
            key={i}
            d={t.d}
            stroke="#C42030"
            strokeWidth={t.sw}
            strokeLinecap="round"
            fill="none"
            style={{ transformBox: 'fill-box', transformOrigin: '50% 0%' }}
            animate={{ rotate: [0, t.dir * 5, 0] }}
            transition={{
              duration: 2.5 + t.delay * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: t.delay,
            }}
          />
        ))}

        <ellipse cx="150" cy="115" rx="90" ry="84" fill="url(#bodyGrad)" filter="url(#bodyglow)" />

        <ellipse cx="118" cy="78" rx="30" ry="22" fill="white" opacity="0.14" transform="rotate(-20 118 78)" />

        <circle cx="118" cy="107" r="20" fill="white" />
        <circle cx="182" cy="107" r="20" fill="white" />

        <circle cx="122" cy="109" r="12" fill="#0F0F1A" />
        <circle cx="186" cy="109" r="12" fill="#0F0F1A" />

        <circle cx="126" cy="104" r="5" fill="white" />
        <circle cx="190" cy="104" r="5" fill="white" />
        <circle cx="118" cy="113" r="2.5" fill="white" opacity="0.5" />
        <circle cx="182" cy="113" r="2.5" fill="white" opacity="0.5" />

        <path
          d="M 114 132 Q 150 152 186 132"
          stroke="white"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        <ellipse cx="94" cy="122" rx="14" ry="8" fill="#FF9BA2" opacity="0.45" />
        <ellipse cx="206" cy="122" rx="14" ry="8" fill="#FF9BA2" opacity="0.45" />
      </svg>
    </motion.div>
  )
}