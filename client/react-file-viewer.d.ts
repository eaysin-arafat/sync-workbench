// react-file-viewer.d.ts
declare module "react-file-viewer" {
  import { ComponentType } from "react";

  interface FileViewerProps {
    fileType: string;
    filePath: string;
    errorComponent?: ComponentType<{ error: Error }>;
    unsupportedComponent?: ComponentType;
    onError?: (e: Error) => void;
  }

  const FileViewer: ComponentType<FileViewerProps>;

  export default FileViewer;
}
