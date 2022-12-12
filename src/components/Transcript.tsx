//@ts-ignore
import { useRef } from "react";

const Transcript = () => {
  const ref = useRef(null);
  const handleSaveTranscript = (data: string) => {
    console.log(data);
  };
  return (
    // <Player
    //   preload={true}
    //   audio="https://res.cloudinary.com/djzeufu4j/video/upload/v1670861757/barackobamavictoryspeech_1_oxaxqb.mp3"
    //   transcript="https://res.cloudinary.com/djzeufu4j/raw/upload/v1670862234/barackobamavictoryspeech.mp3_1_p39qrw.vtt"
    // />
    <audio ref={ref} controls>
      <source
        src="https://res.cloudinary.com/djzeufu4j/video/upload/v1670861757/barackobamavictoryspeech_1_oxaxqb.mp3"
        type="audio/mpeg"
      />
      <track
        kind="captions"
        label="English SubTitles"
        src="https://res.cloudinary.com/djzeufu4j/raw/upload/v1670862234/barackobamavictoryspeech.mp3_1_p39qrw.vtt"
      />
      Your browser does not support the audio element.
    </audio>
  );
};

export default Transcript;
