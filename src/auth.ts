import { default_api_config, default_file_config, default_s3_config, default_status_config } from "./config/default_config";

let isAuthenticated = false;

interface SuperDevKitConfig {
    api_config?: {
        base_url?: string;
    };
    status_code_config?: {
        status_code?: boolean;
        status_message?: boolean;
        status_boolean?: boolean;
    };
    date_config?: object;
    s3_config?: {
        bucket_name?: string;
        access_key_id?: string;
        secret_access_key?: string;
        region?: string;
        project_name?: string;
    };
    file_config?: {
        service_status?: boolean;
    };
}

let internal_config: SuperDevKitConfig = {
    api_config: default_api_config,
    status_code_config: default_status_config,
    // date_config: null,
    s3_config: default_s3_config,
    file_config: default_file_config,
};

export function init(key: string, config: SuperDevKitConfig = {}) {
    isAuthenticated = true;
    internal_config = {
        ...internal_config,
        ...config,
        status_code_config: {
            ...default_status_config,
            ...(config.status_code_config || {}),
        },
        api_config: {
            ...default_api_config,
            ...(config.api_config || {}),
        },
        s3_config: {
            ...default_s3_config,
            ...(config.s3_config || {}),
        },
        file_config: {
            ...default_file_config,
            ...(config.file_config || {}),
        },
    };
    console.log("✅ superdev-kit initialized");
}

export function checkAuth(): boolean {
    return isAuthenticated;
}

export function getConfig(): SuperDevKitConfig {
    return internal_config;
}
