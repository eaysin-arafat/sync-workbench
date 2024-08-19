import {
  fetchCreateUserRequest,
  fetchUpdateUserRequest,
} from "@/redux/reducers/user-requests-slicer";
import { AppDispatch } from "@/redux/store";
import { RequestObjType, requestType } from "@/Types/requestType";
import { getPortalInfo } from "@/utils/get-protal-info";
import { notifications } from "@mantine/notifications";
import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { RequestListType } from "../request-table/request-single-list";
import { RequestType } from "./../../Types/requestType";

type FormState = {
  requestPriority: string;
  requestDescription: string;
  type: RequestType | "";
};

const initialState: FormState = {
  requestPriority: "",
  requestDescription: "",
  type: "",
};

const getPreviousData = (data: any, type: string, isEdit: boolean) => {
  const typeProperty: RequestObjType = {
    hr: data?.RequestDetails.RequestType || "",
    "time-off": data?.RequestDetails?.LeaveType || "",
    "profile-edit": data?.RequestDetails?.Change || "",
    access: data?.RequestDetails?.Access || "",
  };

  const previousData: FormState = {
    requestPriority: data?.RequestPriority || "",
    requestDescription:
      type === "time-off"
        ? data?.RequestDetails?.Reason || ""
        : data?.RequestDescription || "",
    type: typeProperty[type as keyof RequestObjType] as any,
  };

  const startDate = data?.RequestDetails?.StartDate;
  const endDate = data?.RequestDetails?.EndDate;

  const previousDate: [Date | null, Date | null] = isEdit
    ? [
        startDate ? new Date(startDate) : null,
        endDate ? new Date(endDate) : null,
      ]
    : [null, null];

  return { previousData, previousDate };
};

const useRequestViewModal = ({
  type,
  close,
  data,
}: {
  type: string;
  close: () => void;
  data?: RequestListType | null;
}) => {
  const isEdit = !!data;
  const dispatch: AppDispatch = useDispatch();
  const { previousData, previousDate } = getPreviousData(data, type, isEdit);
  const formStateData: FormState = isEdit ? previousData : initialState;
  const { portalUrl } = getPortalInfo();

  const [formState, setFormState] = useState<FormState>({ ...formStateData });
  const [rangeValue, setRangeValue] =
    useState<[Date | null, Date | null]>(previousDate);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string | null) => {
    setFormState((prev) => ({ ...prev, [name]: value || "" }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const startDate = rangeValue[0] ? rangeValue[0].toISOString() : "";
    const endDate = rangeValue[1] ? rangeValue[1].toISOString() : "";

    isEdit
      ? dispatch(
          fetchUpdateUserRequest({
            ClientName: "",
            Company_Portal_Url: portalUrl,
            endDate: [endDate],
            Hours: [],
            ProjectName: "",
            RequestAttachmentURL: "",
            RequestDescription: formState?.requestDescription || "",
            RequestPriority: formState?.requestPriority || "",
            RequestType: requestType[type as keyof RequestObjType],
            startDate: [startDate],
            Task: "",
            Type: formState?.type,
            ID: data?.ID,
          })
        )
          .unwrap()
          .then((data) => {
            if (data.status === 200) {
              notifications.show({
                color: "blue",
                title: "Success",
                message: "Request updated successfully",
                autoClose: 4000,
              });

              close();
              setFormState({ ...initialState });
            } else {
              console.error("Request created failed:", data);
            }
          })
          .catch((error) => {
            notifications.show({
              color: "red",
              title: "Error",
              message:
                typeof error === "string" ? error : "Something went wrong",
              autoClose: 4000,
            });
          })
      : dispatch(
          fetchCreateUserRequest({
            ClientName: "",
            Company_Portal_Url: portalUrl,
            endDate: [endDate],
            startDate: [startDate],
            Hours: [0],
            ProjectName: "",
            RequestAttachmentURL: "",
            RequestDescription: formState.requestDescription,
            RequestPriority: formState.requestPriority,
            RequestType: requestType[type as keyof RequestObjType],
            Task: "",
            Type: formState.type,
          })
        )
          .unwrap()
          .then((data) => {
            if (data.status === 201) {
              notifications.show({
                color: "blue",
                title: "Success",
                message: "Request created successfully",
                autoClose: 4000,
              });

              close();
              setFormState({ ...initialState });
            } else {
              console.error("Request created failed:", data);
            }
          })
          .catch((error) => {
            notifications.show({
              color: "red",
              title: "Error",
              message:
                typeof error === "string" ? error : "Something went wrong",
              autoClose: 4000,
            });
          });
  };

  const withoutTimeOffType =
    type === "hr" || type === "profile-edit" || type === "access";

  const requestTypeLabel =
    (type === "time-off" && "Leave Type") ||
    (type === "hr" && "Request") ||
    (type === "access" && "Access") ||
    (type === "profile-edit" && "Change");

  return {
    formState,
    handleChange,
    handleSubmit,
    handleSelectChange,
    requestTypeLabel,
    withoutTimeOffType,
    setRangeValue,
    rangeValue,
  };
};

export default useRequestViewModal;
