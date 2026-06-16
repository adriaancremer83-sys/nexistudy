import Image from "next/image";

// Nexi the meerkat — NexiStudy's mascot. Four hand-drawn poses live in
// /public/images as optimised WebP. This component is the single place that
// knows the filenames, so pages just ask for a pose by name.
export type NexiPose = "idle" | "wave" | "thinking" | "celebrate";

const ALT: Record<NexiPose, string> = {
  idle: "Nexi, your study buddy",
  wave: "Nexi waving hello",
  thinking: "Nexi thinking",
  celebrate: "Nexi celebrating",
};

interface Props {
  pose?: NexiPose;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
}

export default function Nexi({
  pose = "idle",
  width = 200,
  height = 200,
  className,
  priority = false,
  alt,
}: Props) {
  return (
    <Image
      src={`/images/nexi-${pose}.webp`}
      alt={alt ?? ALT[pose]}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
