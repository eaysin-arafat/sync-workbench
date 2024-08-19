import BackButtonIcon from "@/Assets/user-info/BackButtonIcon";
import RequestSingleList, {
  RequestListType,
} from "@/Component/RequestTable/RequestSingleList";
import RequestTableHeader from "@/Component/RequestTable/RequestTableHeader";
import {
  fetchDeleteUserRequest,
  fetchGetUserRequest,
} from "@/redux/reducers/user-requests-slicer";
import { AppDispatch, RootState } from "@/redux/store";
import { RequestType, requestType } from "@/Types/requestType";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const RequestsView = () => {
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { viewType } = useParams<{ viewType?: RequestType }>();
  const { userRequests } = useSelector(
    (state: RootState) => state.userRequestsReducer
  );

  const handleSelectAll = () => {
    if (selectedRequests.length === userRequests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(
        userRequests.map((req: RequestListType) => String(req.ID))
      );
    }
  };

  const host = window.location.host;
  const subdomain = host.split(".")[0];
  const portalUrl = `${subdomain}.saciahub.com`;

  const handleDelete = async (requestIds: string[]) => {
    try {
      const response = await dispatch(
        fetchDeleteUserRequest({
          portalUrl: portalUrl,
          requestIds,
        })
      ).unwrap();

      if (response.status === 200) {
        notifications.show({
          color: "blue",
          title: "Success",
          message: "Request deleted successfully",
          autoClose: 4000,
        });
      } else {
        throw new Error("Delete request failed");
      }
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Error",
        message: typeof error === "string" ? error : "Something went wrong",
        autoClose: 4000,
      });
    }
  };

  useEffect(() => {
    if (viewType && requestType[viewType]) {
      dispatch(
        fetchGetUserRequest({
          Company_Portal_Url: portalUrl,
          type: requestType[viewType],
        })
      )
        .unwrap()
        .catch((error) => {
          console.error("Error fetching user requests:", error);
        });
    } else {
      console.error("Invalid or missing viewType parameter");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewType]);

  return (
    <div className="mt-6">
      <Button
        variant="transparent"
        color="black"
        size="lg"
        leftSection={<BackButtonIcon />}
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>

      <div>
        <RequestTableHeader
          viewType={viewType || ""}
          allSelected={selectedRequests.length === userRequests.length}
          onSelectAll={handleSelectAll}
          handleDelete={() => handleDelete(selectedRequests)}
        />

        <RequestSingleList
          viewType={viewType as RequestType}
          userRequestsList={userRequests}
          selectedRequests={selectedRequests}
          setSelectedRequests={setSelectedRequests}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default RequestsView;
