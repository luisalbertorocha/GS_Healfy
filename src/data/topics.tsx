// src/data/topics.ts

export type ODSId = "ODS4" | "ODS8" | "ODS9" | "ODS10";

export interface Topic {
  id: string;
  ods: ODSId;
  title: string;
  description: string;
  content: string;
}

export const topics: Topic[] = [
  // ---------------- ODS 4 – Educação de Qualidade ----------------
  {
    id: "ods4_trilhas_personalizadas",
    ods: "ODS4",
    title: "Trilhas de estudo personalizadas",
    description:
      "Como o app organiza o aprendizado de acordo com o ritmo e objetivo do usuário.",
    content: `A ODS 4 fala sobre garantir educação de qualidade para todos. 
No aplicativo, isso aparece na forma de trilhas de estudo personalizadas, 
que organizam os conteúdos por nível de dificuldade, tema e objetivo de carreira. 
Assim, o usuário consegue visualizar o que já concluiu, o que ainda falta 
e qual o próximo passo recomendado, evitando dispersão e aumentando a 
efetividade do estudo diário.`,
  },
  {
    id: "ods4_acessibilidade_conteudo",
    ods: "ODS4",
    title: "Acessibilidade e formatos de conteúdo",
    description:
      "Textos, vídeos e materiais adaptados para diferentes perfis de estudantes.",
    content: `Educação de qualidade também passa por formatos acessíveis. 
O app pode oferecer conteúdos em texto, vídeo curto, resumo em tópicos 
e materiais para revisão rápida. Isso permite que alunos com rotinas 
diferentes encontrem o formato que mais funciona para o seu dia a dia, 
inclusive em momentos de estudo rápido, como deslocamentos ou intervalos 
de trabalho.`,
  },
  {
    id: "ods4_acompanhamento_progresso",
    ods: "ODS4",
    title: "Acompanhamento de progresso e feedback",
    description:
      "Linha do tempo do aprendizado e indicadores simples de evolução.",
    content: `Acompanhar o progresso ajuda o aluno a manter motivação. 
Com uma barra de progresso ou linha do tempo, o usuário enxerga quantos 
módulos já concluiu, quantos estudos fez na semana e quais competências 
está desenvolvendo. Essa visualização conecta a rotina de estudo com 
metas concretas, aproximando o estudante de uma educação mais contínua 
e estruturada.`,
  },

  // ---------------- ODS 8 – Trabalho Decente e Crescimento Econômico ----------------
  {
    id: "ods8_habilidades_futuro",
    ods: "ODS8",
    title: "Habilidades para o futuro do trabalho",
    description:
      "Desenvolver competências ligadas à empregabilidade e atualização profissional.",
    content: `A ODS 8 incentiva trabalho decente e crescimento econômico. 
No aplicativo, isso se traduz em trilhas focadas em habilidades demandadas 
pelo mercado, como tecnologia, comunicação, pensamento crítico e 
resolução de problemas. Ao organizar conteúdos voltados a essas 
competências, o app ajuda o usuário a se manter competitivo e preparado 
para novas oportunidades de emprego.`,
  },
  {
    id: "ods8_planejamento_carreira",
    ods: "ODS8",
    title: "Planejamento de carreira com metas de estudo",
    description:
      "Conectar o plano de estudos com objetivos profissionais reais.",
    content: `O aplicativo pode funcionar como um “planner” de carreira, 
onde o usuário define objetivos profissionais (como mudar de área, 
conseguir promoção ou primeiro emprego) e associa esses objetivos a 
módulos de estudo específicos. Dessa forma, cada curso ou artigo deixa 
de ser algo isolado e passa a fazer parte de um plano mais estratégico.`,
  },
  {
    id: "ods8_rotina_estudo_trabalho",
    ods: "ODS8",
    title: "Equilíbrio entre estudo e rotina de trabalho",
    description:
      "Ferramentas para encaixar o aprendizado na realidade do usuário.",
    content: `Muitas pessoas trabalham e estudam ao mesmo tempo. 
O app pode contribuir para a ODS 8 ao propor rotinas de estudo realistas, 
com lembretes, metas diárias pequenas e conteúdos curtos. Essa abordagem 
ajuda o usuário a manter consistência, mesmo com uma agenda cheia, 
evitando frustração e abandonos no meio do caminho.`,
  },

  // ---------------- ODS 9 – Indústria, Inovação e Infraestrutura ----------------
  {
    id: "ods9_tecnologia_acesso",
    ods: "ODS9",
    title: "Tecnologia como infraestrutura de aprendizagem",
    description:
      "Uso do app como base tecnológica para organizar o conhecimento.",
    content: `A ODS 9 fala sobre inovação e infraestrutura. 
O aplicativo funciona como uma infraestrutura digital de aprendizagem, 
reunindo cursos, artigos, trilhas e indicadores em um único lugar. 
Isso facilita o acesso ao conhecimento e reduz a necessidade de o usuário 
se perder entre várias plataformas diferentes.`,
  },
  {
    id: "ods9_inovacao_metodologias",
    ods: "ODS9",
    title: "Inovação em metodologias de estudo",
    description:
      "Gamificação, desafios e lembretes inteligentes como apoio ao aprendizado.",
    content: `Inovar não é só criar algo totalmente novo, mas melhorar a 
forma como o usuário aprende. O app pode usar elementos de gamificação 
(pontos, badges, desafios semanais) e lembretes inteligentes para manter 
o engajamento. Essas estratégias tornam o processo de estudo mais leve 
e conectado com a realidade digital do usuário.`,
  },
  {
    id: "ods9_dados_para_melhoria",
    ods: "ODS9",
    title: "Uso de dados para melhoria contínua",
    description:
      "Analisar o comportamento de estudo para sugerir melhorias.",
    content: `Ao observar quais conteúdos o usuário acessa, quanto tempo 
estuda e quais temas tem mais dificuldade, o aplicativo pode gerar 
recomendações mais assertivas. Isso cria um ciclo de melhoria contínua, 
onde a tecnologia apoia o aprendizado de forma cada vez mais personalizada 
e alinhada com a ODS 9.`,
  },

  // ---------------- ODS 10 – Redução das Desigualdades ----------------
  {
    id: "ods10_acesso_conteudo",
    ods: "ODS10",
    title: "Acesso democrático a conteúdos de qualidade",
    description:
      "Disponibilizar conhecimento de forma simples e organizada.",
    content: `A ODS 10 trata da redução das desigualdades. 
Um aplicativo de estudos pode contribuir oferecendo conteúdos 
gratuitos ou acessíveis, organizados de forma clara, permitindo que 
pessoas de diferentes contextos tenham acesso a materiais que 
ajudem na sua formação e na sua trajetória profissional.`,
  },
  {
    id: "ods10_flexibilidade_estudo",
    ods: "ODS10",
    title: "Flexibilidade para diferentes realidades",
    description:
      "Permitir que cada usuário estude no seu tempo e do seu jeito.",
    content: `Nem todo mundo consegue estudar longas horas. 
Por isso, o app pode disponibilizar microconteúdos, trilhas curtas e 
recursos de revisão rápida. Essa flexibilidade é importante para incluir 
pessoas que conciliam trabalho, família e estudo, reduzindo barreiras 
de tempo e contexto social.`,
  },
  {
    id: "ods10_inclusao_publicos_vulneraveis",
    ods: "ODS10",
    title: "Inclusão de públicos vulneráveis",
    description:
      "Pensar em linguagem simples, exemplos práticos e acessibilidade.",
    content: `A redução das desigualdades também passa por linguagem e design. 
O aplicativo pode usar textos claros, exemplos práticos e interface simples, 
além de se preocupar com acessibilidade (tamanho de fonte, contraste, etc.). 
Isso torna o conhecimento mais amigável para quem está retomando os estudos 
ou não está acostumado com plataformas digitais.`,
  },
];
