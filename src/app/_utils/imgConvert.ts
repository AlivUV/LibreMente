const imgToWebp = (file: any, setFileState: any) => {
  const canvas = document.createElement("canvas");
  const img = new Image();
  img.onload = () => {
    canvas.width = 200;
    canvas.height = 200;
    const minDimension = Math.min(img.width, img.height);
    const newWidth = (img.width / minDimension) * 200;
    const newHeight = (img.height / minDimension) * 200;
    canvas
      .getContext("2d")!
      .drawImage(
        img,
        -(newWidth - 200) / 2,
        -(newHeight - 200) / 2,
        newWidth,
        newHeight
      );
    canvas.toBlob((blob: any) => {
      const webpImg = new File([blob], `${file.name.split(".")[0]}.webp`, {
        type: blob.type,
      });
      file = webpImg;
      file.url = URL.createObjectURL(webpImg);
      setFileState((actual: any) => file);
    }, "image/webp");
  };
  img.src = URL.createObjectURL(file);
};

export { imgToWebp };
