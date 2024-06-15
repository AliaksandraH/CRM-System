import { useCallback } from "react";
import axios from "axios";

export const useHttp = () => {
    const request = useCallback(
        async (url, method = "GET", data = null, headers = {}) => {
            try {
                const requestUrl =
                    method === "GET"
                        ? (url += "/?" + new URLSearchParams(data).toString())
                        : url;
                const response = await axios({
                    url: requestUrl,
                    method,
                    data,
                    headers: { "Content-Type": "application/json" },
                    ...headers,
                });
                return response.data;
            } catch (error) {
                console.log("--- error ---", error, url);
                if (error.response && error.response.data.errors) {
                    return {
                        message: error.response.data.errors
                            .map((err) => Object.values(err)[0])
                            .join("\n"),
                    };
                }
            }
        },
        []
    );

    return { request };
};
