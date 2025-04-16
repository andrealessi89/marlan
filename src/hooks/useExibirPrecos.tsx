// src/hooks/useExibirPrecos.tsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export function useExibirPrecos() {
  const [showPrices, setShowPrices] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchConfig = async () => {
      try {
        const { data } = await axios.get<{ exibir_precos: number }[]>(
          "/api/configuracoes",
          {
            headers: {
              "Cache-Control": "no-store, no-cache, must-revalidate",
            },
          }
        );
        console.log("[useExibirPrecos] data:", data);
        if (isMounted) {
          setShowPrices(data[0]?.exibir_precos === 1);
        }
      } catch (err) {
        console.error("Erro ao buscar exibir_precos:", err);
      }
    };

    fetchConfig();

    return () => {
      isMounted = false;
    };
  }, []);

  return showPrices;
}
