import React, { useEffect, useRef } from "react";
import Plyr from "plyr-react";
import "plyr/dist/plyr.css";

const VideoPlayer = ({ source, titre, onClose }) => {
  const playerRef = useRef(null); // Référence pour le lecteur

  useEffect(() => {
    const interval = setInterval(() => {
      const playerInstance = playerRef.current?.plyr;

      if (playerInstance) {
        playerInstance.fullscreen.enter(); // Active le plein écran
        clearInterval(interval); // Supprime l'intervalle une fois exécuté
      }
    }, 100);

    return () => clearInterval(interval); // Nettoie l'intervalle
  }, []);

  const videoSrc = {
    type: "video",
    autoplay: true, // Activer l'autoplay
    sources: [
      {
        src: source,
        type: "video/mp4",
        size: 720,
      },
    ],
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", backgroundColor: "#000" }}>
      {/* Bouton retour */}
      <button
        onClick={onClose}
        style={{
          position: "fixed", // Change en fixed pour qu'il reste visible en plein écran
          top: "10px",
          left: "10px",
          zIndex: 1000, // S'assure que le bouton est au-dessus du lecteur
          backgroundColor: "rgba(0,0,0,0.7)",
          color: "#fff",
          border: "none",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ← Retour
      </button>

      {/* Lecteur vidéo */}
      <Plyr
        ref={playerRef} // Associe la référence au lecteur
        options={{
          autoplay: true, // Activer l'autoplay
          controls: [
            "play-large",
            "play",
            "rewind",
            "fast-forward",
            "progress",
            "current-time",
            "mute",
            "volume",
            "captions",
            "settings",
            "pip",
            "fullscreen",
          ],
        }}
        source={videoSrc}
      />
    </div>
  );
};

export default VideoPlayer;
