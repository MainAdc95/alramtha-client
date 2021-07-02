import axios, { Method } from "axios";

export const isProduction: boolean = false;

export const domain = isProduction
    ? "https://www.alramsah.com"
    : `http://localhost:5000`;

// changed this line

export const apiImage = (
    image: string,
    size?: "s" | "m" | "l",
    q?: number
): string => {
    return `https://alramsah.s3.amazonaws.com/${image}`;
};

export const apiCall = <T>(
    method: Method,
    url: string,
    data?: any,
    server?: "out" | "in"
): Promise<T> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                method,
                url:
                    !server || server === "in"
                        ? `${domain + "/api"}${url}`
                        : url,
                data,
                withCredentials: true,
            });
            return resolve(res.data);
        } catch (err) {
            if (err.response) {
                return reject(
                    err.response.data.error?.message || "Internal Server Error!"
                );
            } else {
                return reject("Internal Server Error!");
            }
        }
    });
};
