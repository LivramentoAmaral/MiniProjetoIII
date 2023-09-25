import React, { useEffect, useState } from 'react';
import fetchLastFmData from '../../services'; // Importe a função fetchLastFmData
import style from './style.module.css'; // Importe seus estilos
import 'bootstrap/dist/css/bootstrap.min.css';

import styled from 'styled-components';

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
`

const ButtonExite = styled.button`
  background-color:transparent;
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
`

function LastFmAlbums(props) {
  const [albumsByTracks, setAlbumsByTracks] = useState([]);
  const [albumsByArtists, setAlbumsByArtists] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumInfo, setAlbumInfo] = useState(null);
  const [searchedTracks, setSearchedTracks] = useState([]); // Estado para armazenar as músicas buscadas

  useEffect(() => {
    async function searchTracks() {
      try {
        if (props.searchTerm) {
          const trackName = props.searchTerm;
          const response = await fetchLastFmData('track.search', {
            track: trackName,
          });

          if (
            response &&
            response.results &&
            response.results.trackmatches &&
            response.results.trackmatches.track
          ) {
            const tracks = response.results.trackmatches.track;
            setSearchedTracks(tracks);
          }
        } else {
          // Trate o caso em que nenhum termo de pesquisa é fornecido, se necessário.
          // Por exemplo, você pode mostrar uma mensagem de erro.
          console.error('Nenhum termo de pesquisa fornecido.');
        }
      } catch (error) {
        console.error('Erro ao buscar músicas:', error);
      }
    }

    searchTracks();
  }, [props.searchTerm]);

  useEffect(() => {
    async function fetchAlbumsForTracks() {
      try {
        if (searchedTracks.length > 0) {
          const albumPromises = searchedTracks.map(async (track) => {
            const response = await fetchLastFmData('album.search', {
              album: track.album,
            });

            if (
              response &&
              response.results &&
              response.results.albummatches &&
              response.results.albummatches.album
            ) {
              return response.results.albummatches.album[0];
            }

            return null;
          });

          const albums = await Promise.all(albumPromises);
          const filteredAlbums = albums.filter((album) => album !== null);
          setAlbumsByTracks(filteredAlbums);
        }
      } catch (error) {
        console.error('Erro ao buscar álbuns relacionados às músicas:', error);
      }
    }

    fetchAlbumsForTracks();
  }, [searchedTracks]);

  useEffect(() => {
    async function fetchAlbumsForArtists() {
      try {
        if (props.searchTerm) {
          const artistName = props.searchTerm;
          const response = await fetchLastFmData('artist.gettopalbums', {
            artist: artistName,
          });

          if (
            response &&
            response.topalbums &&
            response.topalbums.album
          ) {
            setAlbumsByArtists(response.topalbums.album);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar álbuns relacionados aos artistas:', error);
      }
    }

    fetchAlbumsForArtists();
  }, [props.searchTerm]);

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
            return "Nenhum detalhe do álbum encontrado para o artista";
          }
        } else {
          return "Nenhum álbum selecionado.";
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

      ?<div>
        <h2>Álbuns Relacionados às Músicas</h2>
        <ul className={style.listaAlbuns}>
          {albumsByTracks.map((album) => (
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
      </div>

      :<div>
        <h2>Álbuns Relacionados aos Artistas</h2>
        <ul className={style.listaAlbuns}>
          {albumsByArtists.map((album) => (
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
      </div>

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

export default LastFmAlbums;





