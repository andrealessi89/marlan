"use client";
import { useState, useEffect } from "react";

export function useExibirPrecos(pollInterval = 10000) {
  const [showPrices, setShowPrices] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const fetchConfig = async () => {
      try {
        const res = await fetch("/api/configuracoes", { cache: "no-store" });
        const data = await res.json();
        console.log(data);
        if (!mounted) return;
        setShowPrices(data[0]?.exibir_precos === 1);
      } catch {
        // falha silênciosa
      }
    };

    fetchConfig();
    const iv = setInterval(fetchConfig, pollInterval);
    return () => { mounted = false; clearInterval(iv); };
  }, [pollInterval]);

  return showPrices;
}
