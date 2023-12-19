import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/NavBar';

const Favoritos = () => {
  const [favoritedCards, setFavoritedCards] = useState([]);

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/fav/favoritos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.data) {
          throw new Error('Erro ao buscar favoritos');
        }

        setFavoritedCards(response.data);
      } catch (error) {
        console.error('Erro ao buscar favoritos', error);
      }
    };

    fetchFavoritos();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        {favoritedCards.map((card, index) => (
          <div key={index} className="favorito-card">
            <img src={card.imageURL} alt={card.productName} />
            <p>{card.productName}</p>
            <p>{card.productPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favoritos;
