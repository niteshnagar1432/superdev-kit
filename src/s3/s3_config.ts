import { S3Client } from "@aws-sdk/client-s3";
import { getConfig } from "../auth";
import { deleteFileFromS3, uploadFileToS3, uploadLargeVideoToS3 } from "./s3";

export const getS3Client = () => {
    const s3_config = getConfig().s3_config;

    if (
        !s3_config?.access_key_id ||
        !s3_config?.secret_access_key ||
        !s3_config?.region
    ) {
        throw new Error("S3 not initialized. Call init() with S3 credentials.");
    }

    return new S3Client({
        region: s3_config.region,
        credentials: {
            accessKeyId: s3_config.access_key_id,
            secretAccessKey: s3_config.secret_access_key,
        },
    });
};

export const getS3Bucket = () => {
    const s3_config = getConfig().s3_config;

    if (!s3_config?.bucket_name) {
        throw new Error("S3 bucket not set. Call init() first.");
    }

    return s3_config.bucket_name;
};

export const getProjectName = () => {
    const s3_config = getConfig().s3_config;

    if (!s3_config?.project_name) {
        throw new Error("Project name not set. Call init() first.");
    }

    return s3_config.project_name;
};

export const AWS_S3 = {
    uploadFile: uploadFileToS3,
    uploadLargeVideo: uploadLargeVideoToS3,
    deleteFile: deleteFileFromS3,
};