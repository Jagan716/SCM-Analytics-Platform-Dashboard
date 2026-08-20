import DashboardNav from "@/components/DashboardNav";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      <DashboardNav />
      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 max-w-[1400px]">
        {children}
      </main>
    </div>
  );
}
