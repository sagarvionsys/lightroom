"use client";

import { IKUpload } from "imagekitio-next";
import {
  IKUploadResponse,
  UploadError,
} from "imagekitio-next/dist/types/components/IKUpload/props";
import toast from "react-hot-toast";

const FileUpload = ({
  onSuccess,
}: {
  onSuccess: (response: IKUploadResponse) => void;
}) => {
  const handleError = (error: UploadError) => {};

  const handleResponse = (response: IKUploadResponse) => {
    onSuccess(response);
  };

  return (
    <div className="p-6">
      <IKUpload
        fileName="test-file.png"
        onSuccess={handleResponse}
        onError={handleError}
        onUploadStart={() => toast.success("file is uploaded")}
        validateFile={(file: File) => {
          const validTypes = ["image/png", "image/jpeg", "image/jpg"];
          if (!validTypes.includes(file.type)) {
            toast.error("Invalid file type");
            return false;
          }
          if (file.size > 2 * 1024 * 1024) {
            toast.error("File size too large");
            return false;
          }
          return true;
        }}
      />
    </div>
  );
};

export default FileUpload;
