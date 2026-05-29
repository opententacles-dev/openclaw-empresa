import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Política de Privacidade | OpenTentacles',
  description: 'Saiba como a OpenTentacles coleta, usa e protege seus dados pessoais.',
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4 pb-2 border-b border-[#2A2A3E]">{title}</h2>
      <div className="text-gray-400 leading-relaxed space-y-3">{children}</div>
    </div>
  )
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0F0F1A] min-h-screen pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-3">Política de Privacidade</h1>
            <p className="text-sm text-gray-500">Última atualização: 28 de maio de 2026</p>
          </div>
          <p className="text-gray-400 leading-relaxed mb-10">
            A OpenTentacles respeita a sua privacidade e está comprometida com a proteção dos seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018) e demais legislações aplicáveis.
          </p>

          <Section title="1. Dados que Coletamos">
            <p>Coletamos apenas os dados necessários para a prestação dos nossos serviços:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong className="text-white">E-mail:</strong> fornecido voluntariamente ao se inscrever na lista de espera ou criar uma conta</li>
              <li><strong className="text-white">Endereço IP:</strong> coletado automaticamente no momento da inscrição para fins de segurança e prevenção de fraudes</li>
              <li><strong className="text-white">Dados de uso:</strong> informações sobre como você interage com a plataforma (páginas visitadas, funcionalidades utilizadas)</li>
              <li><strong className="text-white">Dados de pagamento:</strong> processados diretamente por provedores certificados — não armazenamos dados de cartão de crédito</li>
            </ul>
          </Section>

          <Section title="2. Como Usamos Seus Dados">
            <p>Utilizamos seus dados pessoais para:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Enviar comunicações sobre o lançamento e atualizações da plataforma</li>
              <li>Gerenciar sua conta e acesso aos serviços</li>
              <li>Melhorar a experiência do usuário e as funcionalidades da plataforma</li>
              <li>Cumprir obrigações legais e regulatórias</li>
              <li>Prevenir fraudes e garantir a segurança da plataforma</li>
            </ul>
            <p>Não utilizamos seus dados para fins diferentes dos declarados sem o seu consentimento explícito.</p>
          </Section>

          <Section title="3. Compartilhamento de Dados">
            <p>Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins comerciais. Podemos compartilhar dados apenas nas seguintes situações:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong className="text-white">Prestadores de serviço:</strong> provedores de e-mail transacional (Resend), infraestrutura de nuvem e processamento de pagamentos — apenas o necessário para a prestação do serviço</li>
              <li><strong className="text-white">Obrigação legal:</strong> quando exigido por lei, regulação ou ordem judicial</li>
            </ul>
          </Section>

          <Section title="4. Cookies e Tecnologias Similares">
            <p>Utilizamos cookies estritamente necessários para o funcionamento da plataforma, como autenticação e preferências de sessão. Podemos utilizar ferramentas de analytics para medir o desempenho do site. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades.</p>
          </Section>

          <Section title="5. Segurança dos Dados">
            <p>Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda ou destruição, incluindo:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Comunicações criptografadas via HTTPS/TLS</li>
              <li>Acesso restrito aos dados por pessoal autorizado</li>
              <li>Armazenamento seguro em servidores protegidos</li>
            </ul>
          </Section>

          <Section title="6. Seus Direitos (LGPD)">
            <p>Nos termos da LGPD, você tem o direito de:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Confirmar a existência de tratamento dos seus dados</li>
              <li>Acessar os dados que temos sobre você</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação dos seus dados</li>
              <li>Revogar o consentimento a qualquer momento</li>
              <li>Se opor ao tratamento com base em legítimo interesse</li>
            </ul>
            <p>Para exercer seus direitos, entre em contato pelo e-mail abaixo. Responderemos em até 15 dias úteis.</p>
          </Section>

          <Section title="7. Retenção de Dados">
            <p>Mantemos seus dados apenas pelo tempo necessário para a finalidade declarada ou conforme exigido por lei. Dados da lista de espera são mantidos até que você solicite a remoção ou por até 2 anos após o cadastro, o que ocorrer primeiro.</p>
          </Section>

          <Section title="8. Menores de Idade">
            <p>Nossos serviços são destinados a pessoas com 18 anos ou mais. Não coletamos intencionalmente dados de menores de 18 anos. Se tomarmos conhecimento de que um menor nos forneceu dados pessoais, os eliminaremos imediatamente.</p>
          </Section>

          <Section title="9. Alterações nesta Política">
            <p>Podemos atualizar esta Política periodicamente. Quando houver mudanças significativas, notificaremos você por e-mail ou por aviso na plataforma. Recomendamos que revise esta Política regularmente.</p>
          </Section>

          <Section title="10. Contato e Encarregado (DPO)">
            <p>Para exercer seus direitos, tirar dúvidas ou apresentar reclamações relacionadas à privacidade:</p>
            <p>
              E-mail:{' '}
              <a href="mailto:contato@opententacles.com" className="text-[#E63946] hover:underline">
                contato@opententacles.com
              </a>
            </p>
            <p>Você também pode registrar uma reclamação junto à Autoridade Nacional de Proteção de Dados (ANPD) em <span className="text-gray-300">gov.br/anpd</span>.</p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  )
}