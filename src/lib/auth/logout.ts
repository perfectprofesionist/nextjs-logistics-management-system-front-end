import { publicAxios } from "../../api/axiosInstance"
import { AxiosError } from "axios";

export async function logoutUser() {
    try {
        const res = await publicAxios.post("/auth/logout");

        if (res.status === 200 || res.status === 201 || res.status === 204) {
            return res.data;
        } else {
            throw new Error("Invalid response from server");
        }
    } catch (err) {
        if (err instanceof AxiosError && err.isAxiosError) {
            throw new Error(
                (err.response?.data as { message?: string })?.message ||
                err.message ||
                "Logout failed"
            );
        }
        throw err;
    }
}
