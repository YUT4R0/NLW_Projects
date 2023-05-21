import { Camera, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewPost(){
    return (
      <div className="flex flex-1 flex-col items-star gap-4">
        <Link href="/" className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100" >
          <ChevronLeft className="h-4 w-4" />
          Back to the timeline
        </Link>
        <form className="flex w-full flex-col gap-2">
          <div className="flex gap-4 items-center">
            <label
              htmlFor="media"
              className="flex items-center cursor-pointer gap-1.5 text-sm text-gray-200 hover:text-gray-100"
            >
              <Camera className="w-3.5 h-3.5"/>
              Attach media
            </label>

            <label
              htmlFor="isPublic"
              className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
            >
              <input
                type="checkbox"
                name="isPublic"
                id="isPublic"
                value="true"
                className="h-3.5 w-3.5 rounded border-gray-400 bg-gray-700 text-purple-500 focus:ring-0" 
              />
              Make this post public
            </label>
          </div>

          <input type="file" id="media" className="invisible h-0 w-0" />

          <textarea
           name="content"
           spellCheck={false}
           rows={15}
           className="w-full flex-1 resize-none rounded border-0 bg-transparent px-0 py-0 text-md leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
           placeholder="Feel free to add photos, videos, and stories about that experience you want to remember forever! ^_^"
          />
        </form>
      </div>
    )
}