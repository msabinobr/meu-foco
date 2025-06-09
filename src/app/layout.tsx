import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import BrandingHeader from "../components/BrandingHeader"; // Importa o BrandingHeader
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meu Foco", // Atualizar o título da aplicação
  description: "Transforme caos em conquistas!", // Atualizar a descrição
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR"> {/* Alterar idioma para pt-BR */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`} // Adicionado font-sans para garantir que Geist seja a fonte padrão do corpo
      >
        <BrandingHeader />
        <main className="pt-4 px-4"> {/* Adiciona um pouco de padding ao conteúdo principal */}
          {children}
        </main>
      </body>
    </html>
  );
}
