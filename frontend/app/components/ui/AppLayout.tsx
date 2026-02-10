import { Outlet } from "react-router";
import { Sidebar } from "~/components/ui/sidebar";
import { TopNav } from "~/components/ui/TopNav";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Sidebar />
      <TopNav />
      
      {/* Main Content Area */}
      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}