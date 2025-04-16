"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface ConfigContextProps {
  exibirPrecos: boolean;
  loading: boolean;
}

const ConfigContext = createContext<ConfigContextProps>({
  exibirPrecos: true,
  loading: true,
});

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [exibirPrecos, setExibirPrecos] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/configuracoes');
        if (response.ok) {
          const data = await response.json();
          setExibirPrecos(data[0].exibir_precos === 1 || data[0].exibir_precos === true);
        }
      } catch (error) {
        console.error('Erro ao carregar configuração:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ exibirPrecos, loading }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
