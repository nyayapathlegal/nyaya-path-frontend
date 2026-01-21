import React from 'react'

const VideoSection = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <video
                src={"/assets/videos/footerVideo.mp4"}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-40"
            />
        </div>
    )
}

export default VideoSection;