declare module "slate-transcript-editor" {
  export interface TranscriptEditorProps {
    transcriptData: any;
    handleAutoSaveChanges: Function;
    mediaUrl: string;
    autoSaveContentType?: string;
    isEditable?: boolean;
    spellCheck?: boolean;
    sttJsonType?: string;
    handleAnalyticsEvents?: Function;
    fileName?: string;
    title?: string;
    ref?: React.Ref;
    mediaType?: string;
  }

  export default class TranscriptEditor extends React.Component<TranscriptEditorProps> {}
}
