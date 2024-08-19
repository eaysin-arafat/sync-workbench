import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface DashboardDataType {
  Request: Request;
  TimeOff: TimeOff;
  MissedTimesheet: MissedTimesheet;
  current_month_timesheet: Currentmonthtimesheet;
  last_3_timesheets?: any;
  last_3_requests?: any;
}

interface Currentmonthtimesheet {
  current_month_timesheet_count: number;
  current_month_approved_timesheet_count: number;
  current_month_pending_timesheet_count: number;
  current_month_denied_timesheet_count: number;
}

interface MissedTimesheet {
  timesheet_count: number;
  total_timesheet_hours: number;
}

interface TimeOff {
  Used_timeoff_count: number;
  Available_timeoff_count: number;
}

interface Request {
  total_count: number;
  approved_count: number;
  pending_count: number;
  denied_count: number;
}

export const fetchGetDashboardData = createAsyncThunk(
  "fetchGetDashboardData",
  async (
    {
      portalUrl,
      day,
      type,
      token,
      viewType,
    }: {
      portalUrl: string;
      day: string | number;
      type: string;
      token: string;
      viewType: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `https://api.saciahub.com/v1/user/request_counts/?Company_Portal_Url=${portalUrl}&${viewType}=${day}&Type=${type}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token || "Bearer",
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

const extraReducer = createSlice({
  name: "extraReducer",
  initialState: {
    isLoading: false,
    isError: false,
    isChangePassword: false,
    dashboardData: {} as DashboardDataType,
  },
  reducers: {
    setChangePassword: (state, action) => {
      state.isChangePassword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetDashboardData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchGetDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardData = action.payload;
      })
      .addCase(fetchGetDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.dashboardData = action.payload as any;
      });
  },
});

export const { setChangePassword } = extraReducer.actions;

export default extraReducer.reducer;
