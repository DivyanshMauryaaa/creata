'use client'

import { useState } from 'react'
import { ProjectTrack, ProjectClip, ProjectAsset } from '@/types/editor'
import { TimelineClip } from './timeline-clip'
import { cn } from '@/lib/utils'
import { Video, Music, Type } from 'lucide-react'

interface TimelineTrackProps {
    track: ProjectTrack
    clips: ProjectClip[]
    pixelsPerSecond: number
    onDropAsset: (asset: ProjectAsset, trackId: string, startTime: number) => void
}

export const TimelineTrack = ({ track, clips, pixelsPerSecond, onDropAsset }: TimelineTrackProps) => {
    const [isDragOver, setIsDragOver] = useState(false)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave = () => {
        setIsDragOver(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)

        try {
            const assetData = e.dataTransfer.getData('application/json')
            if (!assetData) return

            const asset: ProjectAsset = JSON.parse(assetData)

            // Calculate start time based on drop position
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            const startTime = Math.max(0, x / pixelsPerSecond)

            onDropAsset(asset, track.id, startTime)
        } catch (error) {
            console.error('Failed to parse dropped asset:', error)
        }
    }

    return (
        <div className="flex h-16 border-b border-gray-200">
            {/* Track Header */}
            <div className="w-40 border-r border-gray-200 bg-gray-50 flex items-center px-4 gap-2 flex-shrink-0">
                {track.type === 'video' && <Video size={16} className="text-gray-500" />}
                {track.type === 'audio' && <Music size={16} className="text-gray-500" />}
                {track.type === 'text' && <Type size={16} className="text-gray-500" />}
                <span className="text-xs font-medium text-gray-700 truncate">{track.name}</span>
            </div>

            {/* Track Content - Drop Zone */}
            <div
                className={cn(
                    "flex-1 relative min-w-0 transition-colors",
                    isDragOver ? "bg-indigo-100" : "bg-gray-50/50"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {clips.map((clip) => (
                    <TimelineClip
                        key={clip.id}
                        clip={clip}
                        pixelsPerSecond={pixelsPerSecond}
                    />
                ))}
            </div>
        </div>
    )
}
