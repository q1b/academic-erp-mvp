"use client";
import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import { useFileReader, createImage, Slider } from "./common";
import type { FileEvent, Area } from "./common";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

const MAX_IMAGE_SIZE = 1024;

type ImageUploaderProps = {
  id: string;
  buttonMsg: string;
  handleAvatarChange: (imageSrc: string) => void;
  imageSrc?: string;
  uploadInstruction?: string;
  disabled?: boolean;
  testId?: string;
};

// This is separate to prevent loading the component until file upload
function CropContainer({
  onCropComplete,
  imageSrc,
}: {
  imageSrc: string;
  onCropComplete: (croppedAreaPixels: Area) => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleZoomSliderChange = (value: number) => {
    value < 1 ? setZoom(1) : setZoom(value);
  };

  return (
    <div className="crop-container h-40 max-h-40 w-40 rounded-full">
      <div className="relative h-40 w-40 rounded-full">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={(croppedArea, croppedAreaPixels) => onCropComplete(croppedAreaPixels)}
          onZoomChange={setZoom}
        />
      </div>
      <Slider
        value={zoom}
        min={1}
        max={3}
        step={0.1}
        label="slide_zoom_drag_instructions"
        changeHandler={handleZoomSliderChange}
      />
    </div>
  );
}

export function ImageForm({ id, handleAvatarChange }: { id: string; handleAvatarChange: (imageSrc: string) => void }) {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [{ result }, setFile] = useFileReader({
    method: "readAsDataURL",
  });
  const onInputFile = (e: FileEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }

    const limit = 5 * 1000000; // max limit 5mb
    const file = e.target.files[0];

    if (file.size > limit) {
      alert("image_size_limit_exceed-error");
    } else {
      setFile(file);
    }
  };
  const showCroppedImage = useCallback(
    async (croppedAreaPixels: Area | null) => {
      try {
        if (!croppedAreaPixels) return;
        const croppedImage = await getCroppedImg(
          result as string /* result is always string when using readAsDataUrl */,
          croppedAreaPixels
        );
        handleAvatarChange(croppedImage);
      } catch (e) {
        console.error(e);
      }
    },
    [result, handleAvatarChange]
  );
  return (
    <>
      <div className="cropper flex flex-col items-center justify-center">
        {!result && (
          <div className="bg-muted flex h-20 max-h-20 w-20 items-center justify-start rounded-full">
            <p className="text-emphasis w-full text-center text-sm sm:text-xs">
              No Target
            </p>
          </div>
        )}
        {result && <CropContainer imageSrc={result as string} onCropComplete={setCroppedAreaPixels} />}
        <label className="bg-subtle hover:bg-muted hover:text-emphasis border-subtle text-default mt-8 cursor-pointer rounded-sm border px-3 py-1 text-xs font-medium leading-4 transition focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-1">
          <input
            onInput={onInputFile}
            type="file"
            name={id}
            placeholder="upload_image"
            className="text-default pointer-events-none absolute mt-4 opacity-0 "
            accept="image/*"
          />
          Choose a file
        </label>
      </div>
      <Button size="sm" onClick={() => showCroppedImage(croppedAreaPixels)}>Done</Button>
    </>
  )
}

export default function ImageUploader({
  id,
  buttonMsg,
  handleAvatarChange,
  uploadInstruction,
  disabled = false,
}: ImageUploaderProps) {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [{ result }, setFile] = useFileReader({
    method: "readAsDataURL",
  });

  const onInputFile = (e: FileEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }

    const limit = 5 * 1000000; // max limit 5mb
    const file = e.target.files[0];

    if (file.size > limit) {
      alert("image_size_limit_exceed-error");
    } else {
      setFile(file);
    }
  };

  const showCroppedImage = useCallback(
    async (croppedAreaPixels: Area | null) => {
      try {
        if (!croppedAreaPixels) return;
        const croppedImage = await getCroppedImg(
          result as string /* result is always string when using readAsDataUrl */,
          croppedAreaPixels
        );
        handleAvatarChange(croppedImage);
      } catch (e) {
        console.error(e);
      }
    },
    [result, handleAvatarChange]
  );

  return (
    <Dialog
      onOpenChange={(opened) => {
        // unset file on close
        if (!opened) {
          setFile(null);
        }
      }}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          type="button"
          disabled={disabled}
          className="cursor-pointer py-1 text-sm">
          {buttonMsg}
        </Button>
      </DialogTrigger>
      <DialogContent title="upload_target" className="max-w-sm">
        <VisuallyHidden.Root>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription className="mb-0">Profile Image</DialogDescription>
        </VisuallyHidden.Root>
        <div className="mb-4">
          <div className="cropper mt-6 flex flex-col items-center justify-center">
            {!result && (
              <div className="bg-muted flex h-32 max-h-32 w-32 items-center justify-start rounded-full">
                <p className="text-emphasis w-full text-center text-sm sm:text-xs">
                  No Target
                </p>
              </div>
            )}
            {result && <CropContainer imageSrc={result as string} onCropComplete={setCroppedAreaPixels} />}
            <label
              className="bg-subtle hover:bg-muted hover:text-emphasis border-subtle text-default mt-8 cursor-pointer rounded-sm border px-3 py-1 text-xs font-medium leading-4 transition focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-1">
              <input
                onInput={onInputFile}
                type="file"
                name={id}
                placeholder="upload_image"
                className="text-default pointer-events-none absolute mt-4 opacity-0 "
                accept="image/*"
              />
              Choose a file
            </label>
            {uploadInstruction && (
              <p className="text-muted mt-4 text-center text-sm">({uploadInstruction})</p>
            )}
          </div>
        </div>
        <DialogFooter className="relative">
          <DialogClose asChild>
            <Button variant="ghost">
              cancel
            </Button>
          </DialogClose>
          <DialogClose onClick={() => showCroppedImage(croppedAreaPixels)} asChild>
            <Button>Change</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Context is null, this should never happen.");

  const maxSize = Math.max(image.naturalWidth, image.naturalHeight);
  const resizeRatio = MAX_IMAGE_SIZE / maxSize < 1 ? Math.max(MAX_IMAGE_SIZE / maxSize, 0.75) : 1;

  // huh, what? - Having this turned off actually improves image quality as otherwise anti-aliasing is applied
  // this reduces the quality of the image overall because it anti-aliases the existing, copied image; blur results
  ctx.imageSmoothingEnabled = false;
  // pixelCrop is always 1:1 - width = height
  canvas.width = canvas.height = Math.min(maxSize * resizeRatio, pixelCrop.width);

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  // on very low ratios, the quality of the resize becomes awful. For this reason the resizeRatio is limited to 0.75
  if (resizeRatio <= 0.75) {
    // With a smaller image, thus improved ratio. Keep doing this until the resizeRatio > 0.75.
    return getCroppedImg(canvas.toDataURL("image/png"), {
      width: canvas.width,
      height: canvas.height,
      x: 0,
      y: 0,
    });
  }

  return canvas.toDataURL("image/png");
}