import { TimeArray } from "@/Types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGetTimeSheetsCount = createAsyncThunk(
  "fetchGetTimeSheetsCount",
  async (
    { portalUrl, year, token }: { portalUrl: string; token: string; year: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `https://api.saciahub.com/v1/user/timeSheets/count/?Company_Portal_Url=${portalUrl}&year=${year}`,
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

export const fetchGetTimeSheetsDay = createAsyncThunk(
  "fetchGetTimeSheetsDay",
  async (
    {
      portalUrl,
      month,
      token,
    }: { portalUrl: string; month: any; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `https://api.saciahub.com/v1/user/timeSheets/`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
          params: {
            Day: month,
            Company_Portal_Url: portalUrl,
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

export const fetchGetTimeSheetsWeek = createAsyncThunk(
  "fetchGetTimeSheetsWeek",
  async (
    {
      portalUrl,
      week,
      token,
    }: { portalUrl: string; week: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `https://api.saciahub.com/v1/user/timeSheets/`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
          params: {
            Week: week,
            Company_Portal_Url: portalUrl,
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

export const fetchGetTimeSheetsMonth = createAsyncThunk(
  "fetchGetTimeSheetsMonth",
  async (
    {
      portalUrl,
      month,
      token,
    }: { portalUrl: string; month: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `https://api.saciahub.com/v1/user/timeSheets/`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
          params: {
            Month: month,
            Company_Portal_Url: portalUrl,
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

export const fetchUpdateTimeSheet = createAsyncThunk(
  "fetchUpdateTimeSheet",
  async (
    {
      portalUrl,
      timesheetID,
      projectName,
      task,
      startDate,
      endDate,
      hours,
      ip,
      lang,
      lat,
      attachment,
    }: {
      portalUrl: string;
      timesheetID: string;
      projectName: string;
      task: string;
      startDate: string;
      endDate: string;
      hours: number;
      ip: string;
      lang: string;
      lat: string;
      attachment: string;
    },
    { rejectWithValue }: { rejectWithValue: any }
  ): Promise<void> => {
    try {
      await axios.put(
        "https://api.saciahub.com/v1/user/timeSheets/",
        {
          Company_Portal_Url: portalUrl,
          TimeSheetID: timesheetID,
          Project_Name: projectName,
          Project_Task: task,
          StartDate: startDate,
          EndDate: endDate,
          HoursWorked: hours,
          IPAddress: ip,
          Latitude: lat,
          Longitude: lang,
          time_sheet_attachment_key: attachment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as string);
      } else {
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);

export const fetchCreateTimeSheets = createAsyncThunk(
  "fetchGeCreateTimeSheets",
  async (
    {
      portalUrl,
      clientName,
      projectName,
      sow,
      userManager,
      task,
      month,
      attachments,
      time,
      ip,
      lat,
      long,
      notes,
      token,
    }: {
      portalUrl: string;
      clientName: string;
      projectName: string;
      sow: string;
      userManager: string;
      task: string;
      month: number;
      attachments: string;
      time: TimeArray;
      ip: string;
      lat: string;
      long: string;
      notes: string;
      token: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "https://api.saciahub.com/v1/user/timeSheets/",
        {
          Company_Portal_Url: portalUrl,
          Client_Name: clientName,
          Project_Name: projectName,
          SOW_Name: sow,
          User_Manager: userManager,
          Project_Task: task,
          Month: month,
          time_sheet_attachment_key: attachments,
          time: time,
          Notes: notes,
          IPAddress: ip,
          Latitude: lat,
          Longitude: long,
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

export const fetchDeleteTimeSheets = createAsyncThunk(
  "fetchDeleteTimeSheets",
  async (
    {
      portalUrl,
      timesheetID,
      token,
    }: { portalUrl: string; timesheetID: string[]; token: any },
    { rejectWithValue }
  ) => {
    try {
      await axios.delete(`https://api.saciahub.com/v1/user/timeSheets/`, {
        data: {
          Company_Portal_Url: portalUrl,
          TimeSheet_Ids: timesheetID,
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

const timeSheets = createSlice({
  name: "timeSheets",
  initialState: {
    isLoading: false,
    isError: false,
    timeSheetsDataDay: null,
    timeSheetsDataWeek: null,
    timeSheetsDataMonth: null,
    selectedTimeSheet: null,
    timeSheetCountData: null,
    selectedTimeSheetItemsDay: [],
    selectedTimeSheetItemsWeek: [],
    selectedTimeSheetItemsMonth: [],
  },
  reducers: {
    setSelectedTimeSheet: (state, action) => {
      state.selectedTimeSheet = action.payload;
    },
    setSelectedTimeSheetItems: (state: string[] | any, action) => {
      const { index, viewType } = action.payload;
      if (viewType === "day") {
        state.selectedTimeSheetItemsDay = [
          ...state.selectedTimeSheetItemsDay,
          index,
        ];
      } else if (viewType === "week") {
        state.selectedTimeSheetItemsWeek = [
          ...state.selectedTimeSheetItemsWeek,
          index,
        ];
        state.selectedTimeSheetItemsMonth = [
          ...state.selectedTimeSheetItemsMonth,
          index,
        ];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCreateTimeSheets.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchCreateTimeSheets.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchCreateTimeSheets.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchGetTimeSheetsDay.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchGetTimeSheetsDay.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.timeSheetsDataDay = action.payload;
    });
    builder.addCase(fetchGetTimeSheetsDay.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchGetTimeSheetsWeek.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchGetTimeSheetsWeek.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.timeSheetsDataWeek = action.payload;
    });
    builder.addCase(fetchGetTimeSheetsWeek.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchGetTimeSheetsMonth.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchGetTimeSheetsMonth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.timeSheetsDataMonth = action.payload;
    });
    builder.addCase(fetchGetTimeSheetsMonth.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchUpdateTimeSheet.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchUpdateTimeSheet.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchUpdateTimeSheet.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchDeleteTimeSheets.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchDeleteTimeSheets.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchDeleteTimeSheets.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchGetTimeSheetsCount.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchGetTimeSheetsCount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.timeSheetCountData = action.payload;
    });
    builder.addCase(fetchGetTimeSheetsCount.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { setSelectedTimeSheet } = timeSheets.actions;
export default timeSheets.reducer;
