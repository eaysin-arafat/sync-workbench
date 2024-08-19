import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGetMediaUploaded = createAsyncThunk(
  "fetchGetTimeSheetsCount",
  async (
    {
      portalUrl,
      file,
      token,
    }: { portalUrl: string; file: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `https://api.saciahub.com/v1/user/getMedia/`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
          params: {
            Company_Portal_Url: portalUrl,
            file: file,
          },
          responseType: "blob",
        }
      );
      const { data } = response;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as string);
      } else {
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);

export const fetchUploadMedia = createAsyncThunk(
  "fetchUploadMedia",
  async (
    {
      Company_Portal_Url,
      key,
      file,
    }: { Company_Portal_Url: string; key: string; file: File },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as any;
      const token = state?.userReducer?.token;

      const formData = new FormData();
      formData.append("files", file);

      const response = await axios.post(
        `https://api.saciahub.com/v1/user/uploadMedia/?Company_Portal_Url=${Company_Portal_Url}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      const { data } = response;
      return { data, key };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as string);
      } else {
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);

export const fetchCreateUserBGVForm = createAsyncThunk(
  "submitUserBGVForm",
  async (formData: any, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state?.userReducer?.token;

      const response = await axios.post(
        `https://api.saciahub.com/v1/user/userbgv/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as string);
      } else {
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);

export const fetchUpdateUserBGVForm = createAsyncThunk(
  "updateUserBGVForm",
  async (
    {
      formData,
      Company_Portal_Url,
    }: { formData: any; Company_Portal_Url: string },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as any;
      const token = state?.userReducer?.token;

      const response = await axios.put(
        `https://api.saciahub.com/v1/user/userbgv/?Company_Portal_Url=${Company_Portal_Url}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as string);
      } else {
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);

export const fetchUserBGVData = createAsyncThunk(
  "fetchUserBGVData",
  async (
    { Company_Portal_Url }: { Company_Portal_Url: string },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as any;
      const token = state?.userReducer?.token;

      const response = await axios.get(
        `https://api.saciahub.com/v1/user/userbgv/?Company_Portal_Url=${Company_Portal_Url}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const { data } = response;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as string);
      } else {
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);

const userBGV = createSlice({
  name: "userBGV",
  initialState: {
    isLoading: false,
    isError: false,
    filesMediaData: null,
    uploadMediaData: {} as Record<string, string>,
    formSubmitData: null,
    userBGVData: {} as any,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetMediaUploaded.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchGetMediaUploaded.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.filesMediaData = action.payload;
    });
    builder.addCase(fetchGetMediaUploaded.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(fetchUploadMedia.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchUploadMedia.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.uploadMediaData[action?.payload?.key] =
        action?.payload?.data?.file_keys?.[0];
    });
    builder.addCase(fetchUploadMedia.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(fetchCreateUserBGVForm.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchCreateUserBGVForm.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.formSubmitData = action.payload;
    });
    builder.addCase(fetchCreateUserBGVForm.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(fetchUserBGVData.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchUserBGVData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.userBGVData = action.payload;
    });
    builder.addCase(fetchUserBGVData.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(fetchUpdateUserBGVForm.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchUpdateUserBGVForm.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchUpdateUserBGVForm.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default userBGV.reducer;
