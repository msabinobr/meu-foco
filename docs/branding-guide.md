# Guia de Branding: Meu Foco

Este guia documenta a identidade visual e o tom de voz para o aplicativo Meu Foco, um aplicativo de produtividade e bem-estar para TDAH.

## 1. Arquétipos

A marca Meu Foco se baseia na combinação de dois arquétipos principais:

*   **Mago:** Representa transformação, conhecimento, visão e a capacidade de tornar o complexo em simples. A "magia" de encontrar foco e clareza.
*   **Herói:** Representa superação, coragem, determinação e a jornada de conquista pessoal ao enfrentar desafios (como o TDAH).

## 2. Paleta de Cores

A paleta de cores foi escolhida para ser vibrante, acolhedora e estimular a criatividade e o bem-estar.

*   **Cor de Fundo Principal (Escuro):**
    *   `#1A202C` (configurada como `brand-dark-bg` no Tailwind)
*   **Cores Primárias (Usadas em gradientes e destaques):**
    *   Roxo: `#6B46C1` (configurada como `brand-purple` no Tailwind)
    *   Rosa: `#ED64A6` (configurada como `brand-pink` no Tailwind)
    *   Azul: `#4299E1` (configurada como `brand-blue` no Tailwind)
*   **Cor de Texto Principal (sobre fundo escuro):**
    *   `#EDEDED` (Definida no `globals.css` para o `body`)
*   **Outras Cores:**
    *   Cores para acentos, alertas, sucesso podem ser definidas conforme a necessidade, mas devem complementar a paleta principal.

## 3. Tipografia

*   **Fonte Principal:** Geist (fornecida pelo Next.js, configurada como `font-sans` no Tailwind, usando `var(--font-geist-sans)`)
*   **Tamanhos de Fonte Sugeridos:**
    *   Títulos Principais (ex: `<h1>` no `BrandingHeader` usa `text-4xl`): `24px` (Pode ser `text-2xl` do Tailwind. Ajustar conforme necessário.)
    *   Corpo de Texto (ex: `<p>`): `16px` (Tailwind `text-base`)
    *   Detalhes e Textos Menores: `14px` (Tailwind `text-sm`)

## 4. Tom de Voz

O tom de voz do Meu Foco deve ser:

*   **Lúdico:** Usar uma linguagem leve, divertida e que engaje o usuário de forma positiva.
*   **Motivacional:** Incentivar o usuário em sua jornada, reconhecendo seus esforços e progressos.
*   **Amigável e Acolhedor:** Criar um ambiente seguro e de confiança, como um amigo que está ali para ajudar.
*   **Capacitador:** Focar no potencial do usuário e em como o app pode ajudá-lo a alcançar seus objetivos.

**Exemplos de Frases:**

*   "Ei, Mago! Pronta para sua próxima missão de foco?"
*   "Hora de encantar seus objetivos e transformá-los em realidade!"
*   "Parabéns, Herói(ína)! Mais uma jornada concluída com maestria! ⭐"
*   "Vamos desbloquear seu superpoder de concentração?"
*   "Transforme o caos em conquistas épicas hoje!"
*   "Psiu... sua varinha de foco está te esperando!"

## 5. Elementos Visuais Adicionais

*   **Emojis:** Usar emojis de forma estratégica para reforçar o tom lúdico e os arquétipos (ex: 🧙‍♂️, 🦄, ⭐, ✨, 🎯, 🚀).
*   **Animações Sutis:**
    *   Confetti ou brilhos em momentos de conquista (ex: completar uma tarefa importante).
    *   Botões com microinterações em hover/focus (ex: brilho sutil, leve aumento de tamanho).
*   **Ilustrações e Ícones:** (A serem definidos) Devem seguir o estilo lúdico e mágico, com cores da paleta.

Este guia deve ser consultado sempre que novos componentes, telas ou comunicações forem criados para o Meu Foco.
