import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaVideo, FaRuler } from 'react-icons/fa';
import axios from 'axios';

function Banner() {
  const [bannerUrl, setBannerUrl] = useState('/images/banner.jpg'); // URL padrão
  const [loadingBanner, setLoadingBanner] = useState(true);

  // Novo estado para mensagens (as frases serão armazenadas como objetos com __html)
  const [messages, setMessages] = useState<{ __html: string }[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);

  // Busca a URL do banner conforme a página (vip, presencial, etc.)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let tipo = "normal"; 
      if (window.location.pathname === '/vip') tipo = "vip";
      else if (window.location.pathname === '/presencial') tipo = "presencial";

      const fetchBannerUrl = async () => {
        try {
          const response = await fetch(`/api/banners?tipo=${tipo}`);
          if (response.ok) {
            const data = await response.json();
            setBannerUrl(data.url || '/images/banner.jpg');
          }
        } catch (error) {
          console.error("Erro ao carregar o banner:", error);
        } finally {
          setLoadingBanner(false);
        }
      };

      fetchBannerUrl();
    }
  }, []);

  // Busca as mensagens do endpoint /api/frases
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get<{ frase: string }[]>('/api/frases', {
          headers: { 'Cache-Control': 'no-store' }
        });
        // Mapeia os resultados para o formato esperado pelo dangerouslySetInnerHTML
        const formattedMessages = data.map(item => ({
          __html: item.frase
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Erro ao buscar mensagens:", error);
      } finally {
        setLoadingMessages(false);
      }
    };
  
    fetchMessages();
  }, []);
  

  // Configura a rotação das mensagens se houver dados
  useEffect(() => {
    if (messages.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
      }, 4000);
      return () => clearInterval(intervalId);
    }
  }, [messages]);

  return (
    <div className="mt-20">
      {!loadingBanner && (
        <img
          alt="Banner"
          className="w-full object-cover md:rounded-lg md:shadow-lg md:object-cover md:object-center mt10"
          height="200"
          src={bannerUrl}
          style={{ aspectRatio: "800/200", objectFit: "cover" }}
          width="800"
        />
      )}
      {/* Só exibe as mensagens se o carregamento estiver concluído e houver mensagens */}
      {!loadingMessages && messages.length > 0 && (
        <div
          className="text-center p-3 bg-white text-sm md:text-base"
          dangerouslySetInnerHTML={messages[currentMessage]}
        />
      )}
      <div className="text-center pt-5" style={{ fontSize: '12px' }}>
        <strong>Formas de Pagamento: </strong>
        Pix, Dinheiro, Cartão de Débito e Crédito em até 6x sem juros com Parcelas mínima de R$50,00
      </div>
      <div className="text-center mt-4">
        <Link href="https://www.youtube.com/shorts/QvllF6j-fQg">
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <FaVideo className="mr-2" />
            Aprenda a usar o catálogo
          </button>
        </Link>
        <Link href="https://grupomarlan.com.br/bazar/TabelaDeMedidas.jpg" target="_blank">
          <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <FaRuler className="mr-2" />
            Tabela de medidas
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
