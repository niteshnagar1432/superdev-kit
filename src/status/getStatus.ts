import { checkAuth, getConfig } from "../auth";
import statusCodes from "./statusCodes";

interface StatusCodeResponse {
    status?: boolean;
    message?: string;
    status_code?: number;
}

export function getStatus(
    status: number,
    config?: {
        status_code?: boolean;
        status_message?: boolean;
        status_boolean?: boolean;
    }
): StatusCodeResponse {
    if (!status) throw new Error("Status code is required.");
    if (!checkAuth())
        throw new Error("Unauthorized: Please call init() with a valid API key.");

    const statusData = statusCodes[status];
    if (!statusData) throw new Error(`Invalid status code: ${status}`);

    const userConfig = config || getConfig().status_code_config;

    const response: StatusCodeResponse = {};
    if (userConfig?.status_code) response.status_code = statusData.status_code;
    if (userConfig?.status_message) response.message = statusData.message;
    if (userConfig?.status_boolean) response.status = statusData.status;

    return response;
}
