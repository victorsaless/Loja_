import axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import { ExitToApp, AddAPhoto } from '@mui/icons-material';
import ActionAreaCard from '../components/UserPosts';
import Navbar from "../components/NavBar";

const ProfileScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Favoritos');
  const [profileImage, setProfileImage] = useState('');
  const [profileInfo, setProfileInfo] = useState([]);

  const handleTabClick = useCallback((tab) => {
    setSelectedTab(tab);
  }, [setSelectedTab]);

  const uploadProfileImage = async (event) => {
    try {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      formData.append('upload_preset', 'it9xzzmf');

      const response = await axios.post('https://api.cloudinary.com/v1_1/dyumqvquz/image/upload', formData);

      const imageUrl = response.data.secure_url;
      setProfileImage(imageUrl);
      localStorage.setItem('profileImage', imageUrl);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
    }
  };


  useEffect(() => {
    const storedImageUrl = localStorage.getItem('profileImage');
    if (storedImageUrl) {
      setProfileImage(storedImageUrl);
    }
  }, []);


  async function setProfile() {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get('http://localhost:3000/admin/users', {
        headers: token && { Authorization: `Bearer ${token}` },
      });

      console.log(response.data);
      setProfileInfo(response.data.user);

    } catch (error) {
      console.error('Erro ao obter dados do perfil:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await setProfile();
    };
    fetchData();
  }, []);



  const tamanhoFavoritos = profileInfo.favoritos ? profileInfo.favoritos.length : 0;
  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <Navbar />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '5rem',
        backgroundColor: '#fffaf7',
      }}>
        <div className="card" style={{
          width: '23rem',
          height: '25rem',
          borderRadius: '5%',
          background: 'linear-gradient(180deg, #000 0%, #471212 40%)',
          marginTop: '-15rem',
          marginLeft: '3rem',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              marginBottom: '1%',
              width: '5vw',
              height: '8vh',
              borderRadius: '50%',
              left: '12%',
              transform: 'translate(-50%, -50%)',
              top: '4rem',
            }}>
              <img
                className="profile-image"
                src={profileImage || 'caminho/para/imagem/do/usuario.jpg'}
                alt="Foto de Perfil do Usuário"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
              <div style={{ display: "inline-grid" }}>
                <h1 style={{ fontWeight: 'bold', }}>{profileInfo.name}</h1>
                <br />
                <h3>Email: {profileInfo.email}</h3>
                <br />
                <br />
                <h3>Quantidade de favoritos: {tamanhoFavoritos}</h3>
                <br />
                <h3> Data de criação: {profileInfo.createdAt}</h3>
                <div style={{
                  display: 'flex',
                  marginTop: '5%',
                }}>
                </div>
                <br />
                <ExitToApp onClick={() => handleTabClick('Sair')} />
                <label htmlFor="upload-photo" style={{
                  cursor: 'pointer',
                  position: 'relative',
                  bottom: '1vh',
                  right: '-6vh',
                  transform: 'translate(-50%, -50%)',
                }}>
                  <AddAPhoto style={{
                    fontSize: '2rem',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '-0.1rem',
                    left: 'calc(50% + 5rem)',
                    transform: 'translate(-50%, -50%)',
                  }} />
                  <input id="upload-photo" type="file" onChange={uploadProfileImage} style={{ display: 'none' }} />
                </label>
              </div>
            </div>
          </div>
        </div>
        <ActionAreaCard />
      </div >
    </div >
  );
};

export default ProfileScreen;