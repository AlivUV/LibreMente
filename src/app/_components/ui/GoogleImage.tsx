import Image from "next/image";
import { CSSProperties } from "react";

export default function GoogleImage({
  compAlt,
  compSrc,
  compStyle,
}: {
  compAlt?: string;
  compSrc: string;
  compStyle?: CSSProperties;
}) {
  const rootStyle: CSSProperties = {
    border: "3px solid transparent",
    background:
      "linear-gradient(white, white) padding-box, linear-gradient(90deg, rgb(153,0,0) 0%, rgba(255,75,75) 100%) border-box",
  };
  return (
    <Image
      referrerPolicy="no-referrer"
      alt={compAlt || ""}
      src={compSrc}
      style={Object.assign({}, rootStyle, compStyle)}
    />
  );
}
