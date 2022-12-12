//@ts-ignore
import { Player } from "webvtt-player";

const Transcript = () => {
  const handleSaveTranscript = (data: string) => {
    console.log(data);
  };
  return (
    <Player
      audio="https://res.cloudinary.com/djzeufu4j/video/upload/v1670861757/barackobamavictoryspeech_1_oxaxqb.mp3"
      transcript="https://res.cloudinary.com/djzeufu4j/raw/upload/v1670862234/barackobamavictoryspeech.mp3_1_p39qrw.vtt"
    />
  );
};

export default Transcript;
