# Douglas Zulim — QA Engineer Portfolio

Portfólio bilíngue de Douglas Zulim, QA Engineer com cinco anos de experiência em automação de testes, APIs, integrações e investigação de defeitos.

Site publicado: [douglaszu.github.io](https://douglaszu.github.io/)

## Conteúdo do portfólio

- apresentação profissional em português e inglês;
- métricas de atuação apresentadas com contexto de contribuição em equipe;
- tecnologias separadas em experiência profissional, projetos práticos e aprendizado;
- projetos de QA identificados como demonstrativos e com status real;
- artefatos fictícios de caso de teste, bug, plano de teste e relatório de automação;
- histórico profissional em tópicos objetivos;
- contatos diretos e currículo em PDF;
- tema claro/escuro e idioma persistidos no `localStorage`;
- navegação por teclado, foco visível e suporte a `prefers-reduced-motion`;
- metadados Open Graph, Twitter Card, canonical, favicon e schema `Person`.

## Decisões de transparência

Os quatro projetos de QA estão marcados como em desenvolvimento ou planejados. Em 21/07/2026, o perfil público `DouglasZu` possuía apenas os repositórios `DouglasZu.github.io` e `site-Imobiliaria`; por isso, os cards não apontam para a página geral do GitHub nem simulam repositórios específicos.

O formulário de contato anterior abria um `mailto:` e não oferecia confirmação confiável de envio. Ele foi removido. O site mantém e-mail, LinkedIn, GitHub e currículo como canais diretos, sem armazenar dados ou expor tokens de terceiros.

As métricas do artefato de automação são explicitamente fictícias e servem somente para demonstrar a estrutura de um relatório.

## Estrutura principal

```text
├── assets/
│   ├── favicon.svg
│   └── social-card.png
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── animations.css
│   ├── components.css
│   ├── sections.css
│   ├── redesign.css
│   └── qa-update.css
├── docs/
│   └── RESUMO_ALTERACOES.md
├── js/
│   ├── animations.js
│   ├── filters.js
│   ├── i18n.js
│   ├── main.js
│   ├── navigation.js
│   ├── particles.js
│   └── theme.js
├── output/pdf/
│   └── curriculo-douglas-zulim.pdf
├── scripts/
│   └── generate_resume.py
└── index.html
```

## Testar localmente

O projeto não possui etapa de build.

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Abra `http://127.0.0.1:4173/` e valide:

1. troca entre português e inglês, incluindo `lang`, tooltips e rótulos acessíveis;
2. persistência de idioma e tema após recarregar;
3. menu e rolagem em 320px, 375px, 768px, 1024px e desktop;
4. abertura e fechamento dos quatro diálogos por mouse e teclado;
5. filtros de projetos;
6. download do currículo;
7. console sem erros.

Para regenerar o currículo, instale `reportlab` e execute:

```powershell
python -m pip install reportlab
python scripts/generate_resume.py
```

## Publicar no GitHub Pages

As alterações estão na branch `agent/portfolio-qa-truthful-update`. Revise e aprove antes de publicar.

1. Faça commit e push da branch.
2. Abra um pull request para `main`.
3. Revise o conteúdo e aprove o merge.
4. Em **Settings → Pages**, selecione **Deploy from a branch**, branch `main` e pasta `/ (root)`.
5. Aguarde a publicação em `https://douglaszu.github.io/`.

Nenhum deploy ou merge é executado automaticamente por este projeto.

## Tecnologias do site

HTML5 semântico, CSS e JavaScript puros, sem framework e sem dependências de runtime.
