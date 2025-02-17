"use client";

import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import FormErrors from "@/components/form/form-error";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();

  // eslint-disable-next-line
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isloading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState(null);

  const fetchImages = useCallback(async () => {
    try {
      const result = await unsplash.photos.getRandom({
        collectionIds: ["317099"],
        count: 3,
      });

      if (result && result.response) {
        // eslint-disable-next-line
        const newImages = result.response as Array<Record<string, any>>;
        setImages(newImages);
      } else {
        console.error("Failed to get images from unsplash");
      }
    } catch (error) {
      console.log(error);
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, []);

  if (isloading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="size-6 animate-spin text-sky-700" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mb-2 grid grid-cols-3 gap-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted ",
              pending && "opacity-50 hover:opacity-50 cursor-auto",
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              fill
              src={image.urls.thumb}
              className="rounded-sm object-cover"
              alt="Unsplash image"
            />
            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 flex size-full items-center justify-center bg-black/30 ">
                <Check className="size-4 text-white" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="absolute bottom-0 w-full truncate bg-black/50 p-1 text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
};

export default FormPicker;
