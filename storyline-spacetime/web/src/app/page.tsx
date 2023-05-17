
export default function Home() {
  return (
    <main className="grid grid-cols-2 min-h-screen">
      {/* Left side */}
      <div className="bg-red-200"></div>

      {/* Right side */}
      <div className="flex flex-col p-16">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-center leading-relaxed w-[360px]" >
            You haven't created any memories yet, start{' '}
            <a href="" className="underline hover:text-gray-50">creating now</a>
            !
          </p>
        </div>
      </div>
    </main>
  )
}
