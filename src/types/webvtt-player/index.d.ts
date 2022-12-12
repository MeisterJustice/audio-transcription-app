declare module "webvtt-player" {
  export interface Props {
    audio: string;
    transcript: string;
  }

  export class Player extends React.Component<Props> {}
}
