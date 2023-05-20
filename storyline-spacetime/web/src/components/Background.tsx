export default function Background(){
    return (
        <>
          {/* blur */}
          <div className="absolute h-[288px] w-[526px] bg-purple-700 opacity-50 right-0 top-1/2 translate-x-1/2 -translate-y-1/2   rounded-full blur-full"/>
          
          {/* stripes */}
          <div className="absolute right-2 top-0 bottom-0 w-2 bg-stripes" />
        </>
    )
}