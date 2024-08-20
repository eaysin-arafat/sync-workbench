import DownloadIcon from "@/assets/user-info/DownloadIcon";
import { Button } from "@mantine/core";
import FileViewer from "react-file-viewer";

const DocumentsPreviewModal = ({
  file,
  type,
  alt,
  close,
}: {
  file: string;
  type: string;
  alt?: string;
  close: () => void;
}) => {
  const onError = (e: Error) => {
    console.log(e, "error in file-viewer");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = file;
    link.download = file.split("/").pop() || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="my-4 mx-4 space-y-6">
      <div className="flex items-center justify-end gap-3">
        <Button
          className="!bg-black text-white !font-bold !text-sm"
          leftSection={<DownloadIcon />}
          onClick={handleDownload}
        >
          Download
        </Button>

        <Button
          variant="outline"
          className="!text-black !border-black !font-bold !text-sm"
          onClick={close}
        >
          Close
        </Button>
      </div>

      <div className="w-[879px] h-[556px] overflow-hidden flex justify-center items-center">
        {/* {type.startsWith("image/") ? (
          <img
            src={file}
            alt={alt || "Preview"}
            className="object-contain max-w-full max-h-full"
          />
        ) : ( */}
        <FileViewer fileType={type} filePath={file} onError={onError} />
        {/* )} */}
      </div>
    </div>
  );
};

export default DocumentsPreviewModal;
