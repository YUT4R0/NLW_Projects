import { User } from "lucide-react";

export default function Signin() {
    return (
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
        className="flex items-center gap-4 text-left hover:text-gray-50 transition-colors"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
          <User className='h-6 w-6 text-gray-500' />
        </div>
        <p className='text-sm leading-snug max-w-[240px]'>
          <span className='underline'>Create your account</span>{'\n'}
          and save your memories!
        </p>
      </a>
    )
}