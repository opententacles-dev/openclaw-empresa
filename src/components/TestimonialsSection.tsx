'use client'
import { motion } from 'framer-motion'
import { Star, MessageCircle } from 'lucide-react'

const FEATURED = {
  name: 'Fernanda Oliveira',
  role: 'Professora — uso pessoal no dia a dia',
  avatar: 'F',
  text: 'Uso o agente no meu WhatsApp pessoal para absolutamente tudo: ele me lembra de consultas medicas, anota recados quando estou ocupada, monta minha lista de compras por voz, avisa antes de cada compromisso e ainda me ajuda a organizar a semana. Parece que tenho uma assistente pessoal no bolso o tempo todo — sem pagar nada a mais por isso.',
}

const T = [
  { name: 'Carla Mendes', role: 'Dona de loja de roupas', text: 'Antes eu perdia vendas porque não conseguia responder rápido. Agora meu agente responde 24h e minhas vendas aumentaram 40% em 2 meses.' },
  { name: 'Rafael Souza', role: 'Dentista', text: 'Configurei em menos de 5 minutos. Meu agente agenda consultas, responde dúvidas e faz lembretes automáticos. Economizo 3 horas por dia.' },
  { name: 'Ana Lima', role: 'Empreendedora digital', text: 'Tentei o OpenClaw sozinha e desisti depois de 2 dias. Com o OpenTentacles foi questao de minutos. Agora uso em 3 canais diferentes.' },
  { name: 'Marcos Costa', role: 'Dono de restaurante', text: 'O agente responde cardapio, faz pedidos e avisa o tempo de entrega. Nunca mais perdi um cliente por demora no atendimento.' },
  { name: 'Juliana Ferreira', role: 'Consultora de RH', text: 'O suporte multilíngue (PT, EN, ES e mais) faz toda a diferenca. Quando tive dúvidas, resolvi em minutos com um atendente de verdade. Recomendo demais.' },
  { name: 'Pedro Alves', role: 'Infoprodutor', text: 'Meu agente no Telegram responde alunos, entrega materiais e faz upsell automático. O ROI foi positivo ja no primeiro mês.' },
]

export function TestimonialsSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Depoimentos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Quem usa, recomenda
          </h2>
          <div className="flex items-center justify-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
            <span className="ml-2 font-semibold text-white">5.0</span>
            <span className="text-muted-foreground text-sm ml-1">de mais de 2.000 usuários</span>
          </div>
        </motion.div>

        {/* Featured: dia a dia pessoal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="mb-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-7 md:p-10"
        >
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0 flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-xl font-bold text-primary">
                {FEATURED.avatar}
              </div>
              <div>
                <div className="font-semibold text-white text-sm">{FEATURED.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{FEATURED.role}</div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                <span className="ml-2 text-xs rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 font-medium text-primary">
                  Uso pessoal
                </span>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed">
                &ldquo;{FEATURED.text}&rdquo;
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MessageCircle className="h-3.5 w-3.5 text-green-400" />
                Usa via WhatsApp pessoal
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid: depoimentos de negocios */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {T.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, si) => <Star key={si} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}