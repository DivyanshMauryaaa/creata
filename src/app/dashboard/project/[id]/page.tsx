'use client'

import { useParams } from "next/navigation"
import { useEffect, useState, useRef, useMemo } from "react"
import {
    Play, Pause, SkipBack, SkipForward, Scissors, Copy, Trash2,
    Settings, Download, Plus, Image as ImageIcon, Type, Music,
    Video as VideoIcon, Monitor, MousePointer2,
    ZoomIn, ZoomOut, Undo2, Redo2, LayoutTemplate,
    ChevronRight, Clapperboard, Loader2
} from "lucide-react"
import { v4 as uuidv4 } from 'uuid'
import supabase from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ProjectAsset, ProjectTrack, ProjectClip } from "@/types/editor"
import { Player, PlayerRef } from '@remotion/player'
import { MainComposition } from '@/remotion/MainComposition'
import { getProjectAssets, deleteAsset } from "@/services/assets"
import { AssetUploader } from "@/components/assets/asset-uploader"
import { AssetList } from "@/components/assets/asset-list"
import { Timeline } from "@/components/editor/timeline"

const ProjectPage = () => {
    const params = useParams()
    const { id } = params
    const projectId = Array.isArray(id) ? id[0] : id || ""; // Ensure string

    const [project, setProject] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    // Hydration fix for Player
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Editor State
    const [assets, setAssets] = useState<ProjectAsset[]>([])
    const [tracks, setTracks] = useState<ProjectTrack[]>([])

    

    // UI State
    const [currentTime, setCurrentTime] = useState(0)
    const [activeTab, setActiveTab] = useState<'video' | 'audio' | 'text' | 'image'>('video')
    const [selectedClip, setSelectedClip] = useState<string | null>(null)
    const [zoomLevel, setZoomLevel] = useState(1)

    const [uploading, setUploading] = useState(false)

    // Fetch assets effect - must be before any conditional returns
    useEffect(() => {
        if (projectId) {
            fetchAssets();
        }
    }, [projectId])

    const fetchAssets = async () => {
        if (!projectId) return;
        const projectAssets = await getProjectAssets(projectId);
        setAssets(projectAssets);
    }

    // Calculate dynamic duration based on clips
    const FPS = 30
    const totalDurationInFrames = useMemo(() => {
        let maxEndTime = 10 // Minimum 10 seconds
        tracks.forEach(track => {
            track.clips?.forEach(clip => {
                const endTime = clip.start_time + clip.duration
                if (endTime > maxEndTime) maxEndTime = endTime
            })
        })
        return Math.ceil(maxEndTime * FPS)
    }, [tracks])

    // Hydration guard - AFTER all hooks
    if (!isMounted) {
        return <div className="flex h-full w-[90%] items-center justify-center"><Loader2 className="animate-spin" /></div>
    }

    const handleUploadComplete = (newAsset: ProjectAsset) => {
        setAssets(prev => [newAsset, ...prev])
    }

    const handleDeleteAsset = async (assetToDelete: ProjectAsset) => {
        const success = await deleteAsset(assetToDelete);
        if (success) {
            setAssets(prev => prev.filter(a => a.id !== assetToDelete.id))
        }
    }

    // Filter assets based on activeTab
    const filteredAssets = assets.filter(asset => {
        if (activeTab === 'video') return asset.type === 'video';
        if (activeTab === 'audio') return asset.type === 'audio';
        if (activeTab === 'image') return asset.type === 'image';
        return true;
    });

    // Logic to add asset to timeline at specific position
    const handleDropAsset = (asset: ProjectAsset, trackId: string, startTime: number) => {
        const newClip: ProjectClip = {
            id: uuidv4(),
            track_id: trackId,
            asset_id: asset.id,
            name: asset.name,
            start_time: startTime,
            duration: asset.duration || 5,
            offset: 0,
            properties: {},
            created_at: new Date().toISOString(),
            asset: asset
        }

        setTracks(prevTracks => {
            return prevTracks.map(track => {
                if (track.id === trackId) {
                    return {
                        ...track,
                        clips: [...(track.clips || []), newClip]
                    }
                }
                return track
            })
        })
    }

    // Add a new track
    const handleAddTrack = () => {
        const newTrack: ProjectTrack = {
            id: uuidv4(),
            project_id: projectId,
            name: `Video Track ${tracks.length + 1}`,
            type: 'video',
            order: tracks.length,
            is_muted: false,
            is_locked: false,
            created_at: new Date().toISOString(),
            clips: []
        }
        setTracks(prev => [...prev, newTrack])
    }

    // Handle drag start for assets
    const handleDragStart = (e: React.DragEvent, asset: ProjectAsset) => {
        e.dataTransfer.setData('application/json', JSON.stringify(asset))
        e.dataTransfer.effectAllowed = 'copy'
    }

    return (
        <div className="flex h-full w-[90%]">
            <div className="w-[20%] h-[93vh] p-4 border-r border-gray-200 flex flex-col gap-4">
                <p className="text-xl font-semibold">Assets</p>

                <AssetUploader
                    projectId={projectId}
                    userId="" // Supabase client handles auth so we might not need to pass userId explicitly if RLS relies on auth.uid()
                    onUploadComplete={handleUploadComplete}
                />

                <div className="flex gap-2 border-b border-gray-200 pb-2">
                    <TabButton icon={VideoIcon} label="Video" active={activeTab === 'video'} onClick={() => setActiveTab('video')} />
                    <TabButton icon={ImageIcon} label="Image" active={activeTab === 'image'} onClick={() => setActiveTab('image')} />
                    <TabButton icon={Music} label="Audio" active={activeTab === 'audio'} onClick={() => setActiveTab('audio')} />
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2">
                        {filteredAssets.map((asset) => (
                            <div
                                key={asset.id}
                                className="relative group cursor-grab active:cursor-grabbing"
                                draggable
                                onDragStart={(e) => handleDragStart(e, asset)}
                            >
                                <div className="aspect-square bg-gray-100 rounded-md overflow-hidden border border-gray-200 hover:ring-2 ring-indigo-500 transition-all">
                                    {asset.type === 'image' && <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />}
                                    {asset.type === 'video' && <video src={asset.url} className="w-full h-full object-cover" />}
                                    {(asset.type === 'audio') && <div className="w-full h-full flex items-center justify-center"><Music className="text-gray-400" /></div>}
                                </div>
                                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="destructive" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); handleDeleteAsset(asset); }}>
                                        <Trash2 size={12} />
                                    </Button>
                                </div>
                                <p className="text-[10px] text-gray-600 truncate mt-1">{asset.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Middle: Player & Timeline */}
            <div className="w-[60%] h-[93vh] flex flex-col">
                {/* Upper: Player */}
                <div className="flex-1 p-8 flex items-center justify-center bg-gray-50 border-b border-gray-200">
                    <div className="relative shadow-lg rounded-lg overflow-hidden border border-gray-200 bg-black w-[80%] aspect-video">
                        <Player
                            component={MainComposition}
                            inputProps={{ tracks }}
                            durationInFrames={totalDurationInFrames}
                            fps={FPS}
                            compositionWidth={1920}
                            compositionHeight={1080}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            controls
                        />
                    </div>
                </div>

                {/* Lower: Timeline */}
                <div className="h-[40%] bg-white border-t border-gray-200">
                    <Timeline
                        tracks={tracks}
                        currentTime={currentTime}
                        setCurrentTime={setCurrentTime}
                        onDropAsset={handleDropAsset}
                        onAddTrack={handleAddTrack}
                    />
                </div>
            </div>

            {/* Right: Properties */}
            <div className="w-[20%] p-4 h-[93vh] border-l border-gray-200">
                <p className="text-lg font-medium">Creata Agent</p>
                <div className="mt-4 text-sm text-gray-500">
                    Select a media from the timeline to start prompt editing.
                </div>
            </div>
        </div>
    )
}

const TabButton = ({ icon: Icon, label, active, onClick }: any) => (
    <Button
        variant="ghost"
        size="sm"
        onClick={onClick}
        className={cn(
            "flex-1 gap-1 px-2 text-xs font-medium transition-all",
            active
                ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
        )}
    >
        <Icon size={14} />
    </Button>
)

export default ProjectPage
