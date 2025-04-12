import fs from 'fs';
import path from 'path';

export interface Thumbnail {
    width: number;
    height: number;
    image: string;
    filePath?: string; // Only present if path was provided
}

export const generateThumbnails = (
    file: File,
    count: number = 2,
    savePath?: string
): Promise<Thumbnail[]> => {
    return new Promise((resolve, reject) => {
        const video = document.createElement("video");
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
            reject("Failed to get canvas context");
            return;
        }

        video.src = URL.createObjectURL(file);
        video.crossOrigin = "anonymous";
        video.preload = "metadata";

        video.onloadedmetadata = async () => {
            const duration = video.duration;
            const width = video.videoWidth;
            const height = video.videoHeight;

            canvas.width = width;
            canvas.height = height;

            const captureTimes = Array.from({ length: count }, (_, i) => (duration * (i + 1)) / (count + 1));
            const generatedThumbnails: Thumbnail[] = [];

            for (let i = 0; i < captureTimes.length; i++) {
                const time = captureTimes[i];

                await new Promise<void>((res) => {
                    video.currentTime = time;
                    video.onseeked = () => {
                        context.drawImage(video, 0, 0, width, height);
                        const image = canvas.toDataURL("image/jpeg");

                        const thumbnail: Thumbnail = { width, height, image };

                        if (savePath) {
                            const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
                            const fileName = `thumb-${Date.now()}-${i + 1}.jpg`;
                            const fullPath = path.join(savePath, fileName);
                            fs.writeFileSync(fullPath, base64Data, 'base64');
                            thumbnail.filePath = fullPath;
                        }

                        generatedThumbnails.push(thumbnail);
                        res();
                    };
                });
            }

            resolve(generatedThumbnails);
        };

        video.onerror = () => {
            reject("Error loading video");
        };
    });
};