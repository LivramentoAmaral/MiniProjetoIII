import React, { useEffect, useState } from 'react';
import fetchLastFmData from '../../services';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import style from './style.module.css' 

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

const ButtonExit = styled.button`
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


interface Album {
  name: string;
  image: { '#text': string }[];
  playcount: string;
  artist: {
    name: string;
  };
}


interface AlbumInfo {
  name: string;
  artist: string;
  listeners: string;
  tracks: { track: { name: string }[] };
}

interface LastFmAlbumsProps {
  searchTerm: string;
}



function LastFmAlbums(props: LastFmAlbumsProps) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [albumInfo, setAlbumInfo] = useState<AlbumInfo | null>(null);

  useEffect(() => {
    async function getTopAlbums() {
      try {
        if (props.searchTerm) {
          const artistName = props.searchTerm;
          const response = await fetchLastFmData('artist.gettopalbums', {
            artist: artistName,
          });

          if (response && response.topalbums && response.topalbums.album) {
            const albumsWithImages = response.topalbums.album.filter(
              (album: Album) => album.image[2]['#text'] && album.name != null
            );
            setAlbums(albumsWithImages);
          }
        } else {
          console.error("Nenhum álbum encontrado para o artista");
        }
      } catch (error) {
        console.error('Erro ao buscar os álbuns:', error);
      }
    }

    getTopAlbums();
  }, [props.searchTerm]);

  useEffect(() => {
    async function fetchAlbumInfo() {
      try {
        if (selectedAlbum) {
          const response = await fetchLastFmData('album.getinfo', {
            artist: selectedAlbum.artist.name,
            album: selectedAlbum.name,
          });

          if (response && response.album && response.album.tracks) {
            setAlbumInfo(response.album);
          } else {
            console.error("Nenhum detalhe do álbum encontrado para o artista");
          }
        }
      } catch (error) {
        console.error('Erro ao buscar informações do álbum:', error);
      }
    }

    fetchAlbumInfo();
  }, [selectedAlbum]);

  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album);
  };

  const handleCloseModal = () => {
    setSelectedAlbum(null);
    setAlbumInfo(null);
  };

  return (
    <div>
      <ul className={style.listaAlbuns}>
        {albums.map((album) => (
          <div
            className={style.album}
            key={album.name}
            onClick={() => handleAlbumClick(album)}
          >
            <h2>{album.name}</h2>
            <div className={style.albumImageWrapper}>
              <img src={album.image[2]['#text']} alt={album.name} />
              <div className={style.playIcon}>
                <i className="fa fa-play-circle fa-3x"></i>
              </div>
            </div>
            <p>{album.playcount}</p>
          </div>
        ))}
      </ul>
      {selectedAlbum && (
        <DetailsAlbumModal >
          <ButtonExit onClick={handleCloseModal}>
            <i className="fa-solid fa-2x fa-circle-xmark"></i>
          </ButtonExit>
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

export default LastFmAlbums;
