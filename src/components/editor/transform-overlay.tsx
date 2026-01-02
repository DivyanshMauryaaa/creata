'use client'

import React, { useState, useRef, useEffect } from 'react';
import { ProjectClip } from '@/types/editor';
import { cn } from '@/lib/utils';

interface TransformOverlayProps {
    selectedClip: ProjectClip | null;
    onUpdate: (updates: Partial<ProjectClip>) => void;
    containerRef: React.RefObject<HTMLDivElement>;
}

export const TransformOverlay: React.FC<TransformOverlayProps> = ({
    selectedClip,
    onUpdate,
    containerRef
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [activeHandle, setActiveHandle] = useState<string | null>(null);
    const startRef = useRef({ x: 0, y: 0, propX: 0, propY: 0, scale: 1, rotation: 0 });

    if (!selectedClip || !selectedClip.properties?.transform) return null;

    const { x, y, scale, rotation } = selectedClip.properties.transform;
    const projectScale = scale / 100;

    // We need to calculate the actual display coordinates based on the container size
    // Assuming composition is 1920x1080
    const COMP_WIDTH = 1920;
    const COMP_HEIGHT = 1080;

    const getDisplayScale = () => {
        if (!containerRef.current) return 1;
        return containerRef.current.clientWidth / COMP_WIDTH;
    };

    const dScale = getDisplayScale();
    const displayX = (COMP_WIDTH / 2 + x) * dScale;
    const displayY = (COMP_HEIGHT / 2 + y) * dScale;

    // Visual dimensions (assuming internal content is full size of comp for simplicity, 
    // but typically it's the asset size. For now we use 1920x1080 base)
    const boxWidth = COMP_WIDTH * projectScale * dScale;
    const boxHeight = COMP_HEIGHT * projectScale * dScale;

    const handleMouseDown = (e: React.MouseEvent, type: string) => {
        e.stopPropagation();
        setIsDragging(true);
        setActiveHandle(type);
        startRef.current = {
            x: e.clientX,
            y: e.clientY,
            propX: x,
            propY: y,
            scale: scale,
            rotation: rotation
        };
    };

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            const deltaX = (e.clientX - startRef.current.x) / dScale;
            const deltaY = (e.clientY - startRef.current.y) / dScale;

            if (activeHandle === 'move') {
                onUpdate({
                    properties: {
                        ...selectedClip.properties,
                        transform: {
                            ...selectedClip.properties.transform!,
                            x: startRef.current.propX + deltaX,
                            y: startRef.current.propY + deltaY,
                        }
                    }
                });
            } else if (activeHandle?.startsWith('resize')) {
                // Simplified proportional resize
                const dragDist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                const isExpanding = deltaX > 0 || deltaY > 0;
                const scaleChange = (deltaX + deltaY) / 10; // Simple heuristic

                onUpdate({
                    properties: {
                        ...selectedClip.properties,
                        transform: {
                            ...selectedClip.properties.transform!,
                            scale: Math.max(10, startRef.current.scale + scaleChange),
                        }
                    }
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setActiveHandle(null);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, activeHandle, dScale, selectedClip, onUpdate]);

    return (
        <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: 50 }}
        >
            <div
                className={cn(
                    "absolute border-2 border-indigo-500 pointer-events-auto cursor-move",
                    isDragging && "border-opacity-50"
                )}
                style={{
                    width: boxWidth,
                    height: boxHeight,
                    left: displayX,
                    top: displayY,
                    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                }}
                onMouseDown={(e) => handleMouseDown(e, 'move')}
            >
                {/* Resize Handles */}
                {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(handle => (
                    <div
                        key={handle}
                        className={cn(
                            "absolute w-3 h-3 bg-white border-2 border-indigo-500 rounded-full",
                            handle === 'top-left' && "-top-1.5 -left-1.5 cursor-nwse-resize",
                            handle === 'top-right' && "-top-1.5 -right-1.5 cursor-nesw-resize",
                            handle === 'bottom-left' && "-bottom-1.5 -left-1.5 cursor-nesw-resize",
                            handle === 'bottom-right' && "-bottom-1.5 -right-1.5 cursor-nwse-resize",
                        )}
                        onMouseDown={(e) => handleMouseDown(e, `resize-${handle}`)}
                    />
                ))}
            </div>
        </div>
    );
};
