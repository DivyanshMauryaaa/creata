'use client'

import { useState, useRef, useEffect } from 'react'
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
    selectedClipId?: string | null
    onSelectClip?: (clipId: string) => void
    onUpdateClip?: (clipId: string, updates: Partial<ProjectClip>) => void
    onMoveClipToTrack?: (clipId: string, targetTrackId: string, newStartTime: number) => void
}

// Helper to format time as MM:SS
const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export const Timeline = ({
    tracks,
    currentTime,
    setCurrentTime,
    onDropAsset,
    onAddTrack,
    pixelsPerSecond = 30,
    selectedClipId,
    onSelectClip,
    onUpdateClip,
    onMoveClipToTrack
}: TimelineProps) => {
    const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false)
    const rulerRef = useRef<HTMLDivElement>(null)

    // Calculate max duration from all clips
    const maxDuration = Math.max(
        10, // Minimum 10 seconds
        ...tracks.flatMap(track =>
            (track.clips || []).map(clip => clip.start_time + clip.duration)
        )
    )

    // Generate time markers (every second, but show label every 5 seconds based on zoom)
    const timeMarkers = []
    const markerInterval = pixelsPerSecond > 20 ? 1 : 5 // Show more markers when zoomed in
    for (let i = 0; i <= Math.ceil(maxDuration); i += markerInterval) {
        timeMarkers.push(i)
    }

    // Handle ruler click for scrubbing
    const handleRulerClick = (e: React.MouseEvent) => {
        if (!rulerRef.current) return
        const rect = rulerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - 160 // Subtract track header width
        const time = Math.max(0, x / pixelsPerSecond)
        setCurrentTime(time)
    }

    // Handle playhead dragging
    const handlePlayheadMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsDraggingPlayhead(true)
    }

    useEffect(() => {
        if (!isDraggingPlayhead) return

        const handleMouseMove = (e: MouseEvent) => {
            if (!rulerRef.current) return
            const rect = rulerRef.current.getBoundingClientRect()
            const x = e.clientX - rect.left - 160 // Subtract track header width
            const time = Math.max(0, x / pixelsPerSecond)
            setCurrentTime(time)
        }

        const handleMouseUp = () => {
            setIsDraggingPlayhead(false)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDraggingPlayhead, pixelsPerSecond, setCurrentTime])

    return (
        <div className="h-full w-full flex flex-col bg-white border-t border-gray-200 overflow-hidden">
            {/* Timeline Header / Ruler */}
            <div
                ref={rulerRef}
                className="h-8 border-b border-gray-200 bg-gray-50 flex items-center justify-between cursor-pointer select-none"
                onClick={handleRulerClick}
            >
                <div className="flex items-center h-full w-full">
                    {/* Track header spacer */}
                    <div className="w-40 border-r border-gray-200 flex items-center px-4">
                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onAddTrack(); }} className="h-6 text-xs gap-1">
                            <Plus size={12} /> Track
                        </Button>
                    </div>

                    {/* Time markers */}
                    <div className="flex-1 relative h-full">
                        {timeMarkers.map((time) => (
                            <div
                                key={time}
                                className="absolute top-0 h-full flex flex-col items-start justify-center"
                                style={{ left: `${time * pixelsPerSecond}px` }}
                            >
                                <div className="w-px h-2 bg-gray-300" />
                                <span className="text-[10px] text-gray-400 ml-1">{formatTime(time)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tracks Container */}
            <div className="flex-1 overflow-y-auto overflow-x-auto relative">
                {tracks.length === 0 && (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        No tracks yet. Add a track or drag an asset here.
                    </div>
                )}
                {tracks.map((track, index) => (
                    <TimelineTrack
                        key={track.id}
                        track={track}
                        clips={track.clips || []}
                        pixelsPerSecond={pixelsPerSecond}
                        onDropAsset={onDropAsset}
                        selectedClipId={selectedClipId}
                        onSelectClip={onSelectClip}
                        onUpdateClip={onUpdateClip}
                        onMoveClipToTrack={onMoveClipToTrack}
                        trackIndex={index}
                        allTracks={tracks}
                    />
                ))}

                {/* Playhead Line */}
                <div
                    className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-30 cursor-ew-resize"
                    style={{ left: `${160 + currentTime * pixelsPerSecond}px` }}
                    onMouseDown={handlePlayheadMouseDown}
                >
                    {/* Playhead handle */}
                    <div className="absolute -top-1 -left-1.5 w-3 h-3 bg-red-500 rounded-full cursor-ew-resize" />
                </div>
            </div>
        </div>
    )
}
