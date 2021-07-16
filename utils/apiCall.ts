import axios, { Method } from "axios";

export const isProduction: boolean = false;
// https://www.alramsah.com
export const domain = isProduction
    ? "https://www.alshamkhacoop.com"
    : `http://localhost:5000`;

export const apiImage = (
    image: string,
    size?: "s" | "m" | "l",
    q?: number
): string => {
    return `https://d1eg6p1o9lpedp.cloudfront.net/${image}`;
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
                withCredentials: !server ? true : false,
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
