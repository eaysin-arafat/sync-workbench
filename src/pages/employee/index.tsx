import DeleteConfirmation from "@/component/ui/delete-confirmation/delete-confirmation";
import Modal from "@/component/ui/modal";
import PageHeader from "@/component/ui/page-header";
import CustomPagination from "@/component/ui/pagination/custom-pagination";
import EmployeeFilter from "./components/filter/filter";
import EmployeeForm from "./components/form";
import EmployeeTable from "./components/table/table";
import useEmployee from "./hooks";

const Employee = () => {
  const {
    closeModal,
    designationOptions,
    employees,
    handleDeleteEmployee,
    handleOpenBulkDeleteEmployeeModal,
    handleOpenCreateEmployeeModal,
    handleOpenDeleteEmployeeModal,
    handleOpenEditEmployeeModal,
    isOpenBulkDeleteDepartment,
    handlePageChange,
    isOpenCreateEmployee,
    isOpenDeleteEmployee,
    isOpenEditEmployee,
    currentPage,
    itemsPerPage,
    employeeTableData,
    handleBulkDeleteEmployees,
    handleSort,
    handleSortReset,
    searchParams,
    setSearchParams,
    sortConfig,
  } = useEmployee();

  // const employee = useGetEmployeeInfo();

  return (
    <div>
      {/* Page header with Add New Employee button */}
      <PageHeader
        pageTitle="Employee"
        hasAddButton
        btnLabel="Add New Employee"
        onClick={handleOpenCreateEmployeeModal}
      />

      {/* Filters for Employee Id, Name, and Position */}
      <EmployeeFilter
        designationOptions={designationOptions || []}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        handleSortReset={handleSortReset}
      />

      {/* Employee Table */}
      <EmployeeTable
        data={employeeTableData || []}
        handleOpenDeleteModal={handleOpenDeleteEmployeeModal}
        handleOpenBulkDeleteModal={handleOpenBulkDeleteEmployeeModal}
        handleOpenEditModal={handleOpenEditEmployeeModal}
        handleSort={handleSort}
        sortConfig={sortConfig}
      />

      {/* Pagination */}
      <CustomPagination
        totalItemsCount={employees?.meta.pagination.total || 0}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        meta={{ pagination: { page: currentPage, pageSize: itemsPerPage } }}
      />

      {/* Modal for adding a new employee */}
      <Modal
        opened={isOpenCreateEmployee}
        onClose={closeModal}
        title="Add New Employee"
        size={"70rem"}
      >
        <EmployeeForm onClose={closeModal} />
      </Modal>

      <Modal
        opened={isOpenEditEmployee}
        onClose={closeModal}
        title="Update Employee"
        size={"70rem"}
      >
        <EmployeeForm onClose={closeModal} mode="edit" />
      </Modal>

      <Modal
        opened={isOpenDeleteEmployee}
        onClose={closeModal}
        withCloseButton={false}
      >
        <DeleteConfirmation
          title="employee"
          closeModal={closeModal}
          handleDelete={handleDeleteEmployee}
        />
      </Modal>

      <Modal
        onClose={closeModal}
        opened={isOpenBulkDeleteDepartment}
        withCloseButton={false}
      >
        <DeleteConfirmation
          title="employee"
          closeModal={closeModal}
          handleBulkDelete={handleBulkDeleteEmployees}
        />
      </Modal>
    </div>
  );
};

export default Employee;
