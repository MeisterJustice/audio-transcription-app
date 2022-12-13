import { createContext, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { Audio } from "./components";
import txtFile from "./asset/audio.txt";

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
  const audio = useRef<HTMLAudioElement>(null);
  const track = useRef<HTMLTrackElement>(null);

  const [speed, setSpeed] = useState(1);

  const handleSpeedSlide = (value: string) => {
    if (audio?.current) {
      audio.current.playbackRate = Number(value);
      setSpeed(Number(value));
    }
  };

  const handleDownloadTxt = async () => {
    const resp = await fetch(txtFile);
    const audioTxtData = await resp.text();

    const element = document.createElement("a");
    const file = new Blob([audioTxtData], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className="home">
        <div className="home__box container">
          <div className="home__main">
            <h1 className="home__main h1">Victory Speech</h1>
            <div className="home__main author">by Barack Obama</div>
            <Audio
              audio={audio}
              track={track}
              src={audioFile}
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
            <div
              onClick={handleDownloadTxt}
              className="home__footer download-wrapper"
            >
              <div className="home__text">Download Transcription</div>
              <FaDownload color="#000000" />
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
