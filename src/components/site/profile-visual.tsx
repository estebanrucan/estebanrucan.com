import Image from "next/image";

import { profile } from "@/content/site";
import { cn } from "@/lib/utils";

type ProfileVisualProps = {
  variant?: "hero" | "card" | "compact" | "teaching";
  showCaption?: boolean;
  className?: string;
};

export function ProfileVisual({ variant = "hero", showCaption = true, className }: ProfileVisualProps) {
  return (
    <figure className={cn("profile-visual", `profile-visual--${variant}`, className)}>
      <div className="profile-visual__stage">
        <div className="profile-visual__orb" aria-hidden="true" />
        <Image
          src={profile.image}
          alt="Retrato de Esteban Rucán"
          width={1120}
          height={960}
          priority={variant === "hero"}
          unoptimized
          className="profile-visual__image"
        />
      </div>
      {showCaption ? (
        <figcaption className="profile-caption">
          <strong>{profile.name}</strong>
          <span>{profile.role}</span>
          <small>{profile.location}</small>
        </figcaption>
      ) : null}
    </figure>
  );
}
