'use client'

import { ProjectTrack, ProjectClip, ProjectAsset } from '@/types/editor'
import { TimelineTrack } from './timeline-track'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface TimelineProps {
    tracks: ProjectTrack[]
    currentTime: number
    setCurrentTime: (time: number) => void
    onDropAsset: (asset: ProjectAsset, trackId: string, startTime: number) => void
    onAddTrack: () => void
    pixelsPerSecond?: number
}

export const Timeline = ({
    tracks,
    currentTime,
    setCurrentTime,
    onDropAsset,
    onAddTrack,
    pixelsPerSecond = 30
}: TimelineProps) => {

    return (
        <div className="h-full w-full flex flex-col bg-white border-t border-gray-200 overflow-hidden">
            {/* Timeline Header / Ruler */}
            <div className="h-8 border-b border-gray-200 bg-gray-50 flex items-center justify-between px-4">
                <span className="text-xs text-gray-400">00:00</span>
                <Button variant="ghost" size="sm" onClick={onAddTrack} className="h-6 text-xs gap-1">
                    <Plus size={12} /> Add Track
                </Button>
            </div>

            {/* Tracks Container */}
            <div className="flex-1 overflow-y-auto overflow-x-auto relative">
                {tracks.length === 0 && (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        No tracks yet. Add a track or drag an asset here.
                    </div>
                )}
                {tracks.map((track) => (
                    <TimelineTrack
                        key={track.id}
                        track={track}
                        clips={track.clips || []}
                        pixelsPerSecond={pixelsPerSecond}
                        onDropAsset={onDropAsset}
                    />
                ))}

                {/* Playhead Line */}
                <div
                    className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 pointer-events-none"
                    style={{ left: `${160 + currentTime * pixelsPerSecond}px` }}
                />
            </div>
        </div>
    )
}
