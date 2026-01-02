'use client'

import { useState, useRef, useEffect } from 'react'
import { ProjectClip, ProjectTrack } from '@/types/editor'
import { cn } from '@/lib/utils'

interface TimelineClipProps {
    clip: ProjectClip
    pixelsPerSecond: number
    isSelected?: boolean
    onSelect?: (clipId: string) => void
    onUpdate?: (clipId: string, updates: Partial<ProjectClip>) => void
    onMoveToTrack?: (clipId: string, newTrackId: string, newStartTime: number) => void
    allClipsInTrack?: ProjectClip[]
    trackId: string
    trackIndex: number
    allTracks: ProjectTrack[]
}

const GRID_SNAP_INTERVAL = 0.5 // Snap to 0.5 second intervals
const MIN_DURATION = 0.1 // Minimum clip duration in seconds
const TRACK_HEIGHT = 64 // Height of each track in pixels

export const TimelineClip = ({
    clip,
    pixelsPerSecond,
    isSelected = false,
    onSelect,
    onUpdate,
    onMoveToTrack,
    allClipsInTrack = [],
    trackId,
    trackIndex,
    allTracks
}: TimelineClipProps) => {
    const [isDragging, setIsDragging] = useState(false)
    const [isResizing, setIsResizing] = useState<'left' | 'right' | null>(null)
    const [dragPreview, setDragPreview] = useState<{ trackOffset: number; startTime: number } | null>(null)
    const dragStartRef = useRef({ x: 0, y: 0, startTime: 0, duration: 0, offset: 0, trackIndex: 0 })

    const width = clip.duration * pixelsPerSecond
    const left = clip.start_time * pixelsPerSecond

    // Snap to grid helper
    const snapToGrid = (time: number) => {
        return Math.round(time / GRID_SNAP_INTERVAL) * GRID_SNAP_INTERVAL
    }

    // Check for overlaps with other clips
    const checkOverlap = (newStartTime: number, newDuration: number, clipsToCheck: ProjectClip[] = allClipsInTrack) => {
        const newEndTime = newStartTime + newDuration

        for (const otherClip of clipsToCheck) {
            if (otherClip.id === clip.id) continue

            const otherEndTime = otherClip.start_time + otherClip.duration

            // Check if clips overlap
            if (
                (newStartTime >= otherClip.start_time && newStartTime < otherEndTime) ||
                (newEndTime > otherClip.start_time && newEndTime <= otherEndTime) ||
                (newStartTime <= otherClip.start_time && newEndTime >= otherEndTime)
            ) {
                return true
            }
        }
        return false
    }

    // Handle clip dragging
    const handleMouseDown = (e: React.MouseEvent) => {
        if (isResizing) return

        e.stopPropagation()
        setIsDragging(true)
        dragStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            startTime: clip.start_time,
            duration: clip.duration,
            offset: clip.offset,
            trackIndex: trackIndex
        }

        onSelect?.(clip.id)
    }

    // Handle resize start
    const handleResizeStart = (e: React.MouseEvent, edge: 'left' | 'right') => {
        e.stopPropagation()
        setIsResizing(edge)
        dragStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            startTime: clip.start_time,
            duration: clip.duration,
            offset: clip.offset,
            trackIndex: trackIndex
        }

        onSelect?.(clip.id)
    }

    useEffect(() => {
        if (!isDragging && !isResizing) return

        const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - dragStartRef.current.x
            const deltaY = e.clientY - dragStartRef.current.y
            const deltaTime = deltaX / pixelsPerSecond

            if (isDragging) {
                // Calculate new start time
                let newStartTime = dragStartRef.current.startTime + deltaTime
                newStartTime = Math.max(0, snapToGrid(newStartTime))

                // Calculate track offset (how many tracks up/down)
                const trackOffset = Math.round(deltaY / TRACK_HEIGHT)

                // Update drag preview for visual feedback
                setDragPreview({ trackOffset, startTime: newStartTime })

                // For now, just update position within same track
                // Cross-track movement will be handled on mouse up
                if (trackOffset === 0) {
                    if (!checkOverlap(newStartTime, clip.duration)) {
                        onUpdate?.(clip.id, { start_time: newStartTime })
                    }
                }
            } else if (isResizing === 'left') {
                // Resize from left (trim start)
                let newStartTime = dragStartRef.current.startTime + deltaTime
                newStartTime = Math.max(0, snapToGrid(newStartTime))

                const newDuration = dragStartRef.current.duration - (newStartTime - dragStartRef.current.startTime)
                const newOffset = dragStartRef.current.offset + (newStartTime - dragStartRef.current.startTime)

                if (newDuration >= MIN_DURATION && !checkOverlap(newStartTime, newDuration)) {
                    onUpdate?.(clip.id, {
                        start_time: newStartTime,
                        duration: newDuration,
                        offset: Math.max(0, newOffset)
                    })
                }
            } else if (isResizing === 'right') {
                // Resize from right (trim end)
                let newDuration = dragStartRef.current.duration + deltaTime
                newDuration = Math.max(MIN_DURATION, snapToGrid(newDuration))

                if (!checkOverlap(clip.start_time, newDuration)) {
                    onUpdate?.(clip.id, { duration: newDuration })
                }
            }
        }

        const handleMouseUp = (e: MouseEvent) => {
            if (isDragging && dragPreview && dragPreview.trackOffset !== 0) {
                // Calculate target track index
                const targetTrackIndex = dragStartRef.current.trackIndex + dragPreview.trackOffset

                // Check if target track exists
                if (targetTrackIndex >= 0 && targetTrackIndex < allTracks.length) {
                    const targetTrack = allTracks[targetTrackIndex]

                    // Calculate new start time
                    const deltaX = e.clientX - dragStartRef.current.x
                    const deltaTime = deltaX / pixelsPerSecond
                    let newStartTime = dragStartRef.current.startTime + deltaTime
                    newStartTime = Math.max(0, snapToGrid(newStartTime))

                    // Check for overlaps in target track
                    const targetTrackClips = targetTrack.clips || []
                    if (!checkOverlap(newStartTime, clip.duration, targetTrackClips)) {
                        // Move clip to target track
                        onMoveToTrack?.(clip.id, targetTrack.id, newStartTime)
                    }
                }
            }

            setIsDragging(false)
            setIsResizing(null)
            setDragPreview(null)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging, isResizing, clip, pixelsPerSecond, onUpdate, onMoveToTrack, allClipsInTrack, trackId, allTracks])

    return (
        <div
            className={cn(
                "absolute h-full rounded-md border text-xs px-2 flex items-center overflow-hidden whitespace-nowrap transition-all group",
                isDragging && "opacity-70 cursor-grabbing shadow-lg z-20",
                !isDragging && "cursor-grab hover:brightness-110",
                isSelected && "ring-2 ring-indigo-500 ring-offset-1 z-10",
                clip.asset?.type === 'video' && "bg-blue-200 border-blue-400 text-blue-800",
                clip.asset?.type === 'audio' && "bg-green-200 border-green-400 text-green-800",
                clip.asset?.type === 'image' && "bg-purple-200 border-purple-400 text-purple-800",
            )}
            style={{
                width: `${width}px`,
                left: `${dragPreview ? dragPreview.startTime * pixelsPerSecond : left}px`,
                transform: dragPreview ? `translateY(${dragPreview.trackOffset * TRACK_HEIGHT}px)` : undefined,
            }}
            onMouseDown={handleMouseDown}
            title={clip.name}
        >
            {/* Left resize handle */}
            <div
                className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
                onMouseDown={(e) => handleResizeStart(e, 'left')}
            />

            {/* Clip content */}
            <span className="truncate pointer-events-none">{clip.name}</span>

            {/* Right resize handle */}
            <div
                className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
                onMouseDown={(e) => handleResizeStart(e, 'right')}
            />
        </div>
    )
}
