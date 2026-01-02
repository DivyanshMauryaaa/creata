'use client'

import { ProjectClip } from '@/types/editor'
import { cn } from '@/lib/utils'

interface TimelineClipProps {
    clip: ProjectClip
    pixelsPerSecond: number
}

export const TimelineClip = ({ clip, pixelsPerSecond }: TimelineClipProps) => {
    const width = clip.duration * pixelsPerSecond
    const left = clip.start_time * pixelsPerSecond

    return (
        <div
            className={cn(
                "absolute h-full rounded-md border text-xs px-2 flex items-center overflow-hidden whitespace-nowrap cursor-pointer hover:brightness-110 transition-all",
                clip.asset?.type === 'video' && "bg-blue-200 border-blue-400 text-blue-800",
                clip.asset?.type === 'audio' && "bg-green-200 border-green-400 text-green-800",
                clip.asset?.type === 'image' && "bg-purple-200 border-purple-400 text-purple-800",
            )}
            style={{
                width: `${width}px`,
                left: `${left}px`,
            }}
            title={clip.name}
        >
            {clip.name}
        </div>
    )
}
