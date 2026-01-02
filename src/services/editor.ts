import supabase from "@/lib/supabase";
import { ProjectTrack, ProjectClip } from "@/types/editor";

export const getProjectTracksWithClips = async (projectId: string): Promise<ProjectTrack[]> => {
    const { data: tracks, error: tracksError } = await supabase
        .from("project_tracks")
        .select(`
            *,
            clips:project_clips(*)
        `)
        .eq("project_id", projectId)
        .order("order", { ascending: true });

    if (tracksError) {
        console.error("Error fetching tracks:", tracksError);
        return [];
    }

    // Map clips back to tracks if needed (though select should handle it)
    return (tracks as any[]).map(track => ({
        ...track,
        clips: track.clips.map((clip: any) => ({
            ...clip,
            // Re-fetch or join asset if needed. For now assume asset data is handled separately or joined later.
        }))
    })) as ProjectTrack[];
};

export const createTrack = async (track: ProjectTrack): Promise<ProjectTrack | null> => {
    const { data, error } = await supabase
        .from("project_tracks")
        .insert(track)
        .select()
        .single();

    if (error) {
        console.error("Error creating track:", error);
        return null;
    }

    return data as ProjectTrack;
};

export const updateTrack = async (trackId: string, updates: Partial<ProjectTrack>): Promise<boolean> => {
    const { error } = await supabase
        .from("project_tracks")
        .update(updates)
        .eq("id", trackId);

    if (error) {
        console.error("Error updating track:", error);
        return false;
    }

    return true;
};

export const deleteTrack = async (trackId: string): Promise<boolean> => {
    const { error } = await supabase
        .from("project_tracks")
        .delete()
        .eq("id", trackId);

    if (error) {
        console.error("Error deleting track:", error);
        return false;
    }

    return true;
};

export const upsertClip = async (clip: ProjectClip): Promise<ProjectClip | null> => {
    // Properties need to be stringified or handled as JSONB if they aren't already
    const { data, error } = await supabase
        .from("project_clips")
        .upsert(clip)
        .select()
        .single();

    if (error) {
        console.error("Error upserting clip:", error);
        return null;
    }

    return data as ProjectClip;
};

export const updateClip = async (clipId: string, updates: Partial<ProjectClip>): Promise<boolean> => {
    const { error } = await supabase
        .from("project_clips")
        .update(updates)
        .eq("id", clipId);

    if (error) {
        console.error("Error updating clip:", error);
        return false;
    }

    return true;
};

export const deleteClip = async (clipId: string): Promise<boolean> => {
    const { error } = await supabase
        .from("project_clips")
        .delete()
        .eq("id", clipId);

    if (error) {
        console.error("Error deleting clip:", error);
        return false;
    }

    return true;
};
