// utils/dateFormatter.ts

type DateInput = string | number | Date;

interface FormatOptions {
    format?: string;
    timeAgo?: boolean;
}

export const formatDate = (input: DateInput, options?: FormatOptions): string => {
    const { format = "YYYY-MM-DD HH:mm:ss", timeAgo = false } = options || {};
    let date: Date;

    if (input instanceof Date) {
        date = input;
    } else if (typeof input === "number") {
        date = new Date(input);
    } else if (typeof input === "string") {
        const parsed = new Date(input);
        if (isNaN(parsed.getTime())) throw new Error("Invalid date string.");
        date = parsed;
    } else {
        throw new Error("Unsupported date format.");
    }

    if (timeAgo) {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        const absDiff = Math.abs(diffInSeconds);

        const units = [
            { label: "year", seconds: 365 * 24 * 60 * 60 },
            { label: "month", seconds: 30 * 24 * 60 * 60 },
            { label: "week", seconds: 7 * 24 * 60 * 60 },
            { label: "day", seconds: 24 * 60 * 60 },
            { label: "hour", seconds: 60 * 60 },
            { label: "minute", seconds: 60 },
            { label: "second", seconds: 1 },
        ];

        for (const unit of units) {
            const value = Math.floor(absDiff / unit.seconds);
            if (value >= 1) {
                const plural = value > 1 ? "s" : "";
                return diffInSeconds > 0
                    ? `${value} ${unit.label}${plural} ago`
                    : `in ${value} ${unit.label}${plural}`;
            }
        }

        return "just now";
    }

    const pad = (n: number) => (n < 10 ? "0" + n : "" + n);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    const replacements: Record<string, string> = {
        YYYY: String(date.getFullYear()),
        MM: pad(date.getMonth() + 1),
        DD: pad(date.getDate()),
        HH: pad(date.getHours()),
        mm: pad(date.getMinutes()),
        ss: pad(date.getSeconds()),
        MMMM: months[date.getMonth()],
        MMM: months[date.getMonth()].substring(0, 3),
        dddd: days[date.getDay()],
        ddd: days[date.getDay()].substring(0, 3),
    };

    let output = format;
    for (const key of Object.keys(replacements).sort((a, b) => b.length - a.length)) {
        output = output.replace(new RegExp(key, 'g'), replacements[key]);
    }

    return output;
};
