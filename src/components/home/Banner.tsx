import React, { useState, useEffect } from 'react';

function Banner() {
  const messages = [
    {__html: "O estoque é limitado e a seleção das peças não garantem estoque"},
    {__html: "<strong>Benefícios do bazar:</strong> nas compras acima de R$ 1.000,00 você concorre à um passaporte para o Beto Carreiro"},
    {__html: "<strong>Benefícios do bazar:</strong> desconto de 5% nas compras acima de R$ 2.000,00"},
    {__html: "<strong>Benefícios do bazar:</strong> desconto de 10% nas compras acima de R$ 10.000,00"}
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMessage((prevMessage) => (prevMessage + 1) % messages.length);
    }, 4000); // Muda a mensagem a cada 4 segundos

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
  }, []);

  return (
    <div className="mt-8">
      <img
        alt="Banner"
        className="w-full object-cover md:rounded-lg md:shadow-lg md:object-cover md:object-center"
        height="200"
        src="https://images.tcdn.com.br/img/img_prod/1049260/1711972478_bannerdesk.jpg"
        style={{ aspectRatio: "800/200", objectFit: "cover" }}
        width="800"
      />
      <div className="text-center p-3 bg-white text-sm md:text-base" dangerouslySetInnerHTML={messages[currentMessage]} />
    </div>
  );
}

export default Banner;
