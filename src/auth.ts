import { default_api_config, default_status_config } from "./config/default_config";

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
}

let internal_config: SuperDevKitConfig = {
    api_config: default_api_config,
    status_code_config: default_status_config,
    // date_config: null,
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
        }
    };
    console.log("✅ superdev-kit initialized");
}

export function checkAuth(): boolean {
    return isAuthenticated;
}

export function getConfig(): SuperDevKitConfig {
    return internal_config;
}
