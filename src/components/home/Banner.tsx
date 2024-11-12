import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaVideo, FaRuler } from 'react-icons/fa';

function Banner() {
  const [bannerUrl, setBannerUrl] = useState('/images/banner.jpg'); // URL padrão
  const [loading, setLoading] = useState(true);

  const messages = [
    { __html: "O estoque é limitado e a seleção das peças não garantem estoque" },
    { __html: "<strong>Benefícios do bazar:</strong> nas compras acima de R$ 1.000,00 você concorre à um passaporte para o Beto Carrero" },
    { __html: "<strong>Benefícios do bazar:</strong> desconto de 5% nas compras acima de R$ 2.000,00" },
    { __html: "<strong>Benefícios do bazar:</strong> desconto de 10% nas compras acima de R$ 3.000,00" }
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

 
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
            console.log(data.url)
            setBannerUrl(data.url || '/images/banner.jpg');
          }
        } catch (error) {
          console.error("Erro ao carregar o banner:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBannerUrl();
    }
  }, []); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMessage((prevMessage) => (prevMessage + 1) % messages.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mt-20">
      {!loading && (
        <img
          alt="Banner"
          className="w-full object-cover md:rounded-lg md:shadow-lg md:object-cover md:object-center mt10"
          height="200"
          src={bannerUrl}
          style={{ aspectRatio: "800/200", objectFit: "cover" }}
          width="800"
        />
      )}
      <div className="text-center p-3 bg-white text-sm md:text-base" dangerouslySetInnerHTML={messages[currentMessage]} />
      <div className="text-center pt-5" style={{ fontSize: '12px' }}>
        <strong>Formas de Pagamento: </strong>Pix, Dinheiro, Cartão de Débito e Crédito em até 6x sem juros com Parcelas mínima de R$50,00
      </div>
      <div className="text-center mt-4">
        <Link href="https://www.youtube.com/watch?v=cpK_BcY2cVk">
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <FaVideo className="mr-2" />
            Aprenda a usar o catálogo
          </button>
        </Link>
        <Link href="https://grupomarlan.com.br/bazar/TabelaDeMedidas.jpg" target='_blank'>
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
