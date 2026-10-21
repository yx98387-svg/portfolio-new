import { useEffect, useState } from 'react'
import DarkVeil from './DarkVeil'
import AnimatedContent from './AnimatedContent'
import HeroOpening from './HeroOpening'
import MediaReveal from './MediaReveal'

const webpPages = new Set([44, 49, 50, 51, 52])
const portfolioPage = (number) => `/portfolio/${number}.${webpPages.has(number) ? 'webp' : 'png'}`
const range = (start, end) => Array.from({ length: end - start + 1 }, (_, index) => portfolioPage(start + index))

const dynamicPosters = [
  ['20260112-194457.mp4', '动态海报 / 01'], ['20260203 U吧U吧-元宵节播传.mp4', 'U 吧 U 吧 · 元宵节'], ['20260210 莎布蕾-除夕播传.mp4', '莎布蕾 · 除夕'], ['20260213 莎布蕾-初五播传.mp4', '莎布蕾 · 初五'], ['251230 朴鲜鲜-2025元旦-动态海报.mp4', '朴鲜鲜 · 元旦'], ['251230 U吧-2026元旦-视频.mp4', 'U 吧 · 元旦'], ['260119 U吧-2026春节初五-动态海报.mp4', 'U 吧 · 春节初五'], ['260119 U吧-2026春节初一-动态海报.mp4', 'U 吧 · 春节初一'], ['260119 U吧-2026春节除夕-动态海报.mp4', 'U 吧 · 春节除夕'], ['260119 U吧-2026开工-动态海报.mp4', 'U 吧 · 开工'], ['260304 U吧U吧-38妇女节-播传.mp4', 'U 吧 U 吧 · 妇女节'], ['260326 U吧U吧-愚人节-播传.mp4', 'U 吧 U 吧 · 愚人节'], ['260401 然利-2026清明节-动态海报.mp4', '然利 · 清明节'], ['飞书20260120-145427.mp4', '动态海报 / 14'], ['飞书20260120-145434.mp4', '动态海报 / 15'], ['飞书20260120-145439.mp4', '动态海报 / 16'], ['飞书20260128-114209.mp4', '动态海报 / 17'], ['海螺_视频_三个灯笼陆陆续续都从_472106128672333829 (1).mp4', '海螺 · 灯笼'], ['朴鲜鲜潘纳托妮宣传 (3).mp4', '朴鲜鲜潘纳托妮 / 01'], ['朴鲜鲜潘纳托妮宣传 (4).mp4', '朴鲜鲜潘纳托妮 / 02'], ['朴鲜鲜潘纳托妮宣传 (5).mp4', '朴鲜鲜潘纳托妮 / 03'], ['然利圣诞节.mp4', '然利 · 圣诞节'], ['然利新春.mp4', '然利 · 新春'], ['山姆先森-初五海报.mp4', '山姆先森 · 初五'], ['山姆先森-初一海报.mp4', '山姆先森 · 初一'], ['山姆先森-除夕海报.mp4', '山姆先森 · 除夕'], ['山姆先森-开工海报.mp4', '山姆先森 · 开工'], ['山姆先森-元宵海报.mp4', '山姆先森 · 元宵'], ['游世家族 (1).mp4', '游世家族'],
].map(([file, title]) => ({ src: `/posters/${encodeURIComponent(file)}`, title }))

const portfolioGroups = [
  {
    id: 'project', label: '项目类', note: 'CAMPAIGN & DIGITAL', projects: [
      {
        id: 'puxian-panettone', number: '05', title: '朴鲜鲜潘娜托妮宣传视频', en: 'PUXIAN PANETTONE / CAMPAIGN',
        pages: range(43, 45), cover: '/portfolio/43.png',
        videos: [{ src: '/portfolio/puxian-panettone-web.mp4', label: '朴鲜鲜潘娜托妮播传' }],
      },
      { id: 'liurun-migration', number: '06', title: '刘润动物大迁徙倒计时', en: 'LIURUN / ANIMAL MIGRATION', pages: range(46, 49), cover: '/portfolio/46.png' },
      { id: 'ai-detail', number: '07', title: 'AI 详情页设计', en: 'AI COMMERCE / DETAIL PAGE', pages: range(50, 52), cover: '/portfolio/50.png' },
      {
        id: 'other-ad-films', number: '08', title: '其他广告视频', en: 'AI COMMERCIAL FILMS', pages: [], cover: '/portfolio/sam-invitation-cover.png',
        videos: [
          { src: '/portfolio/ad-videos/冰泉豆花ai广告-cf.mp4', label: '冰泉豆花 AI 广告' },
          { src: '/portfolio/ad-videos/丹夫IP播传.mp4', label: '丹夫 IP 播传' },
          { src: '/portfolio/ad-videos/山姆邀请函广告.mp4', label: '山姆邀请函广告' },
        ],
      },
    ],
  },
  {
    id: 'poster', label: '海报类', note: 'MOTION POSTER', projects: [
      { id: 'motion-poster-gallery', number: '09', title: '动态海报画廊', en: 'MOTION POSTER GALLERY', gallery: true, cover: '/portfolio/motion-poster-cover.png', coverImage: true, pages: [] },
    ],
  },
  {
    id: 'ip', label: 'IP类', note: 'CHARACTER & EVENT', projects: [
      { id: 'yueshihu', number: '02', title: '悦食虎 IP 设计', en: 'YUESHIHU / CHARACTER SYSTEM', pages: range(15, 24), cover: '/portfolio/15.png' },
      { id: 'supply-station', number: '03', title: '松弛补给站活动设计', en: 'RELAXED SUPPLY STATION / EVENT', pages: range(26, 31), cover: '/portfolio/26.png' },
      { id: 'xiaosong', number: '04', title: '小颂 IP 设计', en: 'XIAOSONG / CHARACTER DESIGN', pages: range(32, 41), cover: '/portfolio/32.png' },
    ],
  },
  {
    id: 'brand', label: '品牌类', note: 'BRAND IDENTITY', projects: [
      { id: 'fruit-order', number: '01', title: '果序香水品牌设计', en: 'FRUIT ORDER / BRAND IDENTITY', pages: ['/portfolio/fruit-order-cover.png', ...range(5, 14)], cover: '/portfolio/fruit-order-cover.png' },
    ],
  },
]

const allProjects = portfolioGroups.flatMap((group) => group.projects.map((project) => ({ ...project, category: group.label })))

function PortfolioArchive({ onOpen }) {
  return (
    <section className="archive" id="portfolio" aria-labelledby="portfolio-title">
      <AnimatedContent as="header" className="archive-intro shell kinetic-heading" stagger={0.12} distance={118} duration={1.16} blur={0} threshold={0.26}>
        <p className="archive-number">02.</p>
        <h2 id="portfolio-title" aria-label="Portfolio archive — 目录作品索引">目录<span> / </span>作品索引</h2>
        <p>选择一个项目，查看从概念到成品的完整叙事。</p>
      </AnimatedContent>

      <AnimatedContent className="category-index shell" role="group" aria-label="作品分类目录" stagger={0.1} distance={42} blur={6}>
        {portfolioGroups.map((group, index) => {
          const cover = group.projects[0]
          return <a className="category-index-card category-folder" href={`#${cover.id}`} key={group.id} aria-label={`前往${group.label}的第一个项目`}>
            <span className="category-folder-order">{String(index + 1).padStart(2, '0')}.</span>
            <div className="category-folder-stage">
              <span className="category-folder-tab" aria-hidden="true" />
              <div className="category-folder-documents" aria-hidden="true">
                <img className="category-folder-document category-folder-document-back" src={cover.cover} alt="" />
                <img className="category-folder-document category-folder-document-middle" src={cover.cover} alt="" />
                <img className="category-folder-document category-folder-document-front" src={cover.cover} alt="" />
              </div>
              <div className="category-folder-pocket">
                <div>
                  <h3>{group.label}</h3>
                  <p>{group.note}</p>
                </div>
                <span className="category-folder-open" aria-hidden="true">↗</span>
              </div>
            </div>
            <span className="category-folder-count">{group.projects.length} 个项目</span>
          </a>
        })}
      </AnimatedContent>

      <AnimatedContent className="project-listing shell" id="projects" aria-label="全部项目" stagger={0.08} distance={58} blur={7}>
        {allProjects.map((project) => (
          <article className="project-listing-row" id={project.id} key={project.id}>
            <MediaReveal as="a" className="project-listing-media media-reveal" href={`#${project.id}`} onClick={(event) => { event.preventDefault(); onOpen(project.id) }} aria-label={`打开 ${project.title}`}>
              {(project.gallery && !project.coverImage) || project.coverVideo ? <video autoPlay muted loop playsInline preload={project.gallery ? 'auto' : 'metadata'} src={project.coverVideo ?? project.cover} aria-label="" /> : <img src={project.cover} alt="" />}
            </MediaReveal>
            <div className="project-listing-info">
              <span className="project-listing-number">{project.number}</span>
              <h3>{project.title}</h3>
              <p>{project.en}</p>
              <a href={`#${project.id}`} onClick={(event) => { event.preventDefault(); onOpen(project.id) }}>查看项目 ↗</a>
            </div>
          </article>
        ))}
      </AnimatedContent>
    </section>
  )
}

function ProjectDetail({ project, onBack }) {
  return (
    <main className="detail-page" id="top">
      <AnimatedContent as="header" className="detail-top shell" distance={30} blur={4}>
        <a href="#portfolio" className="back-link" onClick={(event) => { event.preventDefault(); onBack() }}>← Back to portfolio</a>
        <span>{project.category} / {project.number}</span>
      </AnimatedContent>
      <AnimatedContent as="section" className="detail-title shell kinetic-heading" stagger={0.12} distance={118} duration={1.16} blur={0} threshold={0.24}>
        <h1>{project.title}</h1>
        <p>{project.en}</p>
      </AnimatedContent>
      <AnimatedContent as="section" className={project.gallery ? 'poster-gallery shell' : `detail-media${project.id === 'other-ad-films' ? ' other-ad-media' : ''}`} aria-label={`${project.title} 项目详情`} stagger={0.06} distance={44} blur={6}>
        {project.gallery && dynamicPosters.map((poster, index) => (
          <figure className="poster-tile" key={poster.src}>
            <video autoPlay muted loop playsInline preload="none" src={poster.src} aria-label={poster.title} />
            <figcaption><span>{String(index + 1).padStart(2, '0')}</span>{poster.title}</figcaption>
          </figure>
        ))}
        {project.videos?.map((video) => (
          <figure className="detail-video" key={video.src}>
            <video controls preload="metadata" playsInline src={video.src} aria-label={video.label} />
            <figcaption>{video.label}</figcaption>
          </figure>
        ))}
        {project.pages.map((src, index) => <img key={src} src={src} alt={`${project.title} 第 ${index + 1} 页`} loading={index > 1 ? 'lazy' : 'eager'} />)}
      </AnimatedContent>
      <AnimatedContent as="footer" className="detail-footer shell" distance={30} blur={4}><a href="#portfolio" className="back-link" onClick={(event) => { event.preventDefault(); onBack() }}>← Return to archive</a><span>WXY / AI DESIGNER</span></AnimatedContent>
    </main>
  )
}

export default function App() {
  const [isFloating, setIsFloating] = useState(false)
  const [activeProject, setActiveProject] = useState(null)

  useEffect(() => {
    const updateNav = () => setIsFloating(window.scrollY > window.innerHeight * 0.68)
    updateNav(); window.addEventListener('scroll', updateNav, { passive: true })
    return () => window.removeEventListener('scroll', updateNav)
  }, [])

  const openProject = (id) => { setActiveProject(id); document.documentElement.scrollTop = 0; document.body.scrollTop = 0 }
  const returnToArchive = () => {
    setActiveProject(null)
    window.setTimeout(() => document.getElementById('portfolio')?.scrollIntoView({ block: 'start' }), 0)
  }

  const project = allProjects.find((item) => item.id === activeProject)
  const background = <DarkVeil className="site-dark-veil" color="#9d0808" speed={1.35} scale={1.2} />
  if (project) return <>{background}<ProjectDetail project={project} onBack={returnToArchive} /></>

  return (
    <>
      {background}
    <main className="site-content">
      <section className="hero" id="top">
        <nav className={`nav shell${isFloating ? ' is-floating' : ''}`} aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="WXY home"><strong>WXY</strong><span>王新媛<br />AI DESIGNER<br />PORTFOLIO</span></a>
          <div className="nav-links"><a href="#about">ABOUT</a><a href="#portfolio">目录</a><a href="#projects">项目</a></div>
          <a className="nav-contact" href="#contact">↓ Contact</a>
        </nav>
        <HeroOpening className="hero-content shell">
          <div className="hero-opening-mask" aria-hidden="true" />
          <div className="hero-kicker">王新媛 · AI DESIGNER</div>
          <h1 aria-label="Wang Xinyuan — AI Designer Portfolio"><span className="hero-title-line">AI Designer</span><strong className="hero-title-line">Portfolio.</strong></h1>
          <a className="message-link" aria-label="Email" href="mailto:2402800273@qq.com">↳ Send message</a>
          <p className="hero-footer">品牌视觉 / 平面设计 / AI 创作</p>
          <p className="hero-note">关注品牌视觉、平面设计与 AI 图像创作。<br />让每一个概念，都能有清晰而有感知的表达。</p>
          <div className="hero-artwork hero-folder-composition" role="img" aria-label="Frosted glass portfolio folder artwork">
            <img className="folder-card folder-card-one" src="/portfolio/fruit-order-cover.png" alt="" />
            <img className="folder-card folder-card-two" src="/portfolio/15.png" alt="" />
            <img className="folder-card folder-card-three" src="/portfolio/43.png" alt="" />
            <img className="folder-card folder-card-four" src="/portfolio/26.png" alt="" />
            <img className="folder-card folder-card-five" src="/portfolio/32.png" alt="" />
            <div className="folder-tab" aria-hidden="true" />
            <div className="folder-pocket" />
          </div>
        </HeroOpening>
      </section>

      <section className="about profile-section shell" id="about" aria-label="About">
        <AnimatedContent as="header" className="profile-heading kinetic-heading" stagger={0.14} distance={118} duration={1.16} blur={0} threshold={0.26}><span>01 / PROFILE</span><h2>个人介绍</h2></AnimatedContent>
        <AnimatedContent className="profile-grid" stagger={0.1} distance={52} blur={8}>
          <article className="profile-card profile-identity"><div className="profile-orbit"><img className="profile-photo" src="/profile-wxy.jpg" alt="王新媛与猫" /></div><p>王新媛</p><small>AI DESIGNER / 2002</small></article>
          <article className="profile-card profile-summary"><h2>AI 视觉设计师，擅长把需求整理为清晰、可执行的视觉表达。</h2><p>Hi~ 我叫王新媛，毕业于华中师范大学视觉传达专业。专注品牌视觉、平面设计与 AI 图像创作，擅长把创意构思、视觉设计与物料落地串联为完整体验。</p><div className="profile-contact"><span>EMAIL&nbsp; 2402800273@qq.com</span><span>PHONE&nbsp; 132 9667 1260</span></div></article>
          <article className="profile-stat"><strong>01</strong><span>品牌视觉</span></article>
          <article className="profile-stat"><strong>02</strong><span>平面设计</span></article>
          <article className="profile-stat"><strong>03</strong><span>AI 图像创作</span></article>
          <article className="profile-stat"><strong>04</strong><span>动态表达</span></article>
        </AnimatedContent>
      </section>

      <PortfolioArchive onOpen={openProject} />

      <section className="expertise shell" id="expertise"><AnimatedContent className="expertise-heading kinetic-heading" stagger={0.14} distance={118} duration={1.16} blur={0} threshold={0.26}><div className="section-number">（ 03 ）</div><h2>Ideas with<br /><i>shape and pulse.</i></h2></AnimatedContent><AnimatedContent className="skill-grid" stagger={0.14} distance={72} duration={1.04} blur={8}><article><span>01</span><h3>AI 图像创作</h3><p>将技术工具转化为视觉语言，快速建立可感知的概念原型。</p></article><article><span>02</span><h3>品牌视觉</h3><p>从命名、识别到应用物料，让品牌拥有连贯而清晰的语调。</p></article><article><span>03</span><h3>整合表达</h3><p>串联平面、动态与数字触点，让创意更完整地抵达受众。</p></article></AnimatedContent></section>

      <footer className="contact" id="contact"><AnimatedContent className="contact-inner shell kinetic-heading" stagger={0.14} distance={118} duration={1.16} blur={0} threshold={0.28}><p className="eyebrow">LET'S MAKE SOMETHING</p><h2>Have a good idea?<br /><i>Let's give it a form.</i></h2><a href="mailto:2402800273@qq.com">2402800273@qq.com ↗</a><div><span>WXY / AI DESIGNER</span><span>武汉 · 中国</span></div></AnimatedContent></footer>
    </main>
    </>
  )
}
