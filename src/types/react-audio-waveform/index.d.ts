declare module "react-audio-waveform" {
  export interface Props {
    barWidth?: number;
    peaks?: any[];
    height?: number;
    pos?: number;
    duration?: number;
    onClick?: Function;
    color?: string;
    progressGradientColors?: any[];
  }

  export default class WaveForm extends React.Component<Props> {}
}
