import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface ResetPasswordPayload {
  Company_Portal_Url: string;
  old_password: string;
  new_password: string;
}

export const fetchUserSignIn = createAsyncThunk(
  "fetchUserSignIn",
  async (
    {
      username,
      password,
      portalUrl,
    }: { username: string; password: string; portalUrl: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "https://api.saciahub.com/v1/user/signin/",
        {
          Company_Portal_Url: portalUrl,
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const { status, headers, data } = response;
      const authHeader = headers["authorization"] || headers["Authorization"];
      const token = authHeader ? authHeader.replace(/^Bearer\s/, "") : null;
      const role = data.Role || null;
      return { status, token, role, data, password };
    } catch (error: unknown) {
      return rejectWithValue((error as any).response?.data?.detail);
    }
  }
);

export const fetchRefreshToken = createAsyncThunk(
  "fetchRefreshToken",
  async ({ token }: { token: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://api.saciahub.com/v1/user/refresh/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token || "Bearer",
          },
        }
      );
      const { status, headers, data } = response;
      const authHeader = headers["authorization"] || headers["Authorization"];
      const newToken = authHeader ? authHeader.replace(/^Bearer\s/, "") : null;
      return { status, newToken, data };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as string);
      } else {
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);

export const updatePassword = createAsyncThunk(
  "updatePassword",
  async (
    { Company_Portal_Url, old_password, new_password }: ResetPasswordPayload,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as any;
      const token = state?.userReducer?.token;

      const response = await axios.patch(
        "https://api.saciahub.com/v1/user/update-password/",
        {
          Company_Portal_Url,
          old_password,
          new_password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );

      return { status: response.status, data: response.data, new_password };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail);
    }
  }
);

export const signOut = createAsyncThunk(
  "signOut",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state?.userReducer?.token;

      const response = await axios.post(
        "https://api.saciahub.com/v1/user/signout/",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );

      return { status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail);
    }
  }
);

const userAuth = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    role: null,
    token: null,
    status: null as number | null,
    isError: false,
    signInData: null as any,
  },
  reducers: {
    setClearAllData: () => {
      return {
        isLoading: false,
        role: null,
        token: null,
        status: null,
        isError: false,
        signInData: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserSignIn.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchUserSignIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.status = action.payload.status;
      state.isError = false;
      state.signInData = action.payload.data;
      state.signInData.password = action.payload?.password;
    });
    builder.addCase(fetchUserSignIn.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    // Handle resetPassword
    builder.addCase(updatePassword.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.isError = false;
      state.signInData.password = action.payload?.new_password;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    // Handle signOut
    builder.addCase(signOut.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.isLoading = false;
      state.token = null;
      state.role = null;
      state.status = null;
      state.signInData = null;
      state.isError = false;
    });
    builder.addCase(signOut.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchRefreshToken.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchRefreshToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.newToken;
      state.status = action.payload.status;
      state.isError = false;
    });
    builder.addCase(fetchRefreshToken.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { setClearAllData } = userAuth.actions;
export default userAuth.reducer;
