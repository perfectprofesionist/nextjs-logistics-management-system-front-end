import { publicAxios } from "../../api/axiosInstance"
import { AxiosError } from "axios";

export async function loginUser(email: string, password: string) {
  try {
    const res = await publicAxios.post(
      "/auth/login",
      { email, password }
    );

    if (res.status === 201) {
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
