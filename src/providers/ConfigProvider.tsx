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

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/configuracoes', { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        // Supondo que o endpoint retorne um array com apenas 1 registro
        const novoValor = data[0]?.exibir_precos === 1 || data[0]?.exibir_precos === true;
        setExibirPrecos(novoValor);
      }
    } catch (error) {
      console.error('Erro ao carregar configuração:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Busca a configuração inicialmente
    fetchConfig();

    // Configura um polling para atualizar a cada 10 segundos (10000ms)
    const intervalId = setInterval(() => {
      fetchConfig();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <ConfigContext.Provider value={{ exibirPrecos, loading }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
