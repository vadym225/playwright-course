import * as nodeFetch from "node-fetch"

export const getLoginToken = async (username: string, password: string) => {
    const response = await nodeFetch("http://localhost:2221/api/login", {
        method: "POST",
        body: JSON.stringify({ "username": username, "password": password }),
    });
    if (response.status !== 200) {
        throw new Error(`Failed to get login token: ${response.status} ${response.statusText}`);
    }
    const body = await response.json();
    return body.token;
}