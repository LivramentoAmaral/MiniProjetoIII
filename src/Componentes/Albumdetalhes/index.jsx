// AlbumDetails.js (Página de detalhes do álbum)
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importe useParams para acessar os parâmetros da URL
import fetchLastFmData from '../../services';
import 'bootstrap/dist/css/bootstrap.min.css';

function AlbumDetails() {
  const { artistName, albumName } = useParams(); // Obtenha os parâmetros da URL

  const [albumDetails, setAlbumDetails] = useState({});
  const [albumTracks, setAlbumTracks] = useState([]);

  useEffect(() => {
    async function getAlbumDetails() {
      try {
        // Faça uma solicitação à API Last.fm para obter os detalhes do álbum e as músicas
        const response = await fetchLastFmData('album.getinfo', {
          artist: artistName,
          album: albumName,
        });

        // Atualize o estado com os detalhes do álbum e as músicas
        if (response && response.album) {
          setAlbumDetails(response.album);
          setAlbumTracks(response.album.tracks.track);
        }
      } catch (error) {
        console.error('Erro ao buscar os detalhes do álbum:', error);
      }
    }

    getAlbumDetails();
  }, [artistName, albumName]);

  return (
    <div>
      {/* Exiba a imagem do álbum e outras informações aqui */}
      <h2>{albumDetails.name}</h2>
      <img src={albumDetails.image[3]['#text']} alt={albumDetails.name} />
      
      {/* Exiba as músicas do álbum aqui */}
      <h3>Músicas do Álbum</h3>
      <ul>
        {albumTracks.map((track, index) => (
          <li key={index}>{track.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AlbumDetails;
