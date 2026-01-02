'use client'

import { useState, useRef } from 'react'
import { Upload, Loader2, FileIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { uploadAsset } from '@/services/assets'
import { ProjectAsset } from '@/types/editor'

interface AssetUploaderProps {
    projectId: string
    userId: string
    onUploadComplete: (asset: ProjectAsset) => void
}

export const AssetUploader = ({ projectId, userId, onUploadComplete }: AssetUploaderProps) => {
    const [isDragging, setIsDragging] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const files = e.dataTransfer.files
        if (files.length > 0) {
            await handleUpload(files[0])
        }
    }

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            await handleUpload(e.target.files[0])
        }
    }

    const handleUpload = async (file: File) => {
        setIsUploading(true)
        try {
            const asset = await uploadAsset(file, projectId, userId);
            if (asset) {
                onUploadComplete(asset)
            }
        } catch (error) {
            console.error("Upload failed", error)
        } finally {
            setIsUploading(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    return (
        <Card
            className={cn(
                "border-2 border-dashed p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-gray-50/50 hover:bg-gray-100/50",
                isDragging ? "border-indigo-500 bg-indigo-50/50" : "border-gray-200",
                isUploading ? "opacity-50 pointer-events-none" : ""
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
        >
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*,video/*,audio/*"
                onChange={handleFileSelect}
            />
            {isUploading ? (
                <div className="flex flex-col items-center gap-2 py-4">
                    <Loader2 className="animate-spin text-indigo-600" size={24} />
                    <p className="text-xs text-gray-500">Uploading...</p>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-2 py-2">
                    <div className="bg-indigo-100 p-2 rounded-full">
                        <Upload className="text-indigo-600" size={16} />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-700">Click or drag file</p>
                        <p className="text-[10px] text-gray-400 mt-1">Images, Audio, Video</p>
                    </div>
                </div>
            )}
        </Card>
    )
}
