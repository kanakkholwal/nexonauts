import Image, { ImageProps } from "next/image";
import errorImage from "./error.png";

export default function ErrorFallbackImage(props: ImageProps) {
  return <Image {...props} src={errorImage} />;
}
