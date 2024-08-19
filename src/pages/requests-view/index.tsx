import BackButtonIcon from "@/assets/user-info/BackButtonIcon";
import RequestSingleList from "@/component/request-table/request-single-list";
import RequestTableHeader from "@/component/request-table/request-table-header";
import { RequestType } from "@/types/requestType";
import { Button } from "@mantine/core";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RequestsView = () => {
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const navigate = useNavigate();
  const { viewType } = useParams<{ viewType?: RequestType }>();
  const handleSelectAll = () => {};
  const handleDelete = async (requestIds: string[]) => {};

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
          allSelected={false}
          onSelectAll={handleSelectAll}
          handleDelete={() => handleDelete(selectedRequests)}
        />

        <RequestSingleList
          viewType={viewType as RequestType}
          userRequestsList={[]}
          selectedRequests={selectedRequests}
          setSelectedRequests={setSelectedRequests}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default RequestsView;
