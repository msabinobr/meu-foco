// src/components/BrandingHeader.tsx
import React from 'react';

const BrandingHeader = () => {
  return (
    <header className="py-6 px-4 text-center"> {/* Ajuste o padding conforme necessário */}
      <h1 className="font-sans text-4xl font-bold text-brand-purple">
        Meu Foco <span role="img" aria-label="mago emoji">🧙‍♂️</span>
      </h1>
      <p className="font-sans text-lg text-gray-300 mt-1"> {/* Cor do slogan ajustável */}
        Transforme caos em conquistas!
      </p>
    </header>
  );
};

export default BrandingHeader;
