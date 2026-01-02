export type AssetType = 'video' | 'audio' | 'image' | 'text';
export type TrackType = 'video' | 'audio' | 'text';

export interface ProjectAsset {
    id: string;
    project_id: string;
    name: string;
    type: AssetType;
    url: string;
    duration: number; // in seconds
    metadata: Record<string, any>; // width, height, etc.
    created_at: string;
}

export interface ProjectTrack {
    id: string;
    project_id: string;
    name: string;
    type: TrackType;
    order: number;
    is_muted: boolean;
    is_locked: boolean;
    created_at: string;
    clips?: ProjectClip[]; // Joined data
}

export interface ProjectClip {
    id: string;
    track_id: string;
    asset_id: string | null; // null for text/generated clips if you want, or link to asset
    name: string;
    start_time: number; // Position on timeline (seconds)
    duration: number; // Length of clip (seconds)
    offset: number; // Start point within the source asset (seconds)
    properties: ClipProperties;
    created_at: string;
    asset?: ProjectAsset; // Joined data
}

export interface ClipProperties {
    transform?: {
        x: number;
        y: number;
        scale: number;
        rotation: number;
    };
    opacity?: number;
    volume?: number;
    text_content?: string;
    text_style?: any;
    [key: string]: any;
}

export interface EditorState {
    project: {
        id: string;
        name: string;
    } | null;
    assets: ProjectAsset[];
    tracks: ProjectTrack[];
    currentTime: number;
    isPlaying: boolean;
    selectedClipId: string | null;
    zoomLevel: number;
}
