// app/user/layout.js
import ServerStatus from '@/components/ui/ServerStatus';

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white text-gray-900 p-3 md:p-4 shadow-md mb-2 md:mb-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">
          <h1 className="text-xl md:text-2xl font-bold">User Dashboard</h1>
          {/* Server Status untuk desktop */}
          <div className="hidden md:block">
            <ServerStatus />
          </div>
          {/* Server Status untuk mobile */}
          <div className="absolute top-full right-0 md:hidden">
            <div className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full shadow-md">
              <ServerStatus />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow max-w-7xl w-full mx-auto p-2 md:p-5">{children}</main>
    </div>
  );
}
