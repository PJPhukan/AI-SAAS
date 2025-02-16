import Navber from "@/components/Navber";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-800">
        <Sidebar/>
      </div>

      <main className="md:pl-72">
        <Navber/>
        {children}
      </main>
    </div>
  );
};
export default DashboardLayout;
