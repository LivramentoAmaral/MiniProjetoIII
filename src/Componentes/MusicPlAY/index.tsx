import React, { useState } from "react";

function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(null);

  const playTrack = (track) => {
    setCurrentTrack(track);
  };

  const stopPlayback = () => {
    setCurrentTrack(null);
  };

  return (
    <div>
      {currentTrack ? (
        <div>
          <h2>Reproduzindo: {currentTrack.name}</h2>
          <audio controls autoPlay>
            <source src={currentTrack.url} type="audio/mpeg" />
            Seu navegador não suporta a tag de áudio.
          </audio>
          <button onClick={stopPlayback}>Parar Reprodução</button>
        </div>
      ) : (
        <p>Clique em uma música para reproduzir</p>
      )}
    </div>
  );
}

export default MusicPlayer;
