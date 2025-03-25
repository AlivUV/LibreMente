const imgToWebp = (file: any, setFileState: any) => {
  const canvas = document.createElement("canvas");
  const img = new Image();
  img.onload = () => {
    canvas.width = 200;
    canvas.height = 200;
    canvas.getContext("2d")!.drawImage(img, 0, 0, 200, 200);
    canvas.toBlob((blob: any) => {
      const webpImg = new File([blob], file.name, { type: blob.type });
      file = webpImg;
      file.url = URL.createObjectURL(webpImg);
      setFileState((actual: any) => file);
    }, "image/webp");
  };
  img.src = URL.createObjectURL(file);
};

export { imgToWebp };
