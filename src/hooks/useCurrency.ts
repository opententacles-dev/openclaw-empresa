'use client'
import { useState, useEffect } from 'react'

export type CurrencyConfig = {
  symbol: string
  code: string
  perMonth: string
  prices: { start: number; pro: number; scale: number; credit: number }
}

const CURRENCIES: Record<string, CurrencyConfig> = {
  BRL: { symbol: 'R$', code: 'BRL', perMonth: '/mês', prices: { start: 49,  pro: 99,  scale: 199, credit: 5  } },
  USD: { symbol: '$',  code: 'USD', perMonth: '/mo',  prices: { start: 9,   pro: 18,  scale: 38,  credit: 1  } },
  EUR: { symbol: '€',  code: 'EUR', perMonth: '/mês', prices: { start: 8,   pro: 16,  scale: 35,  credit: 1  } },
  GBP: { symbol: '£',  code: 'GBP', perMonth: '/mo',  prices: { start: 7,   pro: 14,  scale: 30,  credit: 1  } },
}

const LOCALE_MAP: Record<string, string> = {
  'pt-BR': 'BRL', 'pt': 'BRL',
  'en-GB': 'GBP',
  'fr': 'EUR', 'de': 'EUR', 'it': 'EUR', 'es': 'EUR',
  'nl': 'EUR', 'pt-PT': 'EUR', 'fr-FR': 'EUR', 'de-DE': 'EUR',
}

export function useCurrency(): CurrencyConfig {
  const [cfg, setCfg] = useState<CurrencyConfig>(CURRENCIES.BRL)
  useEffect(() => {
    const lang = navigator.language || 'pt-BR'
    const code = LOCALE_MAP[lang] ?? LOCALE_MAP[lang.split('-')[0]] ?? 'USD'
    setCfg(CURRENCIES[code] ?? CURRENCIES.USD)
  }, [])
  return cfg
}
