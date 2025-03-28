// components/user/Sidebar.jsx
'use client';
export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-full sm:w-64 bg-white shadow-md rounded-lg p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-2 rounded-md transition duration-300 ${
                activeTab === 'profile'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
              }`}
            >
              Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full text-left px-4 py-2 rounded-md transition duration-300 ${
                activeTab === 'wishlist'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
              }`}
            >
              Wishlist
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full text-left px-4 py-2 rounded-md transition duration-300 ${
                activeTab === 'reviews'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
              }`}
            >
              Reviews
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
