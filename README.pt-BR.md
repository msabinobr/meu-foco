# FocusFlow: Seu Aplicativo Companheiro para TDAH

## Visão Geral

FocusFlow é um aplicativo baseado em React, projetado para auxiliar indivíduos, especialmente aqueles com TDAH, no gerenciamento da organização, foco e bem-estar. Ele integra um assistente pessoal de IA para fornecer suporte abrangente.

## Funcionalidades

FocusFlow oferece um conjunto abrangente de ferramentas para auxiliar no dia a dia:

*   **Painel de Controle:** Seu hub central para uma visão geral rápida de tarefas, estatísticas e mensagens motivacionais.
*   **Jogo de Respiração:** Exercícios de respiração guiados com animações, sons e acompanhamento de progresso para ajudar você a se recentrar e relaxar.
*   **Pomodoro Mágico:** Um cronômetro Pomodoro personalizável para aumentar o foco, com associação de tarefas e estatísticas de sessão.
*   **Quadro de Missões (Tarefas):** Um sistema robusto de gerenciamento de tarefas que permite adicionar, editar, filtrar e acompanhar seus afazeres.
*   **Como Estou (Monitor de Bem-estar):** Uma interface simples para registrar e monitorar seu humor e bem-estar diário.
*   **Diário Mágico:** Um espaço privado para registrar seus pensamentos, com potencial para tags e categorização.
*   **Assistente de IA:** Uma interface de chat interativa com um assistente virtual que fornece sugestões, responde a perguntas e ajuda na organização.
*   **Jornada Encantada (Monitor de Progresso):** Visualize seu progresso geral no aplicativo como uma "jornada" envolvente, possivelmente com conquistas e níveis.

## Componentes Chave e Estrutura do Código

O aplicativo é construído com React e organizado em vários componentes chave:

*   **`Layout.js`:** Este é o componente principal de layout, responsável pela estrutura geral da página, incluindo a barra de navegação lateral, cabeçalho e rodapé. Ele também gerencia o estado do usuário, carregamento de dados e interações da barra lateral (expandida/recolhida).
*   **`BreathingGamePage.js`:** Implementa o jogo de respiração interativo. Este componente lida com o cronômetro, animações, sons binaurais, seleção de técnicas de respiração, estatísticas da sessão e histórico.
*   **`InteractiveAgent.js`:** Alimenta o assistente de IA. Inclui a interface de chat, sugestões inteligentes, capacidade de entrada de texto/voz e histórico de mensagens.

## Tecnologias Utilizadas

O aplicativo utiliza uma stack de desenvolvimento web moderna:

*   **React:** A biblioteca principal para construir a interface do usuário.
*   **react-router-dom:** Para lidar com navegação e roteamento entre diferentes páginas/seções.
*   **lucide-react:** Usado para incorporar uma biblioteca de ícones vetoriais.
*   **Componentes de UI Personalizados:** Provavelmente da própria biblioteca do aplicativo ou de um framework como Tailwind UI, incluindo:
    *   `Card`, `CardContent`, `CardHeader`, `CardTitle`
    *   `Button`, `Badge`, `Select`, `Tabs`, `Input`, `Progress`
    *   `Sidebar`, `SidebarContent`, `SidebarGroup`
*   **recharts:** Uma biblioteca para criar gráficos e visualizações de dados (por exemplo, para o progresso do jogo de respiração).
*   **date-fns:** Uma biblioteca utilitária para manipular e formatar datas.

## Fluxo Geral e Funcionalidades Principais

O aplicativo é projetado para interação intuitiva:

*   **Layout Principal e Navegação:** O componente `Layout.js` fornece uma estrutura consistente com uma barra lateral para fácil navegação entre as diferentes seções do aplicativo usando `react-router-dom`. Informações específicas do usuário, como avatar, nível e pontos, também são exibidas neste layout.
*   **Jogo de Respiração:** Os usuários podem acessar a `BreathingGamePage` para selecionar várias técnicas de respiração, iniciar sessões cronometradas, seguir animações visuais e ouvir sons binaurais. As estatísticas da sessão são registradas para acompanhamento do progresso.
*   **Assistente de IA:** O componente `InteractiveAgent` oferece uma interface de chat para os usuários se comunicarem com o assistente de IA por texto ou voz. O assistente fornece sugestões e respostas para ajudar na organização e outras tarefas.
*   **Gerenciamento de Dados do Usuário:** O aplicativo lida com dados específicos do usuário, incluindo informações de perfil, progresso em atividades, várias estatísticas e conquistas, gerenciados por meio de uma entidade `User`.
*   **Componentes de UI:** Um rico conjunto de componentes de UI personalizados e baseados em bibliotecas é usado em todo o aplicativo para criar uma experiência visualmente atraente e interativa.
