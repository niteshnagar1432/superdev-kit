export interface Thumbnail {
    width: number;
    height: number;
    image: string;
}

export const generateThumbnails = (
    file: File,
    count: number = 2,
): Promise<Thumbnail[]> => {
    return new Promise((resolve, reject) => {
        const video = document.createElement("video");
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        // Type assertion to bypass TypeScript error
        (canvas as HTMLCanvasElement & { willReadFrequently: boolean }).willReadFrequently = true;

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

export const generateThumbnailAtTime = (
    file: File,
    timestamp: number,
): Promise<Thumbnail> => {
    return new Promise((resolve, reject) => {
        const isBrowser = typeof window !== 'undefined';
        const video = document.createElement("video");
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        (canvas as HTMLCanvasElement & { willReadFrequently: boolean }).willReadFrequently = true;

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

            if (timestamp > duration) {
                reject(`Timestamp ${timestamp}s exceeds video duration of ${duration}s`);
                return;
            }

            canvas.width = width;
            canvas.height = height;

            video.currentTime = timestamp;

            video.onseeked = () => {
                context.drawImage(video, 0, 0, width, height);
                const image = canvas.toDataURL("image/jpeg");
                const thumbnail: Thumbnail = { width, height, image };

                resolve(thumbnail);
            };
        };

        video.onerror = () => {
            reject("Error loading video");
        };
    });
};

export const generateThumbnailsInRange = (
    file: File,
    startTime: number,
    endTime: number,
    count: number = 2
): Promise<Thumbnail[]> => {
    return new Promise((resolve, reject) => {
        const isBrowser = typeof window !== 'undefined';
        const video = document.createElement("video");
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        (canvas as HTMLCanvasElement & { willReadFrequently: boolean }).willReadFrequently = true;

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

            if (startTime >= endTime || startTime >= duration || endTime > duration) {
                reject(`Invalid startTime/endTime. Video duration is ${duration}s`);
                return;
            }

            canvas.width = width;
            canvas.height = height;

            const interval = (endTime - startTime) / (count + 1);
            const timestamps = Array.from({ length: count }, (_, i) => startTime + interval * (i + 1));
            const thumbnails: Thumbnail[] = [];

            for (let i = 0; i < timestamps.length; i++) {
                const time = timestamps[i];

                await new Promise<void>((res) => {
                    video.currentTime = time;
                    video.onseeked = () => {
                        context.drawImage(video, 0, 0, width, height);
                        const image = canvas.toDataURL("image/jpeg");
                        const thumbnail: Thumbnail = { width, height, image };

                        thumbnails.push(thumbnail);
                        res();
                    };
                });
            }

            resolve(thumbnails);
        };

        video.onerror = () => {
            reject("Error loading video");
        };
    });
};