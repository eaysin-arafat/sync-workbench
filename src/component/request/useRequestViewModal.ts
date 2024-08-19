import { RequestObjType, RequestType } from "@/types/requestType";
import { getPortalInfo } from "@/utils/get-protal-info";
import React, { FormEvent, useState } from "react";
import { RequestListType } from "../request-table/request-single-list";

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
