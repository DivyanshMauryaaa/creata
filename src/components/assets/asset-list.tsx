'use client'

import { ProjectAsset } from '@/types/editor'
import { Trash2, Music, Type, Image as ImageIcon, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AssetListProps {
    assets: ProjectAsset[]
    onDelete: (asset: ProjectAsset) => void
}

export const AssetList = ({ assets, onDelete }: AssetListProps) => {

    if (assets.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                <p className="text-sm">No assets yet</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 gap-2 mt-4">
            {assets.map((asset) => (
                <div key={asset.id} className="group relative aspect-square bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                    {/* Thumbnail */}
                    {asset.type === 'image' && (
                        <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                    )}
                    {asset.type === 'video' && (
                        <video src={asset.url} className="w-full h-full object-cover" />
                    )}
                    {(asset.type === 'audio') && (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <Music className="text-gray-400" size={24} />
                        </div>
                    )}
                    {(asset.type === 'text') && (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <Type className="text-gray-400" size={24} />
                        </div>
                    )}

                    {/* Overlay / Actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                                e.stopPropagation()
                                onDelete(asset)
                            }}
                        >
                            <Trash2 size={14} />
                        </Button>
                    </div>

                    {/* Type Indicator */}
                    <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                        {asset.type.toUpperCase()}
                    </div>
                </div>
            ))}
        </div>
    )
}
