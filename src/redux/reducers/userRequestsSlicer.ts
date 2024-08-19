import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface RequestCreateType {
  ID?: number;
  Company_Portal_Url: string;
  RequestType: string;
  RequestPriority: string;
  RequestDescription: string;
  startDate: string[];
  endDate: string[];
  Type: string;
  ClientName: string;
  ProjectName: string;
  Task: string;
  Hours: number[];
  RequestAttachmentURL: string;
}

export const fetchCreateUserRequest = createAsyncThunk(
  "userRequests/fetchCreateUserRequest",
  async (formData: RequestCreateType, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state?.userReducer?.token;

      const response = await axios.post(
        "https://api.saciahub.com/v1/user/request/",
        {
          ...formData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const { data } = response;
      return { data, status: response.status };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as string);
      } else {
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);

export const fetchUpdateUserRequest = createAsyncThunk(
  "userRequests/fetchUpdateUserRequest",
  async (formData: RequestCreateType, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state?.userReducer?.token;

      const response = await axios.put(
        `https://api.saciahub.com/v1/user/request/?ID=${formData?.ID}`,
        {
          ...formData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const { data } = response;
      return { data, status: response.status };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as string);
      } else {
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);

export const fetchCreateRequestTimesheet = createAsyncThunk(
  "userRequests/fetchCreateRequestTimesheet",
  async (
    {
      portalUrl,
      requestType,
      requestPriority,
      requestDescription,
      startDate,
      endDate,
      type,
      clientName,
      projectName,
      task,
      hours,
      attachments,
      token,
    }: {
      portalUrl: string;
      requestType: string;
      requestPriority: string;
      requestDescription: string;
      startDate: string[];
      endDate: string[];
      type: string;
      clientName: string;
      projectName: string;
      task: string;
      hours: number[];
      attachments: string;
      token: string | undefined;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "https://api.saciahub.com/v1/user/request/",
        {
          Company_Portal_Url: portalUrl,
          RequestType: requestType,
          RequestPriority: requestPriority,
          RequestDescription: requestDescription,
          startDate: startDate,
          endDate: endDate,
          Type: type,
          ClientName: clientName,
          ProjectName: projectName,
          Task: task,
          Hours: hours,
          RequestAttachmentURL: attachments,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token || "Bearer",
          },
        }
      );
      const { status, data } = response;
      return { status, data };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const fetchCreateRequestTimeOff = createAsyncThunk(
  "fetchCreateRequestTimeOff",
  async (
    {
      portalUrl,
      requestType,
      requestPriority,
      requestDescription,
      startDate,
      endDate,
      type,
      clientName,
      projectName,
      task,
      hours,
      attachments,
      token,
    }: {
      portalUrl: string;
      requestType: string;
      requestPriority: string;
      requestDescription: string;
      startDate: string[];
      endDate: string[];
      type: string;
      clientName: string;
      projectName: string;
      task: string;
      hours: number[];
      attachments: string;
      token: string | undefined;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "https://api.saciahub.com/v1/user/request/",
        {
          Company_Portal_Url: portalUrl,
          RequestType: requestType,
          RequestPriority: requestPriority,
          RequestDescription: requestDescription,
          startDate: startDate,
          endDate: endDate,
          Type: type,
          ClientName: clientName,
          ProjectName: projectName,
          Task: task,
          Hours: hours,
          RequestAttachmentURL: attachments,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token || "Bearer",
          },
        }
      );
      const { status, data } = response;
      return { status, data };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const fetchCreateRequestHr = createAsyncThunk(
  "fetchCreateRequestHr",
  async (
    {
      portalUrl,
      requestType,
      requestPriority,
      requestDescription,
      startDate,
      endDate,
      type,
      clientName,
      projectName,
      task,
      hours,
      attachments,
      token,
    }: {
      portalUrl: string;
      requestType: string;
      requestPriority: string;
      requestDescription: string;
      startDate: string[];
      endDate: string[];
      type: string;
      clientName: string;
      projectName: string;
      task: string;
      hours: number[];
      attachments: string;
      token: string | undefined;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "https://api.saciahub.com/v1/user/request/",
        {
          Company_Portal_Url: portalUrl,
          RequestType: requestType,
          RequestPriority: requestPriority,
          RequestDescription: requestDescription,
          startDate: startDate,
          endDate: endDate,
          Type: type,
          ClientName: clientName,
          ProjectName: projectName,
          Task: task,
          Hours: hours,
          RequestAttachmentURL: attachments,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token || "Bearer",
          },
        }
      );
      const { status, data } = response;
      return { status, data };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const fetchCreateRequestProfileEdit = createAsyncThunk(
  "fetchCreateRequestProfileEdit",
  async (
    {
      portalUrl,
      requestType,
      requestPriority,
      requestDescription,
      startDate,
      endDate,
      type,
      clientName,
      projectName,
      task,
      hours,
      attachments,
      token,
    }: {
      portalUrl: string;
      requestType: string;
      requestPriority: string;
      requestDescription: string;
      startDate: string[];
      endDate: string[];
      type: string;
      clientName: string;
      projectName: string;
      task: string;
      hours: number[];
      attachments: string;
      token: string | undefined;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "https://api.saciahub.com/v1/user/request/",
        {
          Company_Portal_Url: portalUrl,
          RequestType: requestType,
          RequestPriority: requestPriority,
          RequestDescription: requestDescription,
          startDate: startDate,
          endDate: endDate,
          Type: type,
          ClientName: clientName,
          ProjectName: projectName,
          Task: task,
          Hours: hours,
          RequestAttachmentURL: attachments,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token || "Bearer",
          },
        }
      );
      const { status, data } = response;
      return { status, data };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const fetchCreateRequestAccess = createAsyncThunk(
  "fetchCreateRequestAccess",
  async (
    {
      portalUrl,
      requestType,
      requestPriority,
      requestDescription,
      startDate,
      endDate,
      type,
      clientName,
      projectName,
      task,
      hours,
      attachments,
      token,
    }: {
      portalUrl: string;
      requestType: string;
      requestPriority: string;
      requestDescription: string;
      startDate: string[];
      endDate: string[];
      type: string;
      clientName: string;
      projectName: string;
      task: string;
      hours: number[];
      attachments: string;
      token: string | undefined;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "https://api.saciahub.com/v1/user/request/",
        {
          Company_Portal_Url: portalUrl,
          RequestType: requestType,
          RequestPriority: requestPriority,
          RequestDescription: requestDescription,
          startDate: startDate,
          endDate: endDate,
          Type: type,
          ClientName: clientName,
          ProjectName: projectName,
          Task: task,
          Hours: hours,
          RequestAttachmentURL: attachments,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token || "Bearer",
          },
        }
      );
      const { status, data } = response;
      return { status, data };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const fetchGetUserRequest = createAsyncThunk(
  "userRequests/fetchGetUserRequest",
  async (
    {
      Company_Portal_Url,
      type,
    }: {
      Company_Portal_Url: string;
      type: string;
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as any;
      const token = state?.userReducer?.token;

      const response = await axios.get(
        `https://api.saciahub.com/v1/user/request/?Company_Portal_Url=${Company_Portal_Url}&Type=${type}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const { data } = response;
      return { data, status: response.status, type };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as string);
      } else {
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);

export const fetchDeleteUserRequest = createAsyncThunk(
  "userRequests/fetchDeleteUserRequest",
  async (
    {
      portalUrl,
      requestIds,
    }: {
      portalUrl: string;
      requestIds: string[];
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as any;
      const token = state?.userReducer?.token;

      const response = await axios.delete(
        "https://api.saciahub.com/v1/user/request/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          data: {
            Company_Portal_Url: portalUrl,
            Request_Ids: requestIds,
          },
        }
      );

      const { data } = response;
      return { data, status: response.status };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as string);
      } else {
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);

interface UserRequestState {
  isLoading: boolean;
  isError: boolean;
  error: string;
  userRequests: any | null;
}

const userRequests = createSlice({
  name: "userRequests",
  initialState: {
    isLoading: false,
    isError: false,
    error: "",
    userRequests: [],
  } as UserRequestState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateUserRequest.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchCreateUserRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchCreateUserRequest.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload as string;
    });

    builder.addCase(fetchUpdateUserRequest.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchUpdateUserRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchUpdateUserRequest.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload as string;
    });

    builder.addCase(fetchGetUserRequest.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchGetUserRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.userRequests = action.payload.data;
    });
    builder.addCase(fetchGetUserRequest.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload as string;
    });

    builder.addCase(fetchDeleteUserRequest.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchDeleteUserRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchDeleteUserRequest.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload as string;
    });
  },
});

export default userRequests.reducer;
