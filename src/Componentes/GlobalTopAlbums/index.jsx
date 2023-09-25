import React, { useEffect, useState } from 'react';
import fetchLastFmData from '../../services'; // Importe a função fetchLastFmData
import style from './style.module.css'; // Importe seus estilos
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const DetailsAlbumModal = styled.div`
  position: fixed;
  background-color: #212529f0;
  overflow-y: scroll;
  height: 50vh;
  z-index: 1;
  padding: 30px;
  left: 35%;
  top: 20%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  color: white;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #212529f0;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }
`;

const ButtonExite = styled.button`
  background-color: transparent;
  width: 14%;
  margin-top: -29px;
  display: flex;
  margin-left: -30px;
  justify-content: flex-start;
  align-items: flex-start;
  border: none;
  position: fixed;
  padding: 0;
  border-radius: 5px;
`;

function TopBrazilianAlbums() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumInfo, setAlbumInfo] = useState(null);

  useEffect(() => {
    async function getTopBrazilianAlbums() {
      try {
        // Faz a chamada à API do Last.fm para buscar as principais faixas no Brasil
        const response = await fetchLastFmData('geo.gettoptracks', { country: 'brazil' });

        if (response && response.tracks && response.tracks.track) {
          const topTracks = response.tracks.track;

          // Cria um conjunto (set) para armazenar os álbuns únicos
          const uniqueAlbums = new Set();

          // Para cada faixa, busca o álbum ao qual ela pertence
          for (const track of topTracks) {
            const albumInfoResponse = await fetchLastFmData('track.getInfo', {
              artist: track.artist.name,
              track: track.name,
            });

            if (
              albumInfoResponse &&
              albumInfoResponse.track &&
              albumInfoResponse.track.album
            ) {
              const album = albumInfoResponse.track.album;
              uniqueAlbums.add(album);
            }
          }

          // Converte o conjunto de álbuns de volta em uma matriz
          const uniqueAlbumsArray = Array.from(uniqueAlbums);
          setAlbums(uniqueAlbumsArray);
        }
      } catch (error) {
        console.error('Erro ao buscar os álbuns do Brasil:', error);
      }
    }

    getTopBrazilianAlbums();
  }, []);

  useEffect(() => {
    async function fetchAlbumInfo() {
      try {
        if (selectedAlbum) {
          const response = await fetchLastFmData('album.getinfo', {
            artist: selectedAlbum.artist,
            album: selectedAlbum.name,
          });

          if (response && response.album && response.album.tracks) {
            setAlbumInfo(response.album);
          } else {
            return "Nenhum detalhe do álbum encontrado";
          }
        } else {
          return "Nenhum álbum selecionado";
        }
      } catch (error) {
        console.error('Erro ao buscar informações do álbum:', error);
      }
    }

    fetchAlbumInfo();
  }, [selectedAlbum]);

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
  };

  const handleCloseModal = () => {
    setSelectedAlbum(null);
    setAlbumInfo(null);
  };

  return (
    <div>
      <ul className={style.listaAlbuns}>
        <h2 className='h1 w-100'>Albuns com as principais musicas mais ouvidas no Brasil</h2>
        {albums.map((album) => (
          <div
            className={style.album}
            key={album.name}
            onClick={() => handleAlbumClick(album)}
          >
            <h2>{album.name}</h2>
            <p>Artista: {album.artist}</p>
            <div className={style.albumImageWrapper}>
              <img src={album.image[2]['#text']} alt={album.name} />
              <div className={style.playIcon}>
                <i className="fas fa-3x fa-play-circle"></i>
              </div>
            </div>
          </div>
        ))}
      </ul>

      {selectedAlbum && (
        <DetailsAlbumModal>
          <ButtonExite onClick={handleCloseModal}>
            <i className="fa-solid fa-2x fa-circle-xmark"></i>
          </ButtonExite>
          {albumInfo ? (
            <div>
              <h3>Detalhes do Álbum</h3>
              <p>Nome: {albumInfo.name}</p>
              <p>Artista: {albumInfo.artist}</p>
              <p>Ouvintes: {albumInfo.listeners}</p>
              <h3>Músicas</h3>
              <ul>
                {Array.isArray(albumInfo.tracks.track) ? (
                  albumInfo.tracks.track.map((track) => (
                    <li key={track.name}>{track.name}</li>
                  ))
                ) : (
                  <p>Nenhuma informação de faixa disponível.</p>
                )}
              </ul>
            </div>
          ) : (
            <p>Carregando informações do álbum...</p>
          )}
        </DetailsAlbumModal>
      )}
    </div>
  );
}

export default TopBrazilianAlbums;
