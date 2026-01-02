import React from 'react';
import { AbsoluteFill, Sequence, Video, Audio, Img } from 'remotion';
import { ProjectTrack } from '../types/editor';

interface MainCompositionProps {
    tracks: ProjectTrack[];
}

export const MainComposition: React.FC<MainCompositionProps> = ({ tracks }) => {
    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            {tracks.map((track) => {
                if (track.is_muted) return null;

                return (
                    <React.Fragment key={track.id}>
                        {track.clips?.map((clip) => {
                            const FPS = 30;
                            const startFrame = Math.round(clip.start_time * FPS);
                            const durationFrames = Math.round(clip.duration * FPS);
                            const offset = clip.offset || 0;

                            // Properties from DB
                            const { transform, opacity, volume } = clip.properties || {};

                            // Calculate CSS Transform
                            // Default to center (no translation) if undefined
                            const x = transform?.x || 0;
                            const y = transform?.y || 0;
                            const scale = (transform?.scale || 100) / 100;
                            const rotation = transform?.rotation || 0;

                            const style: React.CSSProperties = {
                                width: '100%',
                                height: '100%',
                                transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`,
                                opacity: opacity ?? 1,
                            };

                            // Skip if duration is invalid
                            if (durationFrames <= 0) return null;

                            return (
                                <Sequence
                                    key={clip.id}
                                    from={startFrame}
                                    durationInFrames={durationFrames}
                                >
                                    {clip.asset?.type === 'video' && (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={style}>
                                                <Video
                                                    src={clip.asset.url}
                                                    startFrom={Math.round(offset * FPS)}
                                                    volume={volume ?? 1}
                                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {clip.asset?.type === 'image' && (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={style}>
                                                <Img
                                                    src={clip.asset.url}
                                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {clip.asset?.type === 'audio' && (
                                        <Audio
                                            src={clip.asset.url}
                                            startFrom={Math.round(offset * FPS)}
                                            volume={volume ?? 1}
                                        />
                                    )}
                                    {clip.asset?.type === 'text' && (
                                        <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span className="text-white text-4xl font-bold drop-shadow-md">
                                                {clip.name}
                                            </span>
                                        </div>
                                    )}
                                </Sequence>
                            )
                        })}
                    </React.Fragment>
                )
            })}
        </AbsoluteFill>
    );
};
