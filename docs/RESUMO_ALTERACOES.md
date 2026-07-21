# Resumo da atualização do portfólio de QA

Data da revisão: 21/07/2026

## Problemas encontrados

- título, resumo e chamadas iniciais genéricos para recrutamento em QA;
- alegações sem evidência nos projetos, como redução de 70%, 150 endpoints, 98% de confiabilidade e melhoria de 40%;
- tecnologias apresentadas no mesmo nível de experiência;
- cards de projetos direcionados ao GitHub geral, sem repositórios específicos;
- artefatos apresentados como reais, com empresas, sprint e métricas fictícias sem aviso claro;
- experiência profissional em parágrafos extensos;
- afirmações absolutas sobre todo commit, monitoramento e métricas de produção;
- formulário dependente de `mailto:` e link para Discord;
- menu principal excessivo;
- metadados de compartilhamento incompletos e ausência de imagem social, canonical, favicon e JSON-LD;
- currículo sem arquivo real no projeto.

## Mudanças realizadas

- reescrita do hero e da seção Sobre em português e inglês;
- inclusão das métricas 5 anos, 600+ cenários e 15–20 releases com contexto de contribuição;
- quatro ações no hero: projetos, currículo, LinkedIn e GitHub;
- tecnologias separadas em experiência profissional, projetos práticos e aprendizado;
- projetos reescritos como demonstrativos, sem resultados inventados;
- cards marcados como em desenvolvimento ou planejados, com ações desabilitadas enquanto os repositórios não existem;
- quatro artefatos demonstrativos completos em diálogos nativos acessíveis;
- experiência profissional convertida para tópicos e traduzida integralmente;
- abordagem de qualidade ajustada para afirmações defensáveis;
- remoção do Discord e do formulário `mailto:`;
- redução do menu para Sobre, Projetos, Artefatos, Experiência e Contato;
- refinamentos de espaçamento, tipografia, contraste, foco, tooltips e responsividade;
- suporte explícito a movimento reduzido;
- atualização de SEO e compartilhamento social;
- criação de favicon, imagem social 1200×630 e currículo PDF;
- atualização do README com testes e publicação.

## Decisões técnicas

- HTML, CSS e JavaScript puros foram mantidos para evitar dependências e build desnecessários.
- Os diálogos usam o elemento nativo `dialog`, com fechamento por botão, clique no backdrop e tecla Esc do navegador.
- Nenhum serviço de formulário foi configurado sem endpoint e consentimento do proprietário. Os contatos diretos são a alternativa segura.
- Nenhum card aponta para o GitHub geral. A consulta pública do perfil mostrou que os repositórios de QA ainda não existem.
- O relatório de automação contém números fictícios somente dentro do artefato identificado como demonstrativo.

## Itens que dependem do proprietário

- criar e publicar os quatro repositórios de QA com código, README e documentação;
- substituir os botões desabilitados pelos links específicos quando esses repositórios existirem;
- revisar o currículo e acrescentar formação, certificações, telefone ou outros dados somente se desejar;
- decidir se haverá integração futura com Formspree ou EmailJS e fornecer o endpoint público apropriado;
- executar uma auditoria Lighthouse no ambiente publicado e revisar resultados dependentes de rede/hospedagem.

## Critério de publicação

Não fazer merge na `main` nem deploy sem revisão e aprovação do proprietário.
