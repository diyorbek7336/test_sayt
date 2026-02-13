'use client'

export default function Bagroundvideo() {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        aria-hidden
      >
        <source src="/video/bgvideo.mp4" type="video/mp4" />
        Sizning brauzeringiz video qo‘llab-quvvatlamaydi.
      </video>
      <div className="absolute inset-0 bg-black/40" aria-hidden />
    </>
  )
}
