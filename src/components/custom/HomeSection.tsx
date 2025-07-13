import { cn } from "@/lib/utils";

type ImageSide = "left" | "right";

interface ImageSectionProps {
  imgSrc: string;
  imgSide: ImageSide;
  imgClassName?: string;
}

interface HomeSectionProps extends ImageSectionProps {
  className?: string;
  title: string;
  description: string;
}

function ImageSection({ imgSrc, imgSide, imgClassName }: ImageSectionProps) {
  return (
    <div
      className={cn("flex max-md:justify-center", {
        "justify-end": imgSide === "right",
        "justify-start": imgSide === "left",
      })}
    >
      <img src={imgSrc} className={imgClassName} />
    </div>
  );
}

function HomeSection({
  className,
  imgSrc,
  imgSide,
  title,
  description,
  imgClassName,
}: HomeSectionProps) {
  return (
    <section className={className}>
      <div className="flex flex-col max-lg:gap-12 lg:grid lg:grid-cols-2 items-center p-12 pb-0 mx-auto max-w-[1300px]">
        {imgSide === "left" && (
          <ImageSection
            imgSrc={imgSrc}
            imgSide={imgSide}
            imgClassName={imgClassName}
          />
        )}
        <div
          className={cn("flex flex-col gap-8 max-md:text-center", {
            "text-end": imgSide === "left",
            "text-start": imgSide === "right",
          })}
        >
          <h1 className="title-xl">{title}</h1>
          <p>{description}</p>
        </div>
        {imgSide === "right" && (
          <ImageSection
            imgSrc={imgSrc}
            imgSide={imgSide}
            imgClassName={imgClassName}
          />
        )}
      </div>
    </section>
  );
}

export default HomeSection;
