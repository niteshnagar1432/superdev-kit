import { checkAuth } from "../auth";
import { generateThumbnails, Thumbnail } from "./convertVideoToThumb";

/**
 * Wrapper to validate auth and inputs before generating thumbnails
 */
const isBrowser = typeof window !== 'undefined'; // Check if running in the browser

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

    // If it's a browser environment, do not allow savePath
    if (isBrowser && savePath) {
        throw new Error("Saving files to the system is not allowed in the browser. Save path is ignored.");
    }

    return generateThumbnails(file, count, isBrowser ? '' : savePath);
};

export { convertVideoToThumb };
