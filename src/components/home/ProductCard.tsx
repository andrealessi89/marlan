import React from "react";
import { FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Button } from "@/components/ui/button";

const ProductCard = React.forwardRef(({ image, description }, ref) => {

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(description); // Adicionando o produto ao carrinho
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Mostrar toast de sucesso
    toast.success(`${description.referencia} foi adicionado ao seu carrinho.`, {
      position: "top-right",
      autoClose: 1000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="card p-4 hover:shadow-2xl transition-shadow duration-500 ease-in-out relative overflow-hidden bg-white">
      <img
        ref={ref}
        alt="Product Image"
        className="w-full rounded-lg object-cover transform hover:scale-110 transition-transform duration-500"
        src={image}
      />
      <div className="p-4">
        <h3 className="text-lg text-gray-900 font-semibold mb-1">{description.nome}</h3>
        <div className="text-gray-700 space-y-1">
          <p>Referência: {description.referencia}</p>
          <p>Gênero: {description.genero}</p>
          <p>Tamanho: {description.tamanho}</p>
          <p>Marca: {description.marca}</p>
          <p className="text-gray-900 font-bold">Preço: 
            <span className="text-green-600 text-xl ml-1">{description.preco}</span>
          </p>
        </div>
      </div>
      <button onClick={handleAddToCart} className="bg-white bg-gradient-to-r hover:from-red-600 hover:to-red-700 text-white rounded-full p-3 absolute bottom-4 right-4 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl">
        <FaShoppingCart className="text-red-600 hover:text-white" />
      </button>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
