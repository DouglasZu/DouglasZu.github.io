/* ============================================
   I18N — Internationalization (PT-BR / EN)
   ============================================ */

class I18n {
  constructor() {
    this.currentLang = localStorage.getItem('lang') || 'en';
    this.toggleBtn = document.getElementById('lang-toggle');
    this.toggleLabel = document.getElementById('lang-toggle-label');
    this.init();
  }

  init() {
    // Set initial language
    document.documentElement.setAttribute('lang', this.currentLang);
    this.applyTranslations();
    this.updateToggleButton();

    // Bind toggle
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggle());
    }
  }

  toggle() {
    this.currentLang = this.currentLang === 'en' ? 'pt-br' : 'en';
    localStorage.setItem('lang', this.currentLang);
    document.documentElement.setAttribute('lang', this.currentLang);
    this.applyTranslations();
    this.updateToggleButton();
  }

  updateToggleButton() {
    if (this.toggleLabel) {
      this.toggleLabel.textContent = this.currentLang === 'en' ? 'PT' : 'EN';
    }
    if (this.toggleBtn) {
      this.toggleBtn.setAttribute('aria-label',
        this.currentLang === 'en' ? 'Switch to Portuguese' : 'Mudar para Inglês'
      );
    }
  }

  applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      if (translation !== undefined) {
        // Add a tiny fade transition
        el.style.transition = 'opacity 0.2s ease';
        el.style.opacity = '0';
        setTimeout(() => {
          el.innerHTML = translation;
          el.style.opacity = '1';
        }, 150);
      }
    });

    // Handle placeholder attributes
    const placeholderEls = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderEls.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = this.getTranslation(key);
      if (translation !== undefined) {
        el.setAttribute('placeholder', translation);
      }
    });

    // Handle aria-label attributes
    const ariaEls = document.querySelectorAll('[data-i18n-aria]');
    ariaEls.forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const translation = this.getTranslation(key);
      if (translation !== undefined) {
        el.setAttribute('aria-label', translation);
      }
    });

    // Update typewriter roles
    if (window.typewriterInstance) {
      window.typewriterInstance.updateRoles(this.currentLang);
    }
  }

  getTranslation(key) {
    const keys = key.split('.');
    let value = translations[this.currentLang];
    for (const k of keys) {
      if (value === undefined) return undefined;
      value = value[k];
    }
    return value;
  }
}

/* ============================================
   TRANSLATION DICTIONARIES
   ============================================ */

const translations = {
  en: {
    // Navigation
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      artifacts: 'QA Artifacts',
      experience: 'Experience',
      mindset: 'How I Test',
      contact: 'Contact',
    },

    // Hero Section
    hero: {
      label: 'Sorocaba-SP, Brasil · Open to opportunities',
      greeting: 'Hi, I\'m <span class="text-gradient">Douglas Zulim</span>',
      tagline: 'I break things before users do. 4+ years turning chaos into confidence through test automation with Playwright, Selenium, and a relentless pursuit of quality.',
      btnProjects: 'View Projects',
      btnContact: 'Get in Touch',
      scroll: 'Scroll',
    },

    // About Section
    about: {
      label: '// About Me',
      title: 'Building Quality <span class="text-gradient">Into Every Line</span>',
      p1: 'I\'m <strong>Douglas Zulim</strong>, a Quality Assurance Engineer based in <strong>Sorocaba-SP, Brasil</strong> with over <strong>4 years</strong> of experience in automated and manual testing, ensuring software reliability and user satisfaction.',
      p2: 'My journey started in technical support at <strong>Eduzz</strong>, where I quickly progressed from Junior Support Analyst to QA Analyst — driven by a deep curiosity for how systems break. Today I specialize in building automated test suites with <strong>Playwright</strong>, <strong>Selenium</strong>, and <strong>Postman</strong>, covering API, Web, and Desktop layers.',
      p3: 'I work within agile methodologies (<strong>Scrum/Kanban</strong>), collaborating closely with developers and Product Owners to define acceptance criteria and quality standards. I use <strong>TypeScript</strong>, <strong>Python</strong>, and <strong>SQL</strong> daily, and integrate tests into CI/CD pipelines using <strong>Git</strong> and <strong>Jira</strong>.',
      statYears: 'Years Experience',
      statTests: 'Tests Automated',
      statEduzz: 'Years at Eduzz',
    },

    // Skills Section
    skills: {
      label: '// Tech Stack',
      title: 'Tools & <span class="text-gradient">Technologies</span>',
      subtitle: 'The technologies I use to deliver quality at scale.',
      catAutomation: '🤖 Test Automation',
      catLanguages: '💻 Languages',
      catApi: '🔗 API & Performance',
      catCicd: '⚙️ CI/CD & DevOps',
      catDb: '📊 Databases & Monitoring',
    },

    // Projects Section
    projects: {
      label: '// Featured Work',
      title: 'Projects & <span class="text-gradient">Case Studies</span>',
      subtitle: 'Real-world QA projects showcasing automation frameworks, testing strategies, and quality culture.',
      filterAll: 'All',
      filterAutomation: 'Automation',
      filterApi: 'API',
      filterCicd: 'CI/CD',
      filterPerformance: 'Performance',
      project1Title: 'E2E Automation Framework',
      project1Desc: 'A scalable end-to-end test automation framework built with Cypress and TypeScript. Implements Page Object Model, custom commands, and parallel execution. Reduced regression testing time by 70%.',
      project2Title: 'API Testing Suite',
      project2Desc: 'Comprehensive REST API testing suite using Python and Pytest. Features schema validation, data-driven tests, and automated contract testing. Covers 150+ endpoints with 98% reliability.',
      project3Title: 'CI/CD Quality Pipeline',
      project3Desc: 'End-to-end CI/CD pipeline integrating automated tests at every stage. Configured Jenkins and GitHub Actions to run unit, integration, and E2E tests with automated reporting and Slack notifications.',
      project4Title: 'Performance Testing Dashboard',
      project4Desc: 'Load and stress testing infrastructure using k6 with real-time monitoring via Grafana dashboards. Identified critical bottlenecks that improved API response times by 40% under load.',
    },

    // QA Artifacts Section
    artifacts: {
      label: '// QA Artifacts',
      title: 'Real <span class="text-gradient">QA Documentation</span>',
      subtitle: 'Examples of structured QA work — from test cases to bug reports.',
      tabTestCases: 'Test Cases',
      tabBugReports: 'Bug Reports',
      tabTestPlans: 'Test Plans',
      tabReports: 'Automation Reports',
      // Test Cases Table
      tcTitle: '🧪 Login Flow — Test Cases',
      tcBadge: '12 Cases',
      thId: 'ID',
      thDescription: 'Description',
      thPriority: 'Priority',
      thStatus: 'Status',
      tc001: 'Valid credentials login',
      tc002: 'Invalid password error message',
      tc003: 'Empty fields validation',
      tc004: 'Account lockout after 5 failed attempts',
      tc005: 'Remember me functionality',
      tc006: 'SSO / OAuth2 redirect flow',
      statusPass: '✓ Pass',
      // Bug Reports Table
      bugTitle: '🐛 Bug Reports — Sprint 42',
      bugBadge: '3 Critical',
      thSummary: 'Summary',
      thSeverity: 'Severity',
      bug1847: 'Payment fails silently on timeout > 30s',
      bug1852: 'Cart total doesn\'t update after coupon removal',
      bug1856: 'Race condition in concurrent order placement',
      bug1861: 'Search results inconsistent with special chars',
      bug1865: 'Session token not refreshed on password change',
      statusFixed: '✓ Fixed',
      statusInProgress: '⚠ In Progress',
      // Test Plans
      tpTitle: '📋 Test Plan — E-Commerce Release v3.2',
      tpBadge: 'Active',
      tpObjectiveLabel: 'Objective:',
      tpObjective: 'Validate all critical user journeys for the v3.2 release including new payment provider integration and redesigned checkout flow.',
      tpScopeLabel: 'Scope:',
      tpScope1: '✅ Functional testing — checkout, payments, cart',
      tpScope2: '✅ Integration testing — payment gateway API',
      tpScope3: '✅ Regression testing — existing features',
      tpScope4: '✅ Performance testing — checkout under load',
      tpScope5: '⬜ Security testing — PCI compliance checks',
      tpMetricsLabel: 'Test Metrics:',
      tpMetric1: 'Total test cases: <span style="color: var(--color-primary);">247</span>',
      tpMetric2: 'Automated: <span style="color: var(--color-success);">189 (76%)</span>',
      tpMetric3: 'Manual: <span style="color: var(--color-warning);">58 (24%)</span>',
      tpMetric4: 'Pass rate: <span style="color: var(--color-success);">96.4%</span>',
      // Automation Reports
      arTitle: '📊 Automation Report — Nightly Run',
      arBadge: 'Passed',
      arTotalTests: 'Total Tests',
      arPassed: 'Passed',
      arFailed: 'Failed',
      arSkipped: 'Skipped',
      arFooter: 'Execution time: 42.3s · Environment: staging · Browser: Chrome 120',
    },

    // Experience Section
    experience: {
      label: '// Career Journey',
      title: 'Professional <span class="text-gradient">Experience</span>',
      job1Date: '06/2021 — 06/2026',
      job1Title: 'Quality Assurance Analyst',
      job1Company: 'Eduzz · Full-time',
      job1Desc: 'Development and maintenance of automated tests with Playwright and Postman for API and UI (Web and Desktop) validation. Implementation of integration and regression tests, ensuring release stability. Active participation in the agile development cycle (Scrum), collaborating with developers and POs to define acceptance and quality criteria. Use of Git for versioning and continuous integration (CI/CD). Support in analyzing and solving bugs, using SQL to investigate database issues.',
      job2Date: '01/2021 — 05/2021',
      job2Title: 'Mid-Level Support Analyst',
      job2Company: 'Eduzz · Full-time',
      job2Desc: 'Technical customer support, analyzing cases to open improvements, incidents, and problems. Analyzes performed using SQL to investigate issues. Opening Jira cards and participating in defect meetings to address identified problems.',
      job3Date: '09/2019 — 12/2020',
      job3Title: 'Junior Support Analyst',
      job3Company: 'Eduzz · Full-time',
      job3Desc: 'Customer service via email and chat. Configuration of pixels, webhooks, and platform products.',
    },

    // How I Test Section
    mindset: {
      label: '// QA Philosophy',
      title: 'How I <span class="text-gradient">Approach Quality</span>',
      subtitle: 'Quality is not just about finding bugs — it\'s about building confidence in every release.',
      step1Title: 'Understand',
      step1Desc: 'Deep-dive into requirements, user stories, and acceptance criteria. I ask the right questions before writing a single test — understanding the "why" behind features drives smarter testing.',
      step2Title: 'Plan Strategically',
      step2Desc: 'Design test strategies that balance risk with coverage. I prioritize what matters most — critical paths, edge cases, and integration points — using risk-based testing approaches.',
      step3Title: 'Automate Smartly',
      step3Desc: 'Not everything needs automation. I automate regression, smoke tests, and repetitive validations while keeping exploratory testing manual. The right tool for the right job.',
      step4Title: 'Integrate Early',
      step4Desc: 'Shift-left testing — I embed quality checks into the CI/CD pipeline from day one. Every commit triggers automated tests, catching issues when they\'re cheapest to fix.',
      step5Title: 'Monitor & Improve',
      step5Desc: 'Quality doesn\'t stop at deployment. I set up monitoring, track test metrics, and continuously refine the testing process based on real production data and team feedback.',
    },

    // Contact Section
    contact: {
      label: '// Let\'s Connect',
      title: 'Get in <span class="text-gradient">Touch</span>',
      subtitle: 'Interested in working together? I\'m always open to discussing new projects, opportunities, and ideas.',
      reachOut: 'Reach Out',
      reachOutDesc: 'Whether you have a question or just want to say hi, feel free to reach out. I\'ll get back to you as soon as possible.',
      formName: 'Name',
      formEmail: 'Email',
      formMessage: 'Message',
      formNamePlaceholder: 'Your name',
      formEmailPlaceholder: 'your@email.com',
      formMessagePlaceholder: 'Tell me about your project or opportunity...',
      formSubmit: 'Send Message',
    },

    // Footer
    footer: {
      built: 'Built with <span class="heart">❤</span> by <strong>Douglas Zulim</strong> · 2026',
      quote: 'Quality is not an act, it is a habit. — Aristotle',
    },
  },

  'pt-br': {
    // Navegação
    nav: {
      about: 'Sobre',
      skills: 'Habilidades',
      projects: 'Projetos',
      artifacts: 'Artefatos QA',
      experience: 'Experiência',
      mindset: 'Como Testo',
      contact: 'Contato',
    },

    // Seção Hero
    hero: {
      label: 'Sorocaba-SP, Brasil · Aberto a oportunidades',
      greeting: 'Olá, eu sou <span class="text-gradient">Douglas Zulim</span>',
      tagline: 'Eu quebro as coisas antes dos usuários. 4+ anos transformando caos em confiança através de automação de testes com Playwright, Selenium e uma busca incansável por qualidade.',
      btnProjects: 'Ver Projetos',
      btnContact: 'Entre em Contato',
      scroll: 'Rolar',
    },

    // Seção Sobre
    about: {
      label: '// Sobre Mim',
      title: 'Construindo Qualidade <span class="text-gradient">Em Cada Linha</span>',
      p1: 'Eu sou <strong>Douglas Zulim</strong>, Engenheiro de Qualidade baseado em <strong>Sorocaba-SP, Brasil</strong> com mais de <strong>4 anos</strong> de experiência em testes automatizados e manuais, garantindo a confiabilidade do software e a satisfação do usuário.',
      p2: 'Minha jornada começou no suporte técnico na <strong>Eduzz</strong>, onde rapidamente progredi de Analista de Suporte Júnior para Analista de QA — impulsionado por uma curiosidade profunda sobre como os sistemas falham. Hoje me especializo em construir suítes de testes automatizados com <strong>Playwright</strong>, <strong>Selenium</strong> e <strong>Postman</strong>, cobrindo camadas de API, Web e Desktop.',
      p3: 'Trabalho com metodologias ágeis (<strong>Scrum/Kanban</strong>), colaborando de perto com desenvolvedores e Product Owners para definir critérios de aceite e padrões de qualidade. Uso <strong>TypeScript</strong>, <strong>Python</strong> e <strong>SQL</strong> diariamente, e integro testes em pipelines CI/CD usando <strong>Git</strong> e <strong>Jira</strong>.',
      statYears: 'Anos de Experiência',
      statTests: 'Testes Automatizados',
      statEduzz: 'Anos na Eduzz',
    },

    // Seção Habilidades
    skills: {
      label: '// Stack Técnica',
      title: 'Ferramentas & <span class="text-gradient">Tecnologias</span>',
      subtitle: 'As tecnologias que uso para entregar qualidade em escala.',
      catAutomation: '🤖 Automação de Testes',
      catLanguages: '💻 Linguagens',
      catApi: '🔗 API & Performance',
      catCicd: '⚙️ CI/CD & DevOps',
      catDb: '📊 Bancos de Dados & Monitoramento',
    },

    // Seção Projetos
    projects: {
      label: '// Trabalhos em Destaque',
      title: 'Projetos & <span class="text-gradient">Estudos de Caso</span>',
      subtitle: 'Projetos reais de QA demonstrando frameworks de automação, estratégias de teste e cultura de qualidade.',
      filterAll: 'Todos',
      filterAutomation: 'Automação',
      filterApi: 'API',
      filterCicd: 'CI/CD',
      filterPerformance: 'Performance',
      project1Title: 'Framework de Automação E2E',
      project1Desc: 'Um framework escalável de automação de testes end-to-end construído com Cypress e TypeScript. Implementa Page Object Model, comandos customizados e execução paralela. Reduziu o tempo de testes de regressão em 70%.',
      project2Title: 'Suíte de Testes de API',
      project2Desc: 'Suíte abrangente de testes de API REST usando Python e Pytest. Possui validação de schema, testes orientados a dados e testes de contrato automatizados. Cobre 150+ endpoints com 98% de confiabilidade.',
      project3Title: 'Pipeline de Qualidade CI/CD',
      project3Desc: 'Pipeline CI/CD de ponta a ponta integrando testes automatizados em cada estágio. Configurei Jenkins e GitHub Actions para executar testes unitários, de integração e E2E com relatórios automatizados e notificações no Slack.',
      project4Title: 'Dashboard de Testes de Performance',
      project4Desc: 'Infraestrutura de testes de carga e stress usando k6 com monitoramento em tempo real via dashboards Grafana. Identifiquei gargalos críticos que melhoraram os tempos de resposta da API em 40% sob carga.',
    },

    // Seção Artefatos QA
    artifacts: {
      label: '// Artefatos QA',
      title: '<span class="text-gradient">Documentação QA</span> Real',
      subtitle: 'Exemplos de trabalho estruturado de QA — de casos de teste a relatórios de bugs.',
      tabTestCases: 'Casos de Teste',
      tabBugReports: 'Relatórios de Bug',
      tabTestPlans: 'Planos de Teste',
      tabReports: 'Relatórios de Automação',
      // Tabela de Casos de Teste
      tcTitle: '🧪 Fluxo de Login — Casos de Teste',
      tcBadge: '12 Casos',
      thId: 'ID',
      thDescription: 'Descrição',
      thPriority: 'Prioridade',
      thStatus: 'Status',
      tc001: 'Login com credenciais válidas',
      tc002: 'Mensagem de erro para senha inválida',
      tc003: 'Validação de campos vazios',
      tc004: 'Bloqueio de conta após 5 tentativas falhas',
      tc005: 'Funcionalidade "Lembrar-me"',
      tc006: 'Fluxo de redirecionamento SSO / OAuth2',
      statusPass: '✓ Aprovado',
      // Relatórios de Bug
      bugTitle: '🐛 Relatórios de Bug — Sprint 42',
      bugBadge: '3 Críticos',
      thSummary: 'Resumo',
      thSeverity: 'Severidade',
      bug1847: 'Pagamento falha silenciosamente em timeout > 30s',
      bug1852: 'Total do carrinho não atualiza após remoção de cupom',
      bug1856: 'Condição de corrida em pedidos simultâneos',
      bug1861: 'Resultados de busca inconsistentes com caracteres especiais',
      bug1865: 'Token de sessão não renovado ao alterar senha',
      statusFixed: '✓ Corrigido',
      statusInProgress: '⚠ Em Progresso',
      // Planos de Teste
      tpTitle: '📋 Plano de Teste — E-Commerce Release v3.2',
      tpBadge: 'Ativo',
      tpObjectiveLabel: 'Objetivo:',
      tpObjective: 'Validar todas as jornadas críticas do usuário para o release v3.2, incluindo nova integração de provedor de pagamento e fluxo de checkout redesenhado.',
      tpScopeLabel: 'Escopo:',
      tpScope1: '✅ Testes funcionais — checkout, pagamentos, carrinho',
      tpScope2: '✅ Testes de integração — API do gateway de pagamento',
      tpScope3: '✅ Testes de regressão — funcionalidades existentes',
      tpScope4: '✅ Testes de performance — checkout sob carga',
      tpScope5: '⬜ Testes de segurança — verificações de conformidade PCI',
      tpMetricsLabel: 'Métricas de Teste:',
      tpMetric1: 'Total de casos de teste: <span style="color: var(--color-primary);">247</span>',
      tpMetric2: 'Automatizados: <span style="color: var(--color-success);">189 (76%)</span>',
      tpMetric3: 'Manuais: <span style="color: var(--color-warning);">58 (24%)</span>',
      tpMetric4: 'Taxa de aprovação: <span style="color: var(--color-success);">96.4%</span>',
      // Relatórios de Automação
      arTitle: '📊 Relatório de Automação — Execução Noturna',
      arBadge: 'Aprovado',
      arTotalTests: 'Total de Testes',
      arPassed: 'Aprovados',
      arFailed: 'Falhos',
      arSkipped: 'Pulados',
      arFooter: 'Tempo de execução: 42.3s · Ambiente: staging · Navegador: Chrome 120',
    },

    // Seção Experiência
    experience: {
      label: '// Jornada Profissional',
      title: 'Experiência <span class="text-gradient">Profissional</span>',
      job1Date: '06/2021 — 06/2026',
      job1Title: 'Analista de Qualidade (QA)',
      job1Company: 'Eduzz · Tempo integral',
      job1Desc: 'Desenvolvimento e manutenção de testes automatizados com Playwright e Postman para validação de API e UI (Web e Desktop). Implementação de testes de integração e regressão, garantindo a estabilidade das releases. Participação ativa no ciclo de desenvolvimento ágil (Scrum), colaborando com desenvolvedores e POs para definir critérios de aceite e qualidade. Uso de Git para versionamento e integração contínua (CI/CD). Suporte na análise e solução de bugs, usando SQL para investigar problemas no banco de dados.',
      job2Date: '01/2021 — 05/2021',
      job2Title: 'Analista de Suporte Pleno',
      job2Company: 'Eduzz · Tempo integral',
      job2Desc: 'Suporte técnico ao cliente, analisando casos para abertura de melhorias, incidentes e problemas. Análises realizadas utilizando SQL para investigar problemas. Abertura de cards no Jira e participação em reuniões de defeitos para tratar os problemas identificados.',
      job3Date: '09/2019 — 12/2020',
      job3Title: 'Analista de Suporte Júnior',
      job3Company: 'Eduzz · Tempo integral',
      job3Desc: 'Atendimento ao cliente via e-mail e chat. Configuração de pixels, webhooks e produtos da plataforma.',
    },

    // Seção Como Testo
    mindset: {
      label: '// Filosofia QA',
      title: 'Como Eu <span class="text-gradient">Abordo Qualidade</span>',
      subtitle: 'Qualidade não é apenas encontrar bugs — é construir confiança em cada release.',
      step1Title: 'Compreender',
      step1Desc: 'Mergulho profundo nos requisitos, histórias de usuário e critérios de aceite. Faço as perguntas certas antes de escrever um único teste — entender o "porquê" por trás das funcionalidades impulsiona testes mais inteligentes.',
      step2Title: 'Planejar Estrategicamente',
      step2Desc: 'Desenho estratégias de teste que equilibram risco com cobertura. Priorizo o que mais importa — caminhos críticos, casos de borda e pontos de integração — usando abordagens de teste baseadas em risco.',
      step3Title: 'Automatizar com Inteligência',
      step3Desc: 'Nem tudo precisa de automação. Automatizo regressão, smoke tests e validações repetitivas, mantendo os testes exploratórios manuais. A ferramenta certa para o trabalho certo.',
      step4Title: 'Integrar Cedo',
      step4Desc: 'Shift-left testing — incorporo verificações de qualidade no pipeline CI/CD desde o primeiro dia. Cada commit dispara testes automatizados, capturando problemas quando são mais baratos de corrigir.',
      step5Title: 'Monitorar & Melhorar',
      step5Desc: 'Qualidade não para no deploy. Configuro monitoramento, acompanho métricas de teste e refino continuamente o processo de testes com base em dados reais de produção e feedback da equipe.',
    },

    // Seção Contato
    contact: {
      label: '// Vamos Conversar',
      title: 'Entre em <span class="text-gradient">Contato</span>',
      subtitle: 'Interessado em trabalhar junto? Estou sempre aberto a discutir novos projetos, oportunidades e ideias.',
      reachOut: 'Fale Comigo',
      reachOutDesc: 'Se você tem uma pergunta ou quer apenas dizer oi, fique à vontade para entrar em contato. Responderei o mais rápido possível.',
      formName: 'Nome',
      formEmail: 'E-mail',
      formMessage: 'Mensagem',
      formNamePlaceholder: 'Seu nome',
      formEmailPlaceholder: 'seu@email.com',
      formMessagePlaceholder: 'Conte-me sobre seu projeto ou oportunidade...',
      formSubmit: 'Enviar Mensagem',
    },

    // Rodapé
    footer: {
      built: 'Feito com <span class="heart">❤</span> por <strong>Douglas Zulim</strong> · 2026',
      quote: 'Qualidade não é um ato, é um hábito. — Aristóteles',
    },
  },
};

// Typewriter roles per language
const typewriterRoles = {
  en: ['QA Engineer', 'Test Automation Engineer', 'Quality Advocate', 'SDET', 'Bug Hunter'],
  'pt-br': ['Engenheiro de QA', 'Automação de Testes', 'Defensor da Qualidade', 'SDET', 'Caçador de Bugs'],
};

window.I18n = I18n;
window.translations = translations;
window.typewriterRoles = typewriterRoles;
