import { useState, useContext, useRef } from "react";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import ReactWaves from "@dschoon/react-waves";
import { ThemeContext } from "../App";
import Transcript from "./Transcript";

interface AudioProps {
  src: string;
  vtt: string;
  txt: string;
  audio: HTMLAudioElement;
}

const Audio = ({ src, vtt, txt, audio }: AudioProps) => {
  const theme = useContext(ThemeContext);

  const audioRef = useRef<HTMLAudioElement>(null);
  const trackRef = useRef<HTMLTrackElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(audio.currentTime);

  const handlePlayPause = () => {
    const audioSrc = audioRef.current!;
    audioSrc.paused ? audioSrc.play() : audioSrc.pause();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audio">
      <div className="audio__wave">
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
        <audio
          className="audio__audio"
          controls
          crossOrigin="anonymous"
          ref={audioRef}
        >
          <source src={src} />
          <track default kind="subtitles" src={vtt} ref={trackRef} />
        </audio>
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
            progressColor: theme.primary,
            responsive: true,
            waveColor: theme.secondary,
            interact: false,
          }}
          playing={isPlaying}
          volume={0}
          pos={currentTime}
        />
      </div>
      {/* <Player audio={src} transcript={vtt} /> */}

      {/* {trackRef.current && (

      )} */}
      <Transcript track={trackRef} audio={audioRef} />
    </div>
  );
};

export default Audio;
