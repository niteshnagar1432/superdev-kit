interface StatusCodeEntry {
    status: boolean;
    message: string;
    status_code: number;
}

const statusCodes: Record<number, StatusCodeEntry> = {
    // Informational
    100: { status: true, message: "Continue", status_code: 100 },
    101: { status: true, message: "Switching Protocols", status_code: 101 },
    102: { status: true, message: "Processing", status_code: 102 },
    103: { status: true, message: "Early Hints", status_code: 103 },

    // Success
    200: { status: true, message: "OK", status_code: 200 },
    201: { status: true, message: "Created", status_code: 201 },
    202: { status: true, message: "Accepted", status_code: 202 },
    203: { status: true, message: "Non-Authoritative Information", status_code: 203 },
    204: { status: true, message: "No Content", status_code: 204 },
    205: { status: true, message: "Reset Content", status_code: 205 },
    206: { status: true, message: "Partial Content", status_code: 206 },
    207: { status: true, message: "Multi-Status", status_code: 207 },
    208: { status: true, message: "Already Reported", status_code: 208 },
    226: { status: true, message: "IM Used", status_code: 226 },

    // Redirection
    300: { status: true, message: "Multiple Choices", status_code: 300 },
    301: { status: true, message: "Moved Permanently", status_code: 301 },
    302: { status: true, message: "Found", status_code: 302 },
    303: { status: true, message: "See Other", status_code: 303 },
    304: { status: true, message: "Not Modified", status_code: 304 },
    305: { status: true, message: "Use Proxy", status_code: 305 },
    307: { status: true, message: "Temporary Redirect", status_code: 307 },
    308: { status: true, message: "Permanent Redirect", status_code: 308 },

    // Client Error
    400: { status: false, message: "Bad Request", status_code: 400 },
    401: { status: false, message: "Unauthorized", status_code: 401 },
    402: { status: false, message: "Payment Required", status_code: 402 },
    403: { status: false, message: "Forbidden", status_code: 403 },
    404: { status: false, message: "Not Found", status_code: 404 },
    405: { status: false, message: "Method Not Allowed", status_code: 405 },
    406: { status: false, message: "Not Acceptable", status_code: 406 },
    407: { status: false, message: "Proxy Authentication Required", status_code: 407 },
    408: { status: false, message: "Request Timeout", status_code: 408 },
    409: { status: false, message: "Conflict", status_code: 409 },
    410: { status: false, message: "Gone", status_code: 410 },
    411: { status: false, message: "Length Required", status_code: 411 },
    412: { status: false, message: "Precondition Failed", status_code: 412 },
    413: { status: false, message: "Payload Too Large", status_code: 413 },
    414: { status: false, message: "URI Too Long", status_code: 414 },
    415: { status: false, message: "Unsupported Media Type", status_code: 415 },
    416: { status: false, message: "Range Not Satisfiable", status_code: 416 },
    417: { status: false, message: "Expectation Failed", status_code: 417 },
    418: { status: false, message: "I'm a teapot", status_code: 418 },
    421: { status: false, message: "Misdirected Request", status_code: 421 },
    422: { status: false, message: "Unprocessable Entity", status_code: 422 },
    423: { status: false, message: "Locked", status_code: 423 },
    424: { status: false, message: "Failed Dependency", status_code: 424 },
    425: { status: false, message: "Too Early", status_code: 425 },
    426: { status: false, message: "Upgrade Required", status_code: 426 },
    428: { status: false, message: "Precondition Required", status_code: 428 },
    429: { status: false, message: "Too Many Requests", status_code: 429 },
    431: { status: false, message: "Request Header Fields Too Large", status_code: 431 },
    451: { status: false, message: "Unavailable For Legal Reasons", status_code: 451 },

     // 5** Server Error
    500: { status: false, message: "Internal Server Error", status_code: 500 },
    501: { status: false, message: "Not Implemented", status_code: 501 },
    502: { status: false, message: "Bad Gateway", status_code: 502 },
    503: { status: false, message: "Service Unavailable", status_code: 503 },
    504: { status: false, message: "Gateway Timeout", status_code: 504 },
    505: { status: false, message: "HTTP Version Not Supported", status_code: 505 },
    506: { status: false, message: "Variant Also Negotiates", status_code: 506 },
    507: { status: false, message: "Insufficient Storage", status_code: 507 },
    508: { status: false, message: "Loop Detected", status_code: 508 },
    510: { status: false, message: "Not Extended", status_code: 510 },
    511: { status: false, message: "Network Authentication Required", status_code: 511 },
};

export default statusCodes;