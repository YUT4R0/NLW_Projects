'use client'

import { ChangeEvent, useState } from "react";

export default function MediaPicker() {
    const [Preview, setPreview] = useState<string | null>(null);

    const onMediaSelected = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target
        if (!files) {
            return
        }

        const previewURL = URL.createObjectURL(files[0])
        setPreview(previewURL)
    }

    return (
      <>
        <input
          type="file"
          id="media"
          name="coverURL"
          accept="image/*"
          className="invisible h-0 w-0"
          onChange={onMediaSelected}
        />

        {
            Preview && <img src={Preview} alt="[Selected file]" className="w-full aspect-video rounded-lg object-cover" />
        }

      </>
    )
}