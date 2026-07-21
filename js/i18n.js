class I18n {
  constructor() {
    this.storageKey = 'portfolio-language';
    this.currentLang = localStorage.getItem(this.storageKey) || 'pt-br';
    this.toggleBtn = document.getElementById('lang-toggle');
    this.toggleLabel = document.getElementById('lang-toggle-label');
    window.i18nInstance = this;
    this.init();
  }

  init() {
    this.applyTranslations();
    this.updateToggleButton();
    this.toggleBtn?.addEventListener('click', () => this.toggle());
  }

  toggle() {
    this.currentLang = this.currentLang === 'en' ? 'pt-br' : 'en';
    localStorage.setItem(this.storageKey, this.currentLang);
    this.applyTranslations();
    this.updateToggleButton();
  }

  applyTranslations() {
    document.documentElement.lang = this.currentLang === 'pt-br' ? 'pt-BR' : 'en';
    document.title = this.getTranslation('meta.title');

    const description = this.getTranslation('meta.description');
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', this.currentLang === 'pt-br' ? 'pt_BR' : 'en_US');

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const value = this.getTranslation(element.dataset.i18n);
      if (value !== undefined) element.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
      const value = this.getTranslation(element.dataset.i18nAria);
      if (value !== undefined) element.setAttribute('aria-label', value);
    });

    document.querySelectorAll('[data-i18n-tooltip]').forEach((element) => {
      const value = this.getTranslation(element.dataset.i18nTooltip);
      if (value !== undefined) element.dataset.tooltip = value;
    });

    document.dispatchEvent(new CustomEvent('languagechange', { detail: { language: this.currentLang } }));
  }

  updateToggleButton() {
    if (this.toggleLabel) this.toggleLabel.textContent = this.currentLang === 'en' ? 'PT' : 'EN';
    if (this.toggleBtn) this.toggleBtn.setAttribute('aria-label', this.getTranslation('accessibility.languageToggle'));
  }

  getTranslation(key) {
    return key.split('.').reduce((value, part) => value?.[part], translations[this.currentLang]);
  }
}

const translations = {
  'pt-br': {
    meta: {
      title: 'Douglas Zulim — QA Engineer',
      description: 'Portfólio de Douglas Zulim, QA Engineer com cinco anos de experiência em automação de testes, testes de API, Playwright, TypeScript, SQL e CI/CD.'
    },
    accessibility: {
      skip: 'Pular para o conteúdo principal',
      primaryNav: 'Navegação principal',
      backToTop: 'Douglas Zulim — voltar ao início',
      themeToggle: 'Alternar tema',
      openMenu: 'Abrir menu de navegação',
      closeMenu: 'Fechar menu de navegação',
      languageToggle: 'Mudar para inglês',
      scrollTop: 'Voltar ao topo',
      close: 'Fechar'
    },
    nav: { about: 'Sobre', projects: 'Projetos', artifacts: 'Artefatos', experience: 'Experiência', contact: 'Contato' },
    hero: {
      location: 'Sorocaba-SP, Brasil · Aberto a oportunidades',
      title: 'QA Engineer focado em automação, APIs e confiabilidade',
      description: 'Cinco anos de experiência em Qualidade de Software, atuando com automação, testes de API, integrações e investigação de defeitos utilizando Playwright, TypeScript, Postman e SQL.',
      viewProjects: 'Ver projetos',
      downloadResume: 'Baixar currículo',
      metricsLabel: 'Indicadores profissionais com contexto',
      metricsEyebrow: 'EXPERIÊNCIA EM QUALIDADE',
      metricsTitle: 'Contexto por trás dos números.',
      years: 'anos',
      qaExperience: 'Experiência em QA',
      automatedScenarios: 'Cenários na suíte automatizada',
      monthlyReleases: 'Releases validadas mensalmente',
      scenariosNote: 'Atuação na manutenção e evolução de uma suíte com mais de 600 cenários automatizados.',
      releasesNote: 'Participação na validação de aproximadamente 15 a 20 releases mensais.',
      metricContext: 'Contribuição em equipe na manutenção da suíte e na validação das releases.'
    },
    about: {
      label: '// Sobre mim',
      title: 'Qualidade com visão <span class="text-gradient">técnica e de negócio</span>',
      p1: 'Sou QA Engineer com cinco anos de experiência em Qualidade de Software, atuando com automação de testes, validação de APIs, testes integrados e investigação de defeitos.',
      p2: 'Minha trajetória começou na área de suporte técnico, onde desenvolvi experiência em troubleshooting, análise de incidentes, SQL e compreensão das necessidades dos clientes. Essa base fortaleceu minha atuação em QA, permitindo analisar tanto o comportamento técnico dos sistemas quanto o impacto das falhas para o usuário e para o negócio.',
      p3: 'Na área de qualidade, trabalhei com APIs e aplicações Web/Desktop utilizando Playwright, TypeScript, Selenium, Postman, Python e SQL. Contribuí para a manutenção e evolução de uma suíte com mais de 600 cenários automatizados e participei da validação de aproximadamente 15 a 20 releases mensais.',
      p4: 'Tenho experiência com testes funcionais, exploratórios, integração, regressão, critérios de aceitação, gestão de defeitos, Git, Jira, Jenkins e CI/CD. Também atuei com sistemas de pagamento, Pix Automático, PSPs e webhooks, colaborando com desenvolvimento e produto desde o refinamento até a validação das entregas.'
    },
    skills: {
      label: '// Tecnologias por contexto',
      title: 'Experiência, prática e <span class="text-gradient">aprendizado</span>',
      subtitle: 'As ferramentas estão agrupadas pelo contexto de uso, sem porcentagens ou níveis artificiais.',
      professional: 'Experiência profissional',
      professionalBadge: 'Experiência profissional',
      practical: 'Projetos práticos',
      practicalBadge: 'Projeto prático',
      learning: 'Em aprendizado',
      learningBadge: 'Em aprendizado',
      professionalAria: 'Tecnologias com experiência profissional',
      practicalAria: 'Tecnologias usadas em projetos práticos',
      learningAria: 'Tecnologias em aprendizado'
    },
    projects: {
      label: '// Portfólio técnico',
      title: 'Projetos Práticos e <span class="text-gradient">Estudos de Caso</span>',
      subtitle: 'Projetos demonstrativos de automação, testes de API, CI/CD e estratégia de qualidade desenvolvidos para aplicar conceitos e boas práticas de QA.',
      filterAria: 'Filtrar projetos',
      filterAll: 'Todos', filterAutomation: 'Automação', filterApi: 'API', filterCicd: 'CI/CD', filterPerformance: 'Performance',
      practicalBadge: 'Projeto prático',
      inDevelopment: 'Em desenvolvimento',
      planned: 'Planejado',
      project1Title: 'Framework de Automação Web',
      project1Desc: 'Projeto demonstrativo de automação Web utilizando Playwright ou Cypress com TypeScript, organização por camadas, Page Objects, fixtures, dados reutilizáveis, relatórios e execução em CI/CD.',
      project2Title: 'Automação de Testes de API',
      project2Desc: 'Projeto prático de automação de APIs cobrindo métodos HTTP, cenários positivos e negativos, validação de schema, autenticação, dados parametrizados e execução automatizada.',
      project3Title: 'Pipeline de Qualidade CI/CD',
      project3Desc: 'Projeto demonstrativo de integração de testes automatizados com GitHub Actions, incluindo execução de suítes, publicação de resultados e bloqueio do pipeline em falhas críticas.',
      project4Title: 'Laboratório de Testes de Performance',
      project4Desc: 'Laboratório de testes de carga com k6 criado para estudar thresholds, tempo de resposta, throughput, taxa de erros e comportamento da aplicação sob diferentes níveis de carga.',
      viewCode: 'Ver código',
      viewDocs: 'Ver documentação',
      repositoryPending: 'README e repositório específico serão publicados quando o projeto estiver disponível.'
    },
    artifacts: {
      label: '// Evidências de abordagem',
      title: 'Artefatos Demonstrativos <span class="text-gradient">de QA</span>',
      disclaimer: 'Os exemplos abaixo utilizam cenários fictícios e foram criados exclusivamente para demonstrar minha abordagem de qualidade. Não contêm dados, código ou informações confidenciais de empregadores.',
      testCaseTitle: 'Caso de teste — autenticação',
      testCaseSummary: 'Cenário completo com pré-condições, dados, passos, prioridade e resultado esperado.',
      bugTitle: 'Relatório de bug — pagamento',
      bugSummary: 'Registro reprodutível com severidade, evidências e request/response fictícios.',
      planTitle: 'Plano de teste — checkout',
      planSummary: 'Estratégia baseada em risco, incluindo escopo, ambiente e critérios de entrada e saída.',
      reportTitle: 'Relatório de automação',
      reportSummary: 'Exemplo fictício de leitura de resultados, ambiente e informações de execução.',
      open: 'Abrir artefato'
    },
    artifactDetails: {
      demoNotice: 'Exemplo fictício para demonstração.',
      reportNotice: 'Números fictícios usados somente para demonstrar a estrutura do relatório.',
      testCaseTitle: 'Caso de teste — autenticação com credenciais válidas',
      bugTitle: 'Pagamento aprovado retorna mensagem de falha',
      planTitle: 'Plano de teste — checkout demonstrativo',
      reportTitle: 'Relatório de automação — execução demonstrativa',
      preconditions: 'Pré-condições', steps: 'Passos', data: 'Dados', expected: 'Resultado esperado', priority: 'Prioridade', status: 'Status',
      tcPreconditions: 'Usuário ativo e página de login disponível no ambiente de teste.',
      tcSteps: '1. Acessar o login; 2. Informar e-mail e senha válidos; 3. Selecionar “Entrar”.',
      tcData: 'qa.demo@example.test / senha fictícia válida.',
      tcExpected: 'Autenticação concluída, sessão criada e redirecionamento para a área inicial.',
      high: 'Alta', ready: 'Pronto para execução',
      environment: 'Ambiente', version: 'Versão', reproduction: 'Passos para reprodução', actual: 'Resultado atual', severity: 'Severidade', frequency: 'Frequência', evidence: 'Evidências', critical: 'Crítica',
      bugPreconditions: 'Carrinho com produto fictício e usuário autenticado.',
      bugSteps: '1. Abrir checkout; 2. Selecionar Pix; 3. Confirmar pagamento simulado; 4. Observar o retorno.',
      bugActual: 'A API responde 200/APPROVED, mas a interface exibe “Pagamento não concluído”.',
      bugExpected: 'A interface confirma o pagamento e apresenta o identificador do pedido.',
      bugEvidence: 'Captura fictícia da interface e correlação de logs.',
      objective: 'Objetivo', scope: 'Escopo', outScope: 'Fora do escopo', risks: 'Riscos', strategy: 'Estratégia', testTypes: 'Tipos de teste', entry: 'Critérios de entrada', exit: 'Critérios de saída', dependencies: 'Dependências',
      planObjective: 'Validar os fluxos críticos de checkout e a integração com um provedor de pagamento fictício.',
      planScope: 'Carrinho, cupom, checkout, Pix e retorno de status.',
      planOutScope: 'Chargeback, conciliação financeira e testes de produção.',
      planRisks: 'Duplicidade, perda de status e divergência de valores.',
      planStrategy: 'Testes funcionais, exploratórios, integração, regressão direcionada e automação dos fluxos determinísticos.',
      planTypes: 'API, Web, integração, regressão e exploratório.',
      planEntry: 'Build disponível, ambiente estável, dados e critérios de aceitação revisados.',
      planExit: 'Fluxos críticos aprovados e nenhuma falha bloqueadora aberta.',
      planDependencies: 'Sandbox do PSP fictício, massa de dados e pipeline de testes.',
      total: 'Total de testes', passed: 'Aprovados', failed: 'Falhas', skipped: 'Ignorados', duration: 'Tempo de execução', browser: 'Navegador', date: 'Data', pipeline: 'Pipeline/relatório',
      sampleDate: 'Data fictícia', unavailable: 'Indisponível — projeto ainda não publicado.'
    },
    experience: {
      label: '// Trajetória', title: 'Experiência <span class="text-gradient">Profissional</span>', fullTime: 'Tempo integral',
      job1Date: '06/2021 – 06/2026', job1Title: 'Analista de Qualidade',
      job1Item1: 'Desenvolvimento e manutenção de testes automatizados com Playwright e TypeScript para APIs e aplicações Web/Desktop.',
      job1Item2: 'Contribuição na manutenção e evolução de uma suíte com mais de 600 cenários automatizados.',
      job1Item3: 'Participação na validação de aproximadamente 15 a 20 releases mensais, priorizando fluxos críticos e riscos de regressão.',
      job1Item4: 'Planejamento e execução de testes funcionais, exploratórios, integrados e de regressão.',
      job1Item5: 'Validação de APIs REST com Postman, analisando status HTTP, payloads, contratos e regras de negócio.',
      job1Item6: 'Investigação de defeitos e inconsistências utilizando SQL, logs e evidências técnicas.',
      job1Item7: 'Participação em refinamentos e definição de critérios de aceitação com desenvolvimento e produto.',
      job1Item8: 'Atuação em fluxos de pagamentos, Pix Automático, PSPs e webhooks.',
      job1Item9: 'Versionamento de projetos com Git e execução de testes em fluxos de CI/CD utilizando Jenkins.',
      job2Date: '01/2021 – 05/2021', job2Title: 'Analista de Suporte Pleno',
      job2Item1: 'Atendimento técnico e investigação de problemas reportados por clientes.',
      job2Item2: 'Análise de inconsistências utilizando SQL.',
      job2Item3: 'Registro de incidentes, problemas e solicitações de melhoria no Jira.',
      job2Item4: 'Participação em triagens e reuniões de defeitos.',
      job2Item5: 'Documentação de cenários e evidências para apoiar a investigação técnica.',
      job3Date: '09/2019 – 12/2020', job3Title: 'Analista de Suporte Júnior',
      job3Item1: 'Atendimento aos clientes por e-mail e chat.',
      job3Item2: 'Configuração e suporte a pixels, webhooks e produtos da plataforma.',
      job3Item3: 'Análise inicial de problemas e encaminhamento para equipes técnicas.',
      job3Item4: 'Desenvolvimento de conhecimento sobre regras de negócio e experiência do usuário.'
    },
    mindset: {
      label: '// Processo', title: 'Como eu abordo <span class="text-gradient">qualidade</span>',
      step1Title: 'Compreender', step1Desc: 'Analiso requisitos, histórias de usuário, critérios de aceitação, integrações e riscos antes de definir os testes.',
      step2Title: 'Planejar estrategicamente', step2Desc: 'Organizo a estratégia com base no risco, priorizando fluxos críticos, cenários negativos, limites e pontos de integração.',
      step3Title: 'Automatizar com critério', step3Desc: 'Automatizo cenários repetitivos, críticos e determinísticos, mantendo testes exploratórios e validações subjetivas na abordagem manual.',
      step4Title: 'Integrar cedo', step4Desc: 'Busco integrar validações automatizadas ao pipeline nas primeiras etapas da entrega, executando diferentes suítes de acordo com o risco e o momento do desenvolvimento.',
      step5Title: 'Monitorar e melhorar', step5Desc: 'Acompanho resultados das execuções, defeitos recorrentes e feedback do time para identificar oportunidades de melhoria na cobertura e no processo de qualidade.'
    },
    contact: {
      label: '// Contato', title: 'Vamos <span class="text-gradient">conversar?</span>',
      subtitle: 'Para oportunidades, projetos ou troca de experiências em qualidade, escolha o canal que preferir.',
      email: 'E-mail', resume: 'Currículo', downloadPdf: 'Baixar PDF',
      note: 'O formulário foi removido para não depender do aplicativo de e-mail do visitante nem armazenar dados sem uma integração segura configurada.'
    },
    footer: { built: 'Desenvolvido por <strong>Douglas Zulim</strong> · 2026', note: 'Conteúdo profissional apresentado com contexto e transparência.' }
  },

  en: {
    meta: {
      title: 'Douglas Zulim — QA Engineer',
      description: 'Douglas Zulim’s portfolio: QA Engineer with five years of experience in test automation, API testing, Playwright, TypeScript, SQL, and CI/CD.'
    },
    accessibility: {
      skip: 'Skip to main content', primaryNav: 'Primary navigation', backToTop: 'Douglas Zulim — back to top', themeToggle: 'Toggle theme', openMenu: 'Open navigation menu', closeMenu: 'Close navigation menu', languageToggle: 'Switch to Portuguese', scrollTop: 'Back to top', close: 'Close'
    },
    nav: { about: 'About', projects: 'Projects', artifacts: 'Artifacts', experience: 'Experience', contact: 'Contact' },
    hero: {
      location: 'Sorocaba-SP, Brazil · Open to opportunities',
      title: 'QA Engineer focused on automation, APIs, and reliability',
      description: 'Five years of experience in Software Quality, working with test automation, API testing, integrations, and defect investigation using Playwright, TypeScript, Postman, and SQL.',
      viewProjects: 'View projects', downloadResume: 'Download resume', metricsLabel: 'Professional indicators with context', metricsEyebrow: 'QUALITY EXPERIENCE', metricsTitle: 'Context behind the numbers.', years: 'years', qaExperience: 'QA experience', automatedScenarios: 'Scenarios in the automated suite', monthlyReleases: 'Releases validated monthly',
      scenariosNote: 'Worked on maintaining and evolving a suite with more than 600 automated scenarios.',
      releasesNote: 'Participated in validating approximately 15 to 20 releases per month.',
      metricContext: 'Team contribution to suite maintenance and release validation.'
    },
    about: {
      label: '// About me', title: 'Quality with a <span class="text-gradient">technical and business perspective</span>',
      p1: 'I am a QA Engineer with five years of experience in Software Quality, working with test automation, API validation, integration testing, and defect investigation.',
      p2: 'My career started in technical support, where I developed experience in troubleshooting, incident analysis, SQL, and understanding customer needs. This background strengthened my work in QA, allowing me to evaluate both the technical behavior of systems and the impact of failures on users and the business.',
      p3: 'In Quality Assurance, I worked with APIs and Web/Desktop applications using Playwright, TypeScript, Selenium, Postman, Python, and SQL. I contributed to maintaining and evolving a suite with more than 600 automated scenarios and participated in the validation of approximately 15 to 20 releases per month.',
      p4: 'I have experience with functional, exploratory, integration, and regression testing, acceptance criteria, defect management, Git, Jira, Jenkins, and CI/CD. I also worked with payment systems, Pix Automático, PSPs, and webhooks, collaborating with engineering and product teams from requirement refinement through release validation.'
    },
    skills: {
      label: '// Technologies by context', title: 'Experience, practice, and <span class="text-gradient">learning</span>', subtitle: 'Tools are grouped by usage context, without artificial percentages or proficiency levels.', professional: 'Professional experience', professionalBadge: 'Professional experience', practical: 'Practical projects', practicalBadge: 'Practical project', learning: 'Currently learning', learningBadge: 'Currently learning', professionalAria: 'Technologies used professionally', practicalAria: 'Technologies used in practical projects', learningAria: 'Technologies currently being learned'
    },
    projects: {
      label: '// Technical portfolio', title: 'Practical Projects & <span class="text-gradient">Case Studies</span>', subtitle: 'Demonstration projects covering automation, API testing, CI/CD, and quality strategy, developed to apply QA concepts and good practices.', filterAria: 'Filter projects', filterAll: 'All', filterAutomation: 'Automation', filterApi: 'API', filterCicd: 'CI/CD', filterPerformance: 'Performance', practicalBadge: 'Practical project', inDevelopment: 'In development', planned: 'Planned',
      project1Title: 'Web Automation Framework', project1Desc: 'Demonstration Web automation project using Playwright or Cypress with TypeScript, layered organization, Page Objects, fixtures, reusable data, reports, and CI/CD execution.',
      project2Title: 'API Test Automation', project2Desc: 'Practical API automation project covering HTTP methods, positive and negative scenarios, schema validation, authentication, parameterized data, and automated execution.',
      project3Title: 'CI/CD Quality Pipeline', project3Desc: 'Demonstration project integrating automated tests with GitHub Actions, including suite execution, results publishing, and pipeline blocking on critical failures.',
      project4Title: 'Performance Testing Lab', project4Desc: 'Load testing lab built with k6 to study thresholds, response time, throughput, error rate, and application behavior under different load levels.',
      viewCode: 'View code', viewDocs: 'View documentation', repositoryPending: 'The README and dedicated repository will be published when the project becomes available.'
    },
    artifacts: {
      label: '// Approach evidence', title: 'Demonstration <span class="text-gradient">QA Artifacts</span>', disclaimer: 'The examples below use fictional scenarios and were created exclusively to demonstrate my quality approach. They contain no employer data, code, or confidential information.',
      testCaseTitle: 'Test case — authentication', testCaseSummary: 'Complete scenario with preconditions, data, steps, priority, and expected result.',
      bugTitle: 'Bug report — payment', bugSummary: 'Reproducible record with severity, evidence, and fictional request/response.',
      planTitle: 'Test plan — checkout', planSummary: 'Risk-based strategy including scope, environment, and entry and exit criteria.',
      reportTitle: 'Automation report', reportSummary: 'Fictional example showing how to read results, environment, and execution information.', open: 'Open artifact'
    },
    artifactDetails: {
      demoNotice: 'Fictional example for demonstration purposes.', reportNotice: 'Fictional numbers used only to demonstrate the report structure.',
      testCaseTitle: 'Test case — authentication with valid credentials', bugTitle: 'Approved payment displays a failure message', planTitle: 'Test plan — demonstration checkout', reportTitle: 'Automation report — demonstration run',
      preconditions: 'Preconditions', steps: 'Steps', data: 'Data', expected: 'Expected result', priority: 'Priority', status: 'Status',
      tcPreconditions: 'Active user and login page available in the test environment.', tcSteps: '1. Open login; 2. Enter a valid email and password; 3. Select “Sign in”.', tcData: 'qa.demo@example.test / fictional valid password.', tcExpected: 'Authentication succeeds, a session is created, and the user is redirected to the home area.', high: 'High', ready: 'Ready to run',
      environment: 'Environment', version: 'Version', reproduction: 'Steps to reproduce', actual: 'Actual result', severity: 'Severity', frequency: 'Frequency', evidence: 'Evidence', critical: 'Critical',
      bugPreconditions: 'Cart with a fictional product and an authenticated user.', bugSteps: '1. Open checkout; 2. Select Pix; 3. Confirm the simulated payment; 4. Observe the result.', bugActual: 'The API responds with 200/APPROVED, but the interface displays “Payment not completed”.', bugExpected: 'The interface confirms payment and displays the order identifier.', bugEvidence: 'Fictional interface screenshot and correlated logs.',
      objective: 'Objective', scope: 'Scope', outScope: 'Out of scope', risks: 'Risks', strategy: 'Strategy', testTypes: 'Test types', entry: 'Entry criteria', exit: 'Exit criteria', dependencies: 'Dependencies',
      planObjective: 'Validate critical checkout flows and integration with a fictional payment provider.', planScope: 'Cart, coupon, checkout, Pix, and status callback.', planOutScope: 'Chargebacks, financial reconciliation, and production testing.', planRisks: 'Duplicate charges, lost status updates, and value mismatches.', planStrategy: 'Functional, exploratory, integration, targeted regression testing, and automation of deterministic flows.', planTypes: 'API, Web, integration, regression, and exploratory.', planEntry: 'Available build, stable environment, test data, and reviewed acceptance criteria.', planExit: 'Critical flows approved and no open blocking defects.', planDependencies: 'Fictional PSP sandbox, test data, and test pipeline.',
      total: 'Total tests', passed: 'Passed', failed: 'Failed', skipped: 'Skipped', duration: 'Execution time', browser: 'Browser', date: 'Date', pipeline: 'Pipeline/report', sampleDate: 'Fictional date', unavailable: 'Unavailable — project not published yet.'
    },
    experience: {
      label: '// Career', title: 'Professional <span class="text-gradient">Experience</span>', fullTime: 'Full-time',
      job1Date: 'Jun 2021 – Jun 2026', job1Title: 'Quality Assurance Analyst',
      job1Item1: 'Developed and maintained automated tests with Playwright and TypeScript for APIs and Web/Desktop applications.',
      job1Item2: 'Contributed to maintaining and evolving a suite with more than 600 automated scenarios.',
      job1Item3: 'Participated in validating approximately 15 to 20 releases per month, prioritizing critical flows and regression risks.',
      job1Item4: 'Planned and executed functional, exploratory, integration, and regression testing.',
      job1Item5: 'Validated REST APIs with Postman, analyzing HTTP statuses, payloads, contracts, and business rules.',
      job1Item6: 'Investigated defects and inconsistencies using SQL, logs, and technical evidence.',
      job1Item7: 'Participated in refinements and defined acceptance criteria with engineering and product teams.',
      job1Item8: 'Worked with payment flows, Pix Automático, PSPs, and webhooks.',
      job1Item9: 'Used Git for project versioning and ran tests in CI/CD flows with Jenkins.',
      job2Date: 'Jan 2021 – May 2021', job2Title: 'Mid-Level Support Analyst',
      job2Item1: 'Provided technical support and investigated customer-reported problems.', job2Item2: 'Analyzed inconsistencies using SQL.', job2Item3: 'Logged incidents, problems, and improvement requests in Jira.', job2Item4: 'Participated in defect triage and review meetings.', job2Item5: 'Documented scenarios and evidence to support technical investigations.',
      job3Date: 'Sep 2019 – Dec 2020', job3Title: 'Junior Support Analyst',
      job3Item1: 'Supported customers by email and chat.', job3Item2: 'Configured and supported pixels, webhooks, and platform products.', job3Item3: 'Performed initial problem analysis and escalated issues to technical teams.', job3Item4: 'Developed knowledge of business rules and user experience.'
    },
    mindset: {
      label: '// Process', title: 'How I approach <span class="text-gradient">quality</span>',
      step1Title: 'Understand', step1Desc: 'I analyze requirements, user stories, acceptance criteria, integrations, and risks before defining tests.',
      step2Title: 'Plan strategically', step2Desc: 'I organize the strategy based on risk, prioritizing critical flows, negative scenarios, boundaries, and integration points.',
      step3Title: 'Automate thoughtfully', step3Desc: 'I automate repetitive, critical, and deterministic scenarios while keeping exploratory tests and subjective validations in the manual approach.',
      step4Title: 'Integrate early', step4Desc: 'I aim to integrate automated validations into the pipeline during the early delivery stages, running different suites according to risk and the development phase.',
      step5Title: 'Monitor and improve', step5Desc: 'I review execution results, recurring defects, and team feedback to identify opportunities to improve coverage and the quality process.'
    },
    contact: {
      label: '// Contact', title: 'Let’s <span class="text-gradient">talk?</span>', subtitle: 'For opportunities, projects, or exchanging quality experiences, choose your preferred channel.', email: 'Email', resume: 'Resume', downloadPdf: 'Download PDF', note: 'The form was removed so the site does not rely on the visitor’s email application or store data without a secure integration.'
    },
    footer: { built: 'Built by <strong>Douglas Zulim</strong> · 2026', note: 'Professional content presented with context and transparency.' }
  }
};

window.I18n = I18n;
