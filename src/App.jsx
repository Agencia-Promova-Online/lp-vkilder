import { useEffect, useMemo, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import logoDouradaHorizontal from './assets/logo PNG/Dourada- Horizontal.png'
import logoDouradaVertical from './assets/logo PNG/Dourada- Vertical.png'
import fotoEquipe from './assets/foto-equipe.JPEG'
import depoimento1 from './assets/depoimentos/IMG_2298.mp4'
import depoimento2 from './assets/depoimentos/IMG_2299.mp4'
import './App.css'

function useCurrencyFormatter() {
  return useMemo(() => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    })
  }, [])
}

function parseMoneyToNumber(value) {
  const digits = String(value ?? '').replace(/[^\d]/g, '')
  if (!digits) return 0
  return Number(digits)
}

function formatMoneyFromDigits(formatter, digits) {
  const n = parseMoneyToNumber(digits)
  return n ? formatter.format(n) : ''
}

function normalizePathname(pathname) {
  const p = String(pathname || '/').replace(/\/+$/, '') || '/'
  return p
}

function Icon({ name }) {
  if (name === 'shield') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l7 4v7c0 5-3 9-7 9s-7-4-7-9V6l7-4z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M9.5 12.3l1.7 1.7 3.6-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (name === 'bolt') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M13 2L3 14h8l-1 8 11-14h-8l0-6z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (name === 'bank') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 10h18M5 10V20m4-10V20m6-10V20m4-10V20M4 20h16M12 3l9 5H3l9-5z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (name === 'play') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 7l10 5-10 5V7z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (name === 'star') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9L12 2z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (name === 'arrow-up-right') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M7 17L17 7M9 7h8v8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  return null
}

function Reveal({ children, delay = 0, className }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: '-10% 0px', once: true })
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22, filter: 'blur(10px)' }}
      animate={
        reduce || !isInView ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }
      }
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

function Navbar() {
  return (
    <div className="vk-nav">
      <nav className="navbar navbar-expand-lg navbar-dark py-3">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#top">
            <img className="vk-logo" src={logoDouradaHorizontal} alt="Vkilder" />
          </a>
          <div className="d-none d-lg-flex align-items-center gap-3">
            <a className="vk-btn btn" href="#simulador">
              Fazer uma análise
            </a>
            <a className="vk-btn vk-btn-gold btn" href="#simulador">
              Conquistar meu Imóvel
            </a>
          </div>
          <div className="d-lg-none d-flex align-items-center gap-2">
            <a className="vk-btn vk-btn-gold btn btn-sm" href="#simulador">
              Conquistar meu Imóvel
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const yBg = useTransform(scrollY, [0, 900], [0, 180])
  const yGrid = useTransform(scrollY, [0, 900], [0, 110])
  const glowOpacity = useTransform(scrollY, [0, 700], [1, 0.35])
  const yBgSpring = useSpring(yBg, { stiffness: 90, damping: 24, mass: 0.4 })
  const yGridSpring = useSpring(yGrid, { stiffness: 90, damping: 26, mass: 0.4 })

  return (
    <section id="top" className="vk-hero">
      <motion.div
        className="vk-hero-bg"
        style={reduce ? undefined : { y: yBgSpring }}
        aria-hidden="true"
      />
      <motion.div
        className="vk-hero-glow"
        style={reduce ? undefined : { opacity: glowOpacity }}
        aria-hidden="true"
      />
      <motion.div
        className="vk-hero-grid"
        style={reduce ? undefined : { y: yGridSpring }}
        aria-hidden="true"
      />

      <div className="container vk-hero-inner">
        <div className="row g-4 align-items-end">
          <div className="col-lg-8">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
              className="vk-pill"
            >
              <span className="dot" />
              Realização do seu imóvel, pagando pouco
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 26, filter: 'blur(12px)' }}
              animate={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, ease: [0.2, 0.7, 0.2, 1], delay: 0.06 }}
              className="mt-4"
            >
              <div className="vk-kicker">
                <strong>VKILDER</strong> • Imóveis • Melhores Condições
              </div>
              <h1 className="vk-h1 mt-3">
               O Caminho Mais Curto Entre os Bancos e as Chaves do Seu Imóvel.
              </h1>
              <p className="vk-lead">
                Seja para a casa da sua vida ou para construir um patrimônio de renda passiva,
                a Vkilder encontra as melhores condições de crédito e parcelamento para conquistar seu imóvel.
              </p>

              <div className="vk-hero-actions">
                <a className="vk-btn vk-btn-gold btn" href="#simulador">
                  Conquistar um Imóvel
                </a>
                <a className="vk-btn btn" href="#prova-social">
                  Fazer uma Análise
                </a>
              </div>

              <motion.div
                className="vk-scroll"
                initial={reduce ? false : { opacity: 0 }}
                animate={reduce ? undefined : { opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35 }}
              >
                <span className="mouse" aria-hidden="true" />
                Role para descobrir o diferencial
              </motion.div>
            </motion.div>
          </div>
          <div className="col-lg-4 d-none d-lg-block">
            <motion.div
              className="vk-glass p-4"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              <div className="vk-kicker">
                Segurança<strong>+ Suporte</strong>
              </div>
              <div className="vk-divider" />
              <div className="mt-3">
                <div className="vk-feature">
                  <span className="bullet" />
                  Estratégia por perfil: morador ou investidor.
                </div>
                <div className="vk-feature">
                  <span className="bullet" />
                  Suporte Especializado.
                </div>
                <div className="vk-feature">
                  <span className="bullet" />
                  Transparência total de custos e prazos.
                </div>
              </div>
              <div className="mt-4 d-flex gap-2 flex-wrap">
                <span className="vk-seal">
                  <Icon name="shield" /> Compliance
                </span>
                <span className="vk-seal">
                  <Icon name="bolt" /> SLA 48h
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialProof() {
  const reduce = useReducedMotion()
  return (
    <section id="prova-social" className="vk-section vk-section-tight">
      <div className="container">
        <div className="row g-3">
          {[
            {
              icon: 'bank',
              label: 'para Imóveis',
              value: 'R$300 mil à 2 milhões',
            },
            {
              icon: 'shield',
              label: 'parcerias com grandes',
              value: 'Instituições Financeiras',
            },
            {
              icon: 'bolt',
              label: 'aprovação em tempo recorde',
              value: 'até 48h',
            },
          ].map((item, idx) => (
            <div key={item.label} className="col-md-4">
              <Reveal delay={reduce ? 0 : idx * 0.07}>
                <div className="vk-metric h-100">
                  <div className="d-flex align-items-start justify-content-between gap-3">
                    <div>
                      <div className="label">{item.label}</div>
                      <div className="value">{item.value}</div>
                    </div>
                    <div className="icon">
                      <Icon name={item.icon} />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PainVsSolution() {
  return (
    <section className="vk-section">
      <div className="container">
        <Reveal>
          <h2 className="vk-section-title">Chega de incertezas.</h2>
          <p className="vk-section-subtitle">
          Deixe nas mãos de quem já ajudou muitos a conquistarem seus objetivos.
          </p>
          <div className="vk-divider" />
        </Reveal>

        <div className="mt-4 vk-split">
          <Reveal>
            <div className="vk-card vk-bank h-100">
              <div className="tag">O lado do banco</div>
              <h3>BUROCRACIA</h3>
              <p>
                Burocracia infinita, gerentes que defendem a meta do banco e taxas ocultas que
                dobram o valor do seu imóvel.
              </p>
              <div className="mt-4">
                <div className="vk-feature">
                  <span className="bullet" style={{ background: 'rgba(255, 71, 87, 0.9)' }} />
                  Prazos imprevisíveis
                </div>
                <div className="vk-feature">
                  <span className="bullet" style={{ background: 'rgba(255, 71, 87, 0.9)' }} />
                  Informações fragmentadas
                </div>
                <div className="vk-feature">
                  <span className="bullet" style={{ background: 'rgba(255, 71, 87, 0.9)' }} />
                  Custo real camuflado
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="vk-card vk-vkilder h-100">
              <div className="tag">O lado Vkilder</div>
              <h3>TRANSPARÊNCIA</h3>
              <p>
                Assessoria jurídica completa, transparência total e uma estratégia de crédito
                desenhada para o seu perfil de investidor ou morador.
              </p>
              <div className="mt-4">
                <div className="vk-feature">
                  <span className="bullet" />
                 Parcelas planejadas
                </div>
                <div className="vk-feature">
                  <span className="bullet" />
                  Acesso a condições melhores
                </div>
                <div className="vk-feature">
                  <span className="bullet" />
                  Processo com previsibilidade
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Segmentation() {
  const cards = [
    {
      title: 'Sua Moradia',
      copy: 'O upgrade que a sua família merece. Financiamento inteligente com parcelas decrescentes e uso estratégico do FGTS.',
      image:
        'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?auto=format&fit=crop&w=1600&q=70',
    },
    {
      title: 'Renda Residencial',
      copy: 'Compre imóveis que se pagam. Alavancagem financeira para investidores que buscam segurança no mercado imobiliário.',
      image:
        'https://images.unsplash.com/photo-1729505305192-610539203144?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Alguel por Temporada (Airbnb & Booking)',
      copy: 'Crédito focado em imóveis de alta rotatividade. Aumente sua renda alugando c temporada.',
      image:
        'https://images.unsplash.com/photo-1657256031855-68029292ff34?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ]

  return (
    <section className="vk-section">
      <div className="container">
        <Reveal>
          <h2 className="vk-section-title">O que você busca?</h2>
          <p className="vk-section-subtitle">
           Trabalhamos com todos os públicos, pessoas que buscam um imóvel para morar ou para investir em aluguel.
          </p>
          <div className="vk-divider" />
        </Reveal>

        <div className="row g-3 mt-4">
          {cards.map((c, idx) => (
            <div className="col-lg-4" key={c.title}>
              <Reveal delay={idx * 0.06}>
                <motion.div
                  className="vk-image-card"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <div className="bg" style={{ backgroundImage: `url(${c.image})` }} />
                  <div className="overlay" />
                  <div className="content">
                    <h3>{c.title}</h3>
                    <p>{c.copy}</p>
                  </div>
                </motion.div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LuxuryPropertyCard({ item, delay }) {
  return (
    <Reveal delay={delay}>
      <motion.article
        className="vk-lux-card"
        whileHover={{ scale: 1.05, y: -4 }}
        transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <div className="vk-lux-bg" style={{ backgroundImage: `url(${item.image})` }} />
        <div className="vk-lux-fade" />
        <div className="vk-lux-panel">
          <div className="vk-lux-authority">
            <Icon name="star" />
          </div>
          <h3>{item.title}</h3>
          <p>{item.subtitle}</p>
          <span className="vk-lux-arrow" aria-hidden="true">
            <Icon name="arrow-up-right" />
          </span>
        </div>
      </motion.article>
    </Reveal>
  )
}

function LuxuryPropertiesSection() {
  const properties = [
    {
      title: 'CHALÉ SUÍÇO MODERNIZADO',
      subtitle:
        'Seu refúgio de montanha, com a tradição que você ama e o conforto de hoje.',
      image:
        'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'CASA RESIDENCIAL EXCLUSIVA',
      subtitle:
        'O lar ideal para a sua família crescer com segurança e privacidade.',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'APARTAMENTO DE ALTO PADRÃO',
      subtitle:
        'A praticidade da vida urbana com o luxo e a vista que você merece.',
      image:
        'https://plus.unsplash.com/premium_photo-1671196048754-03a77d051dcb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'IMÓVEL PARA TEMPORADA (AIRBNB)',
      subtitle:
        'Invista em um ativo de alta rentabilidade na região turística mais desejada.',
      image:
        'https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ]

  return (
    <section className="vk-section vk-lux-section">
      <div className="container">
        <Reveal>
          <h2 className="vk-section-title">Imóveis para Todos os Objetivos </h2>
          <p className="vk-section-subtitle">
            Idependente do Imóvel que esteja buscando, nós temos as  melhores condições de parcelamento para você.
          </p>
        </Reveal>

        <div className="vk-lux-wrap mt-4">
          <div className="vk-lux-backlight" aria-hidden="true" />
          <div className="vk-lux-grid">
            {properties.map((item, idx) => (
              <LuxuryPropertyCard key={item.title} item={item} delay={idx * 0.06} />
            ))}
          </div>
        </div>

        <div className="vk-lux-dots" aria-hidden="true">
          {properties.map((item, idx) => (
            <span key={item.title} className={idx === 2 ? 'is-active' : ''} />
          ))}
        </div>
      </div>
    </section>
  )
}

function VideoPreview({ src }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '200px 0px', once: true })

  return (
    <div ref={ref} className="vk-video-frame">
      <video className="vk-video" src={inView ? src : undefined} muted playsInline preload="metadata" />
      <div className="vk-video-overlay" aria-hidden="true" />
      <div className="vk-video-play" aria-hidden="true">
        <span>
          <Icon name="play" />
        </span>
      </div>
    </div>
  )
}

function VideoProofSection() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(null)

  const videos = [
    {
      src: depoimento2,
      name: 'Cliente sra. Rosa',
      subtitle: 'Clareza de processo e resultado na prática.',
    },
  ]

  return (
    <section className="vk-section vk-video-section">
      <div className="container">
        <Reveal>
          <h2 className="vk-section-title">Prova social em vídeo</h2>
          <p className="vk-section-subtitle">
            Sem roteiro. Sem filtro. Só a confiança de quem já garantiu o imóvel com a Vkilder.
          </p>
          <div className="vk-divider" />
        </Reveal>

        <div className="vk-video-wrap mt-4">
          <div className="vk-video-backlight" aria-hidden="true" />
          <div className="row g-3 justify-content-center">
            {videos.map((v, idx) => (
              <div key={v.name} className="col-lg-5 col-md-6">
                <Reveal delay={reduce ? 0 : idx * 0.06}>
                  <motion.button
                    type="button"
                    className="vk-video-card"
                    onClick={() => setActive(v)}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
                  >
                    <VideoPreview src={v.src} />
                    <div className="vk-video-meta">
                      <div className="vk-video-name">{v.name}</div>
                      <div className="vk-video-subtitle">{v.subtitle}</div>
                    </div>
                  </motion.button>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>

      {active ? (
        <div className="vk-video-modal" role="dialog" aria-modal="true">
          <div className="vk-video-backdrop" onClick={() => setActive(null)} />
          <motion.div
            className="vk-video-modal-card"
            initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div className="vk-pill">
                <span className="dot" />
                Depoimento em vídeo
              </div>
              <button type="button" className="vk-btn btn" onClick={() => setActive(null)}>
                Fechar
              </button>
            </div>

            <div className="vk-video-modal-player mt-3">
              <video className="vk-video-modal-video" src={active.src} controls autoPlay playsInline />
            </div>
          </motion.div>
        </div>
      ) : null}
    </section>
  )
}

function Testimonials() {
  const items =  [

    {

      name: 'Carlos A.',

      quote:

        'O que eu mais buscava era paz de espírito, e a Vkilder me deu isso. Eles não trataram meu processo como apenas mais um papel, mas como o meu sonho da casa própria. O suporte foi tão próximo que me senti seguro em cada decisão.',

    },

    {

      name: 'Mariana S.',

      quote:

        'Eu estava perdida com tanta burocracia, mas o atendimento da equipe mudou tudo. Eles explicam cada detalhe com paciência e estão sempre disponíveis. É raro encontrar uma empresa que realmente se importa com a gente.',

    },

    {

      name: 'Eduardo M.',

      quote:

        'Trabalho com aluguel por temporada e precisava de alguém que entendesse meu lado investidor, mas com pé no chão. A Vkilder foi parceira do início ao fim, cuidando de tudo para mim.',

    },

    {

      name: 'Fernanda R.',

      quote:

        'A sensação de ter alguém que resolve tudo por você é impagável. Eles pegaram na minha mão e deram todo o suporte necessário, que eu nem sabia por onde começar. Hoje meu imóvel está alugado e sou muito grata pelo carinho deles.',

    },

    {

      name: 'Guilherme P.',

      quote:

        'Fui surpreendido por um atendimento que fala a nossa língua, sem termos complicados e com muita transparência. A equipe da Vkilder vibrou junto comigo quando peguei as chaves do meu imóvel. Isso não tem preço.',

    },

    {

      name: 'Ana B.',

      quote:

        'O processo de comprar de imóveis pode ser estressante, mas com o suporte da Vkilder foi leve. O acolhimento e a dedicação da equipe fazem toda a diferença.',

    },

  ]
  return (
    <section className="vk-section">
      <div className="container">
        <Reveal>
          <h2 className="vk-section-title">Quem entende de mercado, confia na Vkilder.</h2>
          <p className="vk-section-subtitle">
            Prova real, de quem confiou na Vkilder.
          </p>
          <div className="vk-divider" />
        </Reveal>

        <div className="row g-3 mt-4">
          {items.map((t, idx) => (
            <div key={t.name} className="col-lg-4 col-md-6">
              <Reveal delay={idx * 0.04}>
                <motion.div
                  className="vk-testimonial h-100"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <div className="vk-testimonial-body">
                    <div className="vk-testimonial-quote">“{t.quote}”</div>
                    <div className="vk-testimonial-name">— {t.name}</div>
                  </div>
                </motion.div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const WEBHOOK_URL = 'https://n8n.promovaonline.com.br/webhook/leads-rd-vkilder'

function LeadForm({ onSuccess }) {
  const formatter = useCurrencyFormatter()
  const [nomeCompleto, setNomeCompleto] = useState('')
  const [celular, setCelular] = useState('')
  const [email, setEmail] = useState('')
  const [cidadeEstado, setCidadeEstado] = useState('')
  const [valorCredito, setValorCredito] = useState('')
  const [prazoAquisicao, setPrazoAquisicao] = useState('')
  const [rendaMensal, setRendaMensal] = useState('')
  const [perfilProfissional, setPerfilProfissional] = useState('')
  const [restricaoNome, setRestricaoNome] = useState('')
  const [valorEntrada, setValorEntrada] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const whatsappDigits = String(celular || '').replace(/[^\d]/g, '')
  const entradaFmt = formatMoneyFromDigits(formatter, valorEntrada)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')

    if (!nomeCompleto.trim()) return setError('Informe seu nome completo.')
    if (whatsappDigits.length < 10) return setError('Informe um celular válido com DDD.')
    if (!email.trim()) return setError('Informe seu e-mail.')
    if (!cidadeEstado.trim()) return setError('Informe sua cidade e estado.')
    if (!valorCredito) return setError('Selecione o valor de crédito que você busca.')
    if (!prazoAquisicao) return setError('Selecione o prazo para aquisição.')
    if (!rendaMensal) return setError('Selecione sua renda/faturamento mensal.')
    if (!perfilProfissional) return setError('Selecione seu perfil profissional.')
    if (!restricaoNome) return setError('Selecione se possui restrição no nome.')

    setSubmitting(true)
    try {
      const payload = {
        Nome: nomeCompleto.trim(),
        Celular: whatsappDigits,
        Email: email.trim(),
        Cidade: cidadeEstado.trim(),
        Credito: valorCredito,
        Prazo: prazoAquisicao,
        Renda: rendaMensal,
        Regime: perfilProfissional,
        Restrição: restricaoNome,
        Entrada: entradaFmt || '',
        pagina_url: window.location.href,
        pagina_path: window.location.pathname,
        pagina_hash: window.location.hash,
      }

      const body = new URLSearchParams(
        Object.entries(payload).filter(([, v]) => v !== undefined && v !== null),
      )

      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body,
      })

      if (!res.ok) throw new Error('Falha ao enviar. Tente novamente em instantes.')

      onSuccess()
    } catch (err) {
      setError(err?.message || 'Não foi possível enviar agora. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="row g-3">
      <div className="col-12">
        <label className="form-label" style={{ color: 'rgba(255,255,255,0.72)' }}>
          Nome Completo
        </label>
        <input
          className="form-control"
          placeholder="Ex: João da Silva"
          value={nomeCompleto}
          onChange={(e) => setNomeCompleto(e.target.value)}
          autoComplete="name"
        />
      </div>

      <div className="col-md-6">
        <label className="form-label" style={{ color: 'rgba(255,255,255,0.72)' }}>
          Celular (WhatsApp)
        </label>
        <input
          className="form-control"
          inputMode="tel"
          placeholder="(00) 00000-0000"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
          autoComplete="tel"
        />
      </div>

      <div className="col-md-6">
        <label className="form-label" style={{ color: 'rgba(255,255,255,0.72)' }}>
          E-mail
        </label>
        <input
          className="form-control"
          inputMode="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>

      <div className="col-md-6">
        <label className="form-label" style={{ color: 'rgba(255,255,255,0.72)' }}>
          Cidade e Estado
        </label>
        <input
          className="form-control"
          placeholder="Ex: Caxias do Sul - RS"
          value={cidadeEstado}
          onChange={(e) => setCidadeEstado(e.target.value)}
        />
      </div>

      <div className="col-md-6">
        <label className="form-label" style={{ color: 'rgba(255,255,255,0.72)' }}>
          Qual valor de crédito busca?
        </label>
        <select
          className="form-select"
          value={valorCredito}
          onChange={(e) => setValorCredito(e.target.value)}
        >
          <option value="">Selecione...</option>
          <option value="R$ 300 mil a R$ 500 mil">R$ 300 mil a R$ 500 mil</option>
          <option value="R$ 500 mil a R$ 800 mil">R$ 500 mil a R$ 800 mil</option>
          <option value="R$ 800 mil a R$ 1,2 milhão">R$ 800 mil a R$ 1,2 milhão</option>
          <option value="R$ 1,2 milhão a R$ 2 milhões">R$ 1,2 milhão a R$ 2 milhões</option>
          <option value="Acima de R$ 2 milhões">Acima de R$ 2 milhões</option>
        </select>
      </div>

      <div className="col-md-6">
        <label className="form-label" style={{ color: 'rgba(255,255,255,0.72)' }}>
          Prazo para aquisição
        </label>
        <select
          className="form-select"
          value={prazoAquisicao}
          onChange={(e) => setPrazoAquisicao(e.target.value)}
        >
          <option value="">Selecione...</option>
          <option value="Imediato">Imediato</option>
          <option value="Até 30 dias">Até 30 dias</option>
          <option value="Até 60 dias">Até 60 dias</option>
          <option value="Até 90 dias">Até 90 dias</option>
          <option value="Acima de 90 dias">Acima de 90 dias</option>
        </select>
      </div>

      <div className="col-md-6">
        <label className="form-label" style={{ color: 'rgba(255,255,255,0.72)' }}>
          Renda/Faturamento Mensal
        </label>
        <select
          className="form-select"
          value={rendaMensal}
          onChange={(e) => setRendaMensal(e.target.value)}
        >
          <option value="">Selecione...</option>
          <option value="Até R$ 5 mil">Até R$ 5 mil</option>
          <option value="R$ 5 mil a R$ 10 mil">R$ 5 mil a R$ 10 mil</option>
          <option value="R$ 10 mil a R$ 20 mil">R$ 10 mil a R$ 20 mil</option>
          <option value="R$ 20 mil a R$ 40 mil">R$ 20 mil a R$ 40 mil</option>
          <option value="Acima de R$ 40 mil">Acima de R$ 40 mil</option>
        </select>
      </div>

      <div className="col-md-6">
        <label className="form-label" style={{ color: 'rgba(255,255,255,0.72)' }}>
          Perfil Profissional
        </label>
        <select
          className="form-select"
          value={perfilProfissional}
          onChange={(e) => setPerfilProfissional(e.target.value)}
        >
          <option value="">Selecione...</option>
          <option value="CLT">CLT</option>
          <option value="Servidor público">Servidor público</option>
          <option value="PJ / Empresário">PJ / Empresário</option>
          <option value="Autônomo">Autônomo</option>
          <option value="Aposentado / Pensionista">Aposentado / Pensionista</option>
        </select>
      </div>

      <div className="col-md-6">
        <label className="form-label" style={{ color: 'rgba(255,255,255,0.72)' }}>
          Possui Restrição no Nome?
        </label>
        <select
          className="form-select"
          value={restricaoNome}
          onChange={(e) => setRestricaoNome(e.target.value)}
        >
          <option value="">Selecione...</option>
          <option value="Não">Não</option>
          <option value="Sim">Sim</option>
          <option value="Não sei">Não sei</option>
        </select>
      </div>

      <div className="col-12">
        <label className="form-label" style={{ color: 'rgba(255,255,255,0.72)' }}>
          Valor Disponível para Entrada
        </label>
        <input
          className="form-control"
          inputMode="numeric"
          placeholder="Ex: 50 mil (Opcional)"
          value={entradaFmt}
          onChange={(e) => setValorEntrada(e.target.value)}
        />
      </div>

      {error ? (
        <div className="col-12">
          <div className="vk-form-error">{error}</div>
        </div>
      ) : null}

      <div className="col-12">
        <button
          type="submit"
          className="vk-btn vk-btn-gold btn w-100"
          disabled={submitting}
        >
          {submitting ? 'Enviando…' : 'Quero um atendimento'}
        </button>
      </div>
    </form>
  )
}

function Simulator({ onSuccess }) {
  return (
    <section id="simulador" className="vk-section">
      <div className="container">
        <div className="row g-4 align-items-start">
          <div className="col-lg-5">
            <Reveal>
              <h2 className="vk-section-title"> Você está a apenas um passo de conquistar seu imóvel.</h2>
              <p className="vk-section-subtitle">
 Basta responder o formulário com atenção que dentro de algums minutos um dos nossos consultores irá entrar em contato com você.
              </p>
              <div className="vk-divider" />
            </Reveal>
          </div>

          <div className="col-lg-7">
            <Reveal delay={0.06}>
              <div className="vk-glass vk-form">
                <LeadForm onSuccess={onSuccess} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function ThankYouOverlay({ open, onClose }) {
  const message =
    'Olá! Acabei de se cadastrar no site da Vkilder e gostaria de falar com um consultor.'
  const whatsappUrl = `https://wa.me/5554997084616?text=${encodeURIComponent(message)}`

  if (!open) return null

  return (
    <div className="vk-thanks" role="dialog" aria-modal="true">
      <div className="vk-thanks-backdrop" onClick={onClose} />
      <motion.div
        className="vk-thanks-card"
        initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <div className="vk-pill">
          <span className="dot" />
          Recebido com sucesso
        </div>
        <h2 className="vk-section-title mt-3">Obrigado.</h2>
        <p className="vk-section-subtitle">
          Seu planejamento já está com a nossa equipe. Se quiser acelerar, fale agora com um
          especialista no WhatsApp.
        </p>

        <div className="vk-thanks-actions">
          <a className="vk-btn vk-btn-gold btn" href={whatsappUrl} target="_blank" rel="noreferrer">
            Ir para o WhatsApp
          </a>
          <button type="button" className="vk-btn btn" onClick={onClose}>
            Voltar ao site
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="vk-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-5">
            <img
              className="vk-footer-logo"
              src={logoDouradaVertical}
              alt="Logo Vkilder dourada vertical"
            />
            <div className="vk-kicker">
            </div>
            <h3 className="mt-3" style={{ margin: 0, color: 'rgba(255,255,255,0.92)', fontWeight: 760 }}>
              Especialistas em ajudar pessoas a encontrar a sua estabilidade.
            </h3>
            <p className="mt-3" style={{ color: 'rgba(255,255,255,0.62)' }}>
              A Vkilder é especialista em crédito imobiliário há mais de 10 anos, conectando milhares de brasileiros ao sonho da casa própria.<br/>
Nossa missão é democratizar o acesso ao crédito imobiliário, oferecendo soluções inteligentes, taxas justas e total transparência. <br/>Acreditamos que todos merecem ter seu próprio patrimônio.
            </p>

            <div className="mt-4 d-flex flex-wrap gap-2">
              <span className="vk-seal">
                <Icon name="shield" /> Faça uma Visita
              </span>
              <span className="vk-seal">
                <Icon name="bank" /> Atendimento Presencial              </span>
              <span className="vk-seal">
                <Icon name="bolt" /> Seg a Sex, 9h às 18h
              </span>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="vk-glass p-3">
              <div className="vk-team-card mb-3">
                <div
                  className="vk-team-photo"
                  style={{ backgroundImage: `url(${fotoEquipe})` }}
                  role="img"
                  aria-label="Foto da equipe Vkilder"
                />
                <div className="vk-team-overlay" aria-hidden="true" />
                <div className="vk-team-caption">
                  <div className="vk-kicker">
                    equipe <strong>vkilder</strong>
                  </div>
                  <div className="vk-team-title">Uma equipe de sucesso, pronta para te atender.</div>
                </div>
              </div>
              <iframe
                className="vk-map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3189.008508006944!2d-51.1755599!3d-29.168589899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951ebd9e8105262f%3A0x12f47aa2290903e!2sCentro%20Profissional%20Sinimb%C3%BA!5e1!3m2!1spt-BR!2sbr!4v1776449155058!5m2!1spt-BR!2sbr"
                title="Mapa"
              />
            </div>
            <div className="mt-3 d-flex flex-wrap gap-2 justify-content-end">
              <span className="vk-seal">CNPJ: 44.684.922/0001-30</span>
            </div>
          </div>
        </div>

        <div className="mt-5" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
          © {new Date().getFullYear()} Vkilder. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}

function App() {
  const [thanksOpen, setThanksOpen] = useState(false)

  useEffect(() => {
    const onHashChange = () => setThanksOpen(normalizePathname(window.location.hash) === '#obrigado')
    onHashChange()
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (!thanksOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [thanksOpen])

  function openThanks() {
    window.location.hash = 'obrigado'
  }

  function closeThanks() {
    window.location.hash = 'simulador'
  }

  return (
    <div className="vk-app">
      <Navbar />
      <Hero />
      <SocialProof />
      <PainVsSolution />
      <Segmentation />
      <LuxuryPropertiesSection />
      <VideoProofSection />
      <Testimonials />
      <Simulator onSuccess={openThanks} />
      <Footer />
      <ThankYouOverlay open={thanksOpen} onClose={closeThanks} />
    </div>
  )
}

export default App
