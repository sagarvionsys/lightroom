"use client";

import { IKUpload } from "imagekitio-next";
import {
  IKUploadResponse,
  UploadError,
} from "imagekitio-next/dist/types/components/IKUpload/props";

const FileUpload = ({
  onSuccess,
}: {
  onSuccess: (response: IKUploadResponse) => void;
}) => {
  const handleError = (error: UploadError) => {
    console.log("Error in image upload", error);
  };

  const handleResponse = (response: IKUploadResponse) => {
    onSuccess(response);
    console.log("Image uploaded", response);
  };

  return (
    <div className="p-6">
      <IKUpload
        fileName="test-file.png"
        onSuccess={handleResponse}
        onError={handleError}
        onUploadStart={() => console.log("Uploading...")}
        validateFile={(file: File) => {
          const validTypes = ["image/png", "image/jpeg", "image/jpg"];
          if (!validTypes.includes(file.type)) console.log("Invalid file type");
          if (file.size > 2 * 1024 * 1024) console.log("File size too large");
          return true;
        }}
      />
    </div>
  );
};

export default FileUpload;
