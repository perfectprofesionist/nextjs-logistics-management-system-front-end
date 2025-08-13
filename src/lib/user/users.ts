import { api } from "../../api/axiosInstance"
import { AxiosError } from "axios";

export async function UsersListing() {
    try {
        const res = await api.private.getAll(
            "/users",
        );

        if (res) {
            return res.data; // { auth_token: "..." }
        } else {
            throw new Error("Invalid response from server");
        }
    } catch (err) {
        // Use the same error handling as before, but without 'any'
        if (err instanceof AxiosError && err.isAxiosError) {
            throw new Error(
                (err.response?.data as { message?: string })?.message ||
                err.message ||
                "Login failed"
            );
        }
        throw err;
    }
}
