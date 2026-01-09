'use client'

export default function BackgroundVideo() {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/bgvideo.mp4" type="video/mp4" />
        Sizning brauzeringiz video qo‘llab-quvvatlamaydi.
      </video>
    </>
  )
}
