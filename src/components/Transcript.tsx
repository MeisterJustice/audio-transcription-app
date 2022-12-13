import { useEffect, useState, memo, RefObject } from "react";

const Transcript = ({
  track,
  audio,
}: {
  track: RefObject<HTMLTrackElement>;
  audio: RefObject<HTMLAudioElement>;
}) => {
  const [transcriptLines, setTranscriptLines] = useState<any[]>([]);
  const [currentText, setCurrentText] = useState<string>("");

  /*   This function is responsible for listening to the load event of the track element.
        When the track element is loaded, it will loop through the cues  and push them into an array.
*/
  const handleTrackLoad = () => {
    const lines: any[] = [];
    track.current?.addEventListener("load", () => {
      const arr = Object.values(track?.current?.track?.cues!);
      for (let i = 0; i < arr.length; i++) {
        lines.push(arr[i]);
      }
      setTranscriptLines(lines);
    });
  };

  /*   This function is responsible for listening to the cue change event of the track element.
        When the active cue changes, updates the active text.
*/
  const handleTrackTime = () => {
    track.current?.addEventListener("cuechange", () => {
      console.log("changing", track.current?.track?.activeCues![0]);
      // @ts-ignore
      const text = track.current?.track?.activeCues![0]?.text || "";
      setCurrentText(text);
    });
  };

  useEffect(() => {
    handleTrackLoad();
    handleTrackTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track, audio]);

  return (
    <div className="transcript">
      {transcriptLines?.map((item, index) => (
        <TranscriptLine
          key={index}
          cue={item}
          active={item?.text === currentText}
        />
      ))}
    </div>
  );
};

const TranscriptLine = ({
  cue,
  active,
}: {
  cue: TextTrackCue;
  active: boolean;
}) => {
  // @ts-ignore
  const text = cue.text;

  return (
    <div className={`transcript__line ${active ? "active" : ""}`}>
      <div className="transcript__line__text">{text}</div>
    </div>
  );
};

export default memo(Transcript);
