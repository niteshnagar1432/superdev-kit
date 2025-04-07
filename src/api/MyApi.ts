// Change the import line
import axios from "axios";
import { getConfig } from "../auth";

// Define the possible token input type
type TokenInput = string | Record<string, string> | undefined;

declare const tokenLocal: string;

// Fix: Use plain object for headers typing
const buildHeaders = (token: TokenInput): Record<string, string> => {
    if (!token) return {};

    if (typeof token === "string") {
        return {
            Authorization: `Bearer ${token}`,
        };
    }

    return token;
};

interface ApiResponse<T = any> {
    status: number;
    message?: string;
    data?: T;
}


export const MyAPI = {
    GET: async <T = any>(url: string, token: TokenInput = ""): Promise<ApiResponse<T>> => {
        try {

            let userConfig = getConfig().api_config;

            const response = await axios.get<T>(
                userConfig?.base_url ? userConfig?.base_url + url : url,
                { headers: buildHeaders(token) }
            );
            return {
                status: response.status,
                data: response.data,
                message: (response.data as any)?.message || response.statusText,
            };
        } catch (error: any) {
            return handleError(error);
        }
    },

    POST: async <T = any>(url: string, data: any, token: TokenInput = ""): Promise<ApiResponse<T>> => {
        try {
            let userConfig = getConfig().api_config;
            const isFormData = data instanceof FormData;
            const headers = {
                ...buildHeaders(token),
                "Content-Type": isFormData ? "multipart/form-data" : "application/json",
            };
            const response = await axios.post<T>(
                userConfig?.base_url ? userConfig?.base_url + url : url,
                data,
                { headers }
            );
            return {
                status: response.status,
                data: response.data,
            };
        } catch (error: any) {
            return handleError(error);
        }
    },

    PUT: async <T = any>(url: string, data: any, token: TokenInput = ""): Promise<ApiResponse<T>> => {
        try {
            let userConfig = getConfig().api_config;
            const isFormData = data instanceof FormData;
            const headers = {
                ...buildHeaders(token),
                "Content-Type": isFormData ? "multipart/form-data" : "application/json",
            };
            const response = await axios.put<T>(
                userConfig?.base_url ? userConfig.base_url + url : url,
                data,
                { headers }
            );
            return {
                status: response.status,
                data: response.data,
            };
        } catch (error: any) {
            return handleError(error);
        }
    },

    PATCH: async <T = any>(url: string, data: any, token: TokenInput = ""): Promise<ApiResponse<T>> => {
        try {
            let userConfig = getConfig().api_config;
            const isFormData = data instanceof FormData;
            const headers = {
                ...buildHeaders(token),
                "Content-Type": isFormData ? "multipart/form-data" : "application/json",
            };
            const response = await axios.patch<T>(
                userConfig?.base_url ? userConfig.base_url + url : url,
                data,
                { headers }
            );
            return {
                status: response.status,
                data: response.data,
            };
        } catch (error: any) {
            return handleError(error);
        }
    },

    DELETE: async <T = any>(url: string, token: TokenInput = ""): Promise<ApiResponse<T>> => {
        try {
            let userConfig = getConfig().api_config;
            const headers = {
                ...buildHeaders(token),
                "Content-Type": "application/json",
            };
            const response = await axios.delete<T>(
                userConfig?.base_url ? userConfig.base_url + url : url,
                { headers }
            );
            return {
                status: response.status,
                data: response.data,
            };
        } catch (error: any) {
            return handleError(error);
        }
    },

    // 🆕 Proxy method: fetch from absolute URL without using base_url
    Proxy_Media: async (url: string): Promise<{ data: ArrayBuffer; contentType: string } | ApiResponse> => {
        try {
            const response = await axios.get(url, {
                responseType: "arraybuffer",
                maxRedirects: 5,
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                    Referer: "https://www.instagram.com/",
                    "Accept-Language": "en-US,en;q=0.9",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                },
            });

            return {
                data: response.data,
                contentType: response.headers["content-type"],
            };
        } catch (error: any) {
            return handleError(error);
        }
    }

};

// Error handling
const handleError = (error: any): ApiResponse => {
    let errorMessage = "An error occurred while processing your request.";

    if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
        return {
            status: error.response.status,
            message: errorMessage,
            data: error.response.data,
        };
    } else if (error.request) {
        return {
            status: 500,
            message: "No response received from server.",
        };
    } else {
        return {
            status: 500,
            message: error.message || errorMessage,
        };
    }
};
