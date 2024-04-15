import UserLayout from "@/layout/UserLayout.tsx";
import EmployeeDashboard from "@/molecul/EmployeeDashboard.tsx";

const EmployeePage = () => {
  return (
    <UserLayout>
      <h1 className="text-xl">Employee Page</h1>
      <EmployeeDashboard />
    </UserLayout>
  );
};

export default EmployeePage;