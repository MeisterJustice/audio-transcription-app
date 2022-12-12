import { useEffect, useState } from "react";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import ReactWaves from "@dschoon/react-waves";

interface AudioProps {
  src: string;
  vtt: string;
  txt: string;
  audio: HTMLAudioElement;
}

const Audio = ({ src, vtt, txt, audio }: AudioProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(audio.currentTime);

  const handlePlayPause = () => {
    audio.paused ? audio.play() : audio.pause();
    setIsPlaying(!isPlaying);
  };

  const handlePosChange = (pos?: number) => {
    if (pos !== currentTime) {
      audio.currentTime = pos!;
      setCurrentTime(pos!);
    }
  };
  return (
    <div className="audio">
      {!isPlaying ? (
        <FaPlayCircle
          onClick={handlePlayPause}
          className="audio__pointer"
          size={40}
        />
      ) : (
        <FaPauseCircle
          onClick={handlePlayPause}
          className="audio__pointer"
          size={40}
        />
      )}
      <ReactWaves
        audioFile={src}
        className={"audio__waves"}
        options={{
          barGap: 3,
          barWidth: 4,
          barHeight: 2,
          barRadius: 3,
          cursorWidth: 0,
          height: 100,
          hideScrollbar: true,
          progressColor: "#EC407A",
          responsive: true,
          waveColor: "#D1D6DA",
        }}
        playing={isPlaying}
        volume={0}
        onPosChange={handlePosChange}
      />
    </div>
  );
};

export default Audio;
