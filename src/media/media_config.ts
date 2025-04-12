import { checkAuth } from "../auth";
import { generateThumbnails, Thumbnail } from "./convertVideoToThumb";

/**
 * Wrapper to validate auth and inputs before generating thumbnails
 */
const convertVideoToThumb = (
    file: File,
    count: number = 2,
    savePath?: string
): Promise<Thumbnail[]> => {
    if (!checkAuth()) {
        throw new Error("Unauthorized: Please call init() with a valid API key.");
    }

    if (!file) {
        throw new Error("File is required.");
    }

    return generateThumbnails(file, count, savePath);
};

export { convertVideoToThumb };
