import { checkAuth } from "../auth";
import {
  generateThumbnails,
  generateThumbnailsInRange,
  generateThumbnailAtTime,
  Thumbnail,
} from "./convertVideoToThumb";

const isBrowser = typeof window !== "undefined";

/**
 * Generates thumbnails from a video file.
 *
 * Modes:
 * - Full duration thumbnails if only `count` is provided
 * - Range-based thumbnails if `startTime` and `endTime` are given
 * - Single thumbnail if `captureTime` is given
 */
const convertVideoToThumb = (
  file: File,
  options: {
    count?: number;
    savePath?: string;
    captureTime?: number;
    startTime?: number;
    endTime?: number;
  } = {}
): Promise<Thumbnail[]> => {

  if (!checkAuth()) {
    throw new Error("Unauthorized: Please call init() with a valid API key.");
  }

  if (!file) {
    throw new Error("File is required.");
  }

  const { count = 2, savePath, startTime, endTime, captureTime } = options;

  if (isBrowser && savePath) {
    throw new Error("Saving files to the system is not allowed in the browser.");
  }

  const path = isBrowser ? '' : savePath;

  // 🔹 Single time capture
  if (typeof captureTime === "number") {
    if (captureTime < 0) {
      throw new Error("captureTime must be >= 0.");
    }
    return generateThumbnailAtTime(file, captureTime, path).then((thumb) => [thumb]);
  }

  // 🔹 Range-based capture
  if (typeof startTime === "number" && typeof endTime === "number") {
    if (startTime >= endTime) {
      throw new Error("startTime must be less than endTime.");
    }
    return generateThumbnailsInRange(file, startTime, endTime, count, path);
  }

  // 🔹 Full video duration capture
  return generateThumbnails(file, count, path);
};

export { convertVideoToThumb };