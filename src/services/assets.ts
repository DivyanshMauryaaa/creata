import supabase from "@/lib/supabase";
import { ProjectAsset, AssetType } from "@/types/editor";
import { v4 as uuidv4 } from "uuid";

export const uploadAsset = async (
    file: File,
    projectId: string,
    userId: string
): Promise<ProjectAsset | null> => {
    try {
        const fileExt = file.name.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${projectId}/${fileName}`;

        // 1. Upload to Storage
        const { error: uploadError } = await supabase.storage
            .from("project-files")
            .upload(filePath, file);

        if (uploadError) {
            console.error("Error uploading file:", uploadError);
            return null;
        }

        // 2. Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from("project-files")
            .getPublicUrl(filePath);

        // 3. Determine Type and Metadata
        const type = getAssetType(file.type);
        let duration = 0;

        // Simple metadata extraction (could be improved with a library or hidden DOM elements)
        if (type === 'video' || type === 'audio') {
            duration = await getMediaDuration(file);
        }

        // 4. Insert into Database
        const newAsset: ProjectAsset = {
            id: uuidv4(),
            project_id: projectId,
            name: file.name,
            type: type,
            url: publicUrl,
            duration: duration,
            metadata: {
                size: file.size,
                mimeType: file.type,
            },
            created_at: new Date().toISOString(),
        };

        const { error: dbError } = await supabase
            .from("project_assets")
            .insert(newAsset);

        if (dbError) {
            console.error("Error saving asset to DB:", dbError);
            // Clean up storage if DB insert fails?
            return null;
        }

        return newAsset;
    } catch (error) {
        console.error("Unexpected error handling asset upload:", error);
        return null;
    }
};

export const getProjectAssets = async (projectId: string): Promise<ProjectAsset[]> => {
    const { data, error } = await supabase
        .from("project_assets")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching assets:", error);
        return [];
    }

    return data as ProjectAsset[];
};

export const deleteAsset = async (asset: ProjectAsset): Promise<boolean> => {
    try {
        // 1. Delete from Storage
        // Extract path from URL or reconstruct it if we followed a naming convention
        // Our path structure: projectId/fileName
        // We might need to store the storage path in the DB or extract it from the public URL
        // Assuming standard public URL format: .../project-files/projectId/fileName

        const urlParts = asset.url.split('project-files/');
        if (urlParts.length < 2) return false;
        const storagePath = urlParts[1];

        const { error: storageError } = await supabase.storage
            .from("project-files")
            .remove([storagePath]);

        if (storageError) {
            console.error("Error deleting from storage:", storageError);
            // Continue to delete from DB anyway?
        }

        // 2. Delete from Database
        const { error: dbError } = await supabase
            .from("project_assets")
            .delete()
            .eq("id", asset.id);

        if (dbError) {
            console.error("Error deleting from DB:", dbError);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error deleting asset:", error);
        return false;
    }
};

// Utils
const getAssetType = (mimeType: string): AssetType => {
    if (mimeType.startsWith("video/")) return "video";
    if (mimeType.startsWith("audio/")) return "audio";
    if (mimeType.startsWith("image/")) return "image";
    return "text"; // Fallback or handle documents
};

const getMediaDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
        const element = document.createElement(file.type.startsWith('video') ? 'video' : 'audio');
        element.preload = 'metadata';
        element.onloadedmetadata = () => {
            URL.revokeObjectURL(element.src);
            resolve(element.duration);
        };
        element.onerror = () => resolve(0);
        element.src = URL.createObjectURL(file);
    });
}
