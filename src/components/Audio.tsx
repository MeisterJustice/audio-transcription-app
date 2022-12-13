import { useState, useContext, RefObject } from "react";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import ReactWaves from "@dschoon/react-waves";
import { ThemeContext } from "../App";
import Transcript from "./Transcript";

interface AudioProps {
  src: string;
  vtt: string;
  track: RefObject<HTMLTrackElement>;
  audio: RefObject<HTMLAudioElement>;
}

const Audio = ({ src, vtt, audio, track }: AudioProps) => {
  const theme = useContext(ThemeContext);

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    const audioSrc = audio.current!;
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
          ref={audio}
        >
          <source src={src} />
          <track default kind="subtitles" src={vtt} ref={track} />
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
        />
      </div>
      <Transcript track={track} audio={audio} />
    </div>
  );
};

export default Audio;
