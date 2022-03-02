import React from "react";
import { useAudioPlayer } from "react-use-audio-player";
import Button from "react-bootstrap/esm/Button";

const AudioPlayer = ({ file }) => {
  const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
    src: file,
    format: "mp3",
    autoplay: false,
    onend: () => console.log("sound has ended!"),
  });

  if (!ready && !loading) return <div>No audio to play</div>;
  if (loading) return <div>Loading audio</div>;

  return (
    <div>
      {/* <button onClick={togglePlayPause}>{playing ? "Pause" : "Play"}</button> */}
      <Button variant="primary" onClick={togglePlayPause}>
        {playing ? "Pause" : "Play"}
      </Button>
    </div>
  );
};

export default AudioPlayer;
