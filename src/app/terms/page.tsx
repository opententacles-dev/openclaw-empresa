import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Termos de Uso | OpenTentacles',
  description: 'Leia os Termos de Uso da plataforma OpenTentacles.',
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4 pb-2 border-b border-[#2A2A3E]">{title}</h2>
      <div className="text-gray-400 leading-relaxed space-y-3">{children}</div>
    </div>
  )
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0F0F1A] min-h-screen pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-3">Termos de Uso</h1>
            <p className="text-sm text-gray-500">Última atualização: 28 de maio de 2026</p>
          </div>
          <p className="text-gray-400 leading-relaxed mb-10">
            Bem-vindo à OpenTentacles. Ao acessar ou usar nossa plataforma, você concorda com estes Termos de Uso. Leia-os atentamente antes de utilizar nossos serviços.
          </p>

          <Section title="1. Aceitação dos Termos">
            <p>Ao acessar e utilizar a plataforma OpenTentacles, você confirma que leu, entendeu e concorda em estar vinculado a estes Termos de Uso e à nossa Política de Privacidade. Se você não concordar com qualquer parte destes termos, não utilize nossos serviços.</p>
          </Section>

          <Section title="2. Descrição do Serviço">
            <p>A OpenTentacles é uma plataforma SaaS que permite a criação, configuração e hospedagem de agentes de inteligência artificial para canais de comunicação como WhatsApp, Telegram, Instagram e outros. Nossa plataforma oferece:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Hospedagem de instâncias OpenClaw com um clique</li>
              <li>Gerenciamento de agentes de IA sem código</li>
              <li>Integrações com canais de mensagens</li>
              <li>Painel de controle e analytics</li>
            </ul>
          </Section>

          <Section title="3. Cadastro e Lista de Espera">
            <p>Para acessar nossos serviços, você pode se inscrever na lista de espera fornecendo seu endereço de e-mail. Ao se inscrever, você:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Declara que as informações fornecidas são verdadeiras e precisas</li>
              <li>Autoriza o recebimento de comunicações relacionadas ao lançamento da plataforma</li>
              <li>Concorda com nossa Política de Privacidade</li>
            </ul>
            <p>Ao criar uma conta, você é responsável por manter a confidencialidade de suas credenciais e por todas as atividades realizadas em sua conta.</p>
          </Section>

          <Section title="4. Uso Aceitável">
            <p>Você concorda em usar a plataforma apenas para fins legítimos e de acordo com todas as leis aplicáveis. Usos permitidos incluem automação de atendimento ao cliente, criação de assistentes virtuais para negócios e integração com fluxos de trabalho legítimos.</p>
          </Section>

          <Section title="5. Uso Proibido">
            <p>É expressamente proibido utilizar a plataforma para:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Envio de spam ou comunicações não solicitadas em massa</li>
              <li>Atividades fraudulentas, enganosas ou ilegais</li>
              <li>Violação de direitos de privacidade de terceiros</li>
              <li>Disseminação de malware ou código malicioso</li>
              <li>Violação das políticas dos canais integrados (WhatsApp, Telegram, etc.)</li>
            </ul>
            <p>A OpenTentacles reserva-se o direito de suspender contas que violem estas diretrizes sem aviso prévio.</p>
          </Section>

          <Section title="6. Propriedade Intelectual">
            <p>Todo o conteúdo da plataforma — software, design, textos, logotipos e marcas — é propriedade da OpenTentacles ou de seus licenciadores. Você retém a propriedade do conteúdo que criar usando nossa plataforma e nos concede uma licença limitada para processá-lo exclusivamente na prestação dos serviços contratados.</p>
          </Section>

          <Section title="7. Planos e Pagamentos">
            <p>A OpenTentacles oferece planos de assinatura com diferentes funcionalidades. Os preços e condições estão disponíveis na página de preços. Os valores cobrados referem-se ao período contratado e não são reembolsáveis, exceto nos casos previstos em lei.</p>
          </Section>

          <Section title="8. Limitação de Responsabilidade">
            <p>A plataforma é fornecida "no estado em que se encontra". A OpenTentacles não se responsabiliza por perdas de dados, interrupções de serviço, danos indiretos ou pelo conteúdo gerado pelos agentes de IA configurados pelos usuários.</p>
          </Section>

          <Section title="9. Modificações nos Termos">
            <p>Reservamo-nos o direito de modificar estes Termos a qualquer momento. Quando fizermos alterações significativas, notificaremos os usuários por e-mail ou por aviso na plataforma. O uso continuado após as alterações constitui aceitação dos novos termos.</p>
          </Section>

          <Section title="10. Lei Aplicável">
            <p>Estes Termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida no foro da comarca de São Paulo, SP.</p>
          </Section>

          <Section title="11. Contato">
            <p>Para dúvidas sobre estes Termos de Uso:</p>
            <p>
              E-mail:{' '}
              <a href="mailto:contato@opententacles.com" className="text-[#E63946] hover:underline">
                contato@opententacles.com
              </a>
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  )
}