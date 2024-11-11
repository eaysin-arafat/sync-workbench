import { jwtDecode } from "jwt-decode";

// Define the expected structure of the decoded token
export interface JwtPayload {
  id: string;
  username: string;
  email: string;
  status: string;
}

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const { id, username, email, status } = decoded;

    if (!id || !username || !email || !status) {
      console.error("[JWT] Missing expected fields in decoded token.");
      return null;
    }

    return { id, username, email, status };
  } catch (error) {
    console.error("[JWT] Error decoding token:", error);
    return null;
  }
};
