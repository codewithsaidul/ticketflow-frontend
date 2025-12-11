import ManagementPageHeader from "@/components/shared/dashboard/management-page-header";

const UserManagementHeader = () => {
  return (
    <>
      <ManagementPageHeader
        title="User & Host Management"
        description="Manage all users, hosts, and update their roles and account status across the platform."
      />
    </>
  );
};

export default UserManagementHeader;
