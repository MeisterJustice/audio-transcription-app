import { createContext, useState } from "react";
import useAudio from "./hooks/useAudio";
import { FaDownload } from "react-icons/fa";
import { Audio } from "./components";

const theme = {
  primary: "#f2817c",
  secondary: "#808080",
  tertiary: "#f4f5fd",
  quaternary: "#e9eef5",
};

export const ThemeContext = createContext(theme);

const audioFile =
  "https://res.cloudinary.com/djzeufu4j/video/upload/v1670861757/barackobamavictoryspeech_1_oxaxqb.mp3";

const transcriptFile =
  "https://res.cloudinary.com/djzeufu4j/raw/upload/v1670862234/barackobamavictoryspeech.mp3_1_p39qrw.vtt";

const transcriptTxt =
  "https://res.cloudinary.com/djzeufu4j/raw/upload/v1670868859/barackobamavictoryspeech.mp3_1_rmhd49.txt";

function App() {
  const audio = useAudio(audioFile, { volume: 0.8, playbackRate: 1 });

  const [speed, setSpeed] = useState(1);

  const handleSpeedSlide = (value: string) => {
    audio.playbackRate = Number(value);
    setSpeed(Number(value));
  };

  // add text track
  return (
    <ThemeContext.Provider value={theme}>
      <div className="home">
        <div className="home__box container">
          <div className="home__main">
            <h1 className="home__main h1">Victory Speech</h1>
            <div className="home__main author">by Barack Obama</div>
            <Audio
              audio={audio}
              src={audioFile}
              txt={transcriptTxt}
              vtt={transcriptFile}
            />
          </div>
          <div className="home__footer">
            <div className="home__speed-wrapper">
              <div className="home__text">Speed</div>
              <div>
                <input
                  onChange={(e) => handleSpeedSlide(e.target.value)}
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speed}
                  className="home__speed-slider"
                />
                <div className="home__speed-value">
                  <div>0.5</div>
                  <div>2.0</div>
                </div>
              </div>
            </div>
            <a
              href={transcriptTxt}
              rel="noreferrer"
              download
              target="_blank"
              className="home__footer home__pointer download-wrapper"
            >
              <div className="home__text">Download Transcription</div>
              <FaDownload color="#000000" />
            </a>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
