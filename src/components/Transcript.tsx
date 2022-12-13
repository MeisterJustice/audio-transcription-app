import { useEffect, useState, memo, RefObject } from "react";

const Transcript = ({
  track,
  audio,
}: {
  track: RefObject<HTMLTrackElement>;
  audio: RefObject<HTMLAudioElement>;
}) => {
  const [arrayTrack, setArrayTrack] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [transcriptLines, setTranscriptLines] = useState<any[]>([]);

  useEffect(() => {
    const lines: any[] = [];
    track.current?.addEventListener("load", () => {
      const arr = Object.values(track?.current?.track?.cues!);
      setArrayTrack(arr);

      for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        lines.push(
          <TranscriptLine
            key={i}
            cue={arr[i]}
            active={arr[i]?.startTime === audio.current?.currentTime}
          />
        );
      }
      setTranscriptLines(lines);
    });
    // }
  }, [track, audio, count]);

  return <div className="transcript">{transcriptLines}</div>;
};

const TranscriptLine = ({ cue, active }: { cue: any; active: boolean }) => {
  const text = cue.text;
  const start = cue.startTime;
  const end = cue.endTime;

  // useEffect(() => {
  //     a.addEventListener(("onenter") => {

  //     })
  // }, [cue])

  return (
    <div
      className={`transcript__line ${active ? "transcript__line--active" : ""}`}
    >
      <div className="transcript__line__text">{text}</div>
    </div>
  );
};

export default memo(Transcript);
