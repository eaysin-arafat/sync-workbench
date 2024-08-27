import { Button } from "@mantine/core";
import Breadcrumb from "../breadcrumbs";

type Props = {
  pageTitle: string;
  hasAddButton: boolean;
  btnLabel: string;
  onClick: () => void;
};

const PageHeader = ({ pageTitle, btnLabel, hasAddButton, onClick }: Props) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-5">
      <Breadcrumb pageName={pageTitle} />

      {hasAddButton && (
        <Button variant="primary" onClick={onClick}>
          {btnLabel}
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
