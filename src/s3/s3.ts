import {
    S3Client,
    CreateMultipartUploadCommand,
    UploadPartCommand,
    CompleteMultipartUploadCommand,
    CompletedPart,
    PutObjectCommandOutput,
    CompleteMultipartUploadCommandOutput,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getProjectName, getS3Bucket, getS3Client } from "./s3_config";

/**
 * Get a fresh S3 client instance.
 */
const getFreshS3Client = (): S3Client => getS3Client();

/**
 * Generate a unique file name based on timestamp and random number.
 */
const generateUniqueId = (): string => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1_000_000);
    return `${timestamp}-${randomNum}`;
};

/**
 * Upload a file to S3 using AWS SDK lib-storage Upload (auto multipart if needed)
 */
export const uploadFileToS3 = async (
    file: File,
    onProgress: (percentage: number) => void = () => { },
    folder?: string
): Promise<PutObjectCommandOutput> => {
    if (!file) throw new Error("File is required for upload");

    const uniqueFileName = `${generateUniqueId()}${file.name.substring(file.name.lastIndexOf("."))}`;
    const key = folder
        ? getProjectName() ? `${getProjectName()}/${folder}/${uniqueFileName}` : `${folder}/${uniqueFileName}`
        : getProjectName() ? `${getProjectName()}/${uniqueFileName}` : `${uniqueFileName}`;

    const params = {
        Bucket: getS3Bucket(),
        Key: key,
        Body: file,
        ContentType: file.type,
        ChecksumAlgorithm: "CRC32" as const, // Corrected type for ChecksumAlgorithm
    };

    try {
        const uploader = new Upload({
            client: getFreshS3Client(),
            params,
            partSize: 5 * 1024 * 1024, // 5MB
            leavePartsOnError: false,
        });

        uploader.on("httpUploadProgress", (progress) => {
            if (progress.total && progress.loaded !== undefined) {
                const percent = (progress.loaded / progress.total) * 100;
                onProgress(Math.round(percent));
            }
        });

        const result = await uploader.done();
        return result as PutObjectCommandOutput;
    } catch (error: unknown) {
        console.error("S3 Upload Error:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to upload file: ${error.message}`);
        }
        throw new Error("Unknown error occurred during upload");
    }
};

/**
 * Upload a large video file manually using multipart upload.
 */
export const uploadLargeVideoToS3 = async (
    file: File,
    onProgress: (percentage: number) => void = () => { },
    folder: string = "videos"
): Promise<CompleteMultipartUploadCommandOutput> => {
    if (!file) throw new Error("File is required for upload");

    const s3Client = getFreshS3Client();
    const bucketName = getS3Bucket();

    const uniqueFileName = `${Date.now()}-${file.name}`;
    const key = getProjectName() ? `${getProjectName()}/${folder}/${uniqueFileName}` : `${folder}/${uniqueFileName}`;

    const partSize = 5 * 1024 * 1024; // 5MB
    const totalParts = Math.ceil(file.size / partSize);
    const parts: CompletedPart[] = [];

    try {
        const createCommand = new CreateMultipartUploadCommand({
            Bucket: bucketName,
            Key: key,
            ContentType: file.type,
        });

        const createResp = await s3Client.send(createCommand);
        const uploadId = createResp.UploadId;
        if (!uploadId) throw new Error("Failed to initiate multipart upload");

        const uploadPromises = Array.from({ length: totalParts }, async (_, index) => {
            const start = index * partSize;
            const end = Math.min(start + partSize, file.size);
            const partBlob = file.slice(start, end);
            const partBuffer = await partBlob.arrayBuffer();

            // Convert ArrayBuffer to Uint8Array
            const partData = new Uint8Array(partBuffer);

            const response = await s3Client.send(
                new UploadPartCommand({
                    Bucket: bucketName,
                    Key: key,
                    UploadId: uploadId,
                    PartNumber: index + 1,
                    Body: partData, // Use Uint8Array instead of ArrayBuffer
                })
            );

            if (!response.ETag) {
                throw new Error(`Missing ETag for part ${index + 1}`);
            }

            parts.push({
                PartNumber: index + 1,
                ETag: response.ETag,
            });

            onProgress(Math.round(((index + 1) / totalParts) * 100));
        });

        await Promise.all(uploadPromises);
        parts.sort((a, b) => (a.PartNumber ?? 0) - (b.PartNumber ?? 0));

        const completeCommand = new CompleteMultipartUploadCommand({
            Bucket: bucketName,
            Key: key,
            UploadId: uploadId,
            MultipartUpload: {
                Parts: parts,
            },
        });

        return await s3Client.send(completeCommand);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Multipart Upload Failed:", error);
            throw new Error(`Upload failed: ${error.message}`);
        }
        throw new Error("Unknown error during large file upload");
    }
};


/**
 * Delete a file from S3 bucket
 * @param key The key (path) of the file in S3 to delete
 */
export const deleteFileFromS3 = async (key: string): Promise<boolean> => {
    if (!key) throw new Error("Key is required to delete the file");

    try {
        const s3Client = getFreshS3Client();
        const deleteCommand = new DeleteObjectCommand({
            Bucket: getS3Bucket(),
            Key: key,
        });

        await s3Client.send(deleteCommand);
        return true;
    } catch (error: unknown) {
        console.error("Failed to delete file:", error);
        if (error instanceof Error) {
            throw new Error(`S3 deletion error: ${error.message}`);
        }
        throw new Error("Unknown error during S3 file deletion");
    }
};