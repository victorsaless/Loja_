import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from 'axios';

export default function ActionAreaCard() {
  const [profileInfoPosts, setProfileInfoPosts] = useState([]);

  async function setProfilePosts() {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get('http://localhost:3000/post/meus-posts', {
        headers: token && { Authorization: `Bearer ${token}` },
      });


      setProfileInfoPosts(response.data);

    } catch (error) {
      console.error('Erro ao obter dados do perfil:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await setProfilePosts();
    };
    fetchData();
  }, []);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
