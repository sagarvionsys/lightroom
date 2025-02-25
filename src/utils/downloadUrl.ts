import toast from "react-hot-toast";

export const downloadImage = (
  imageUrl: string,
  name: string = "download-image"
) => {
  fetch(imageUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    })
    .catch(() => toast.error("Error downloading the image"));
};
