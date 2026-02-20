'use client'
import Image2 from "../unify.avif"
import { useRef, useState } from 'react'
import Image from 'next/image'

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoPlaying, setVideoPlaying] = useState(false)

  return (
    <>
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
          videoPlaying ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden
      >
        <Image
          src={Image2}
          alt="background"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center center' }}
          sizes="100vw"
        />
      </div>

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ${
          videoPlaying ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden
        onPlaying={() => setVideoPlaying(true)}
        onError={() => setVideoPlaying(false)}
      >
        <source src="/video/bgvideo.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/40" aria-hidden />
    </>
  )
}