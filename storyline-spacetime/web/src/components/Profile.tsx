import { getUser } from "@/lib/auth";

import Image from "next/image";

export default function Profile() {

    const { name, avatar } = getUser()

    return (
      <div className="flex items-center gap-4 text-left">
        <Image
          src={avatar}
          title={name}
          alt="Profile pic"
          height={40}
          width={40}
          className="w-12 h-12 rounded-full"
        />
        <p className='text-lg font-alt font-bold leading-snug max-w-[240px]'>
          { name }
          <a
            href="/api/auth/logout"
            className="block text-red-400 hover:text-red-300 text-sm font-sans font-normal"
          >
            Exit account
          </a>
        </p>
        
      </div>
    )
}