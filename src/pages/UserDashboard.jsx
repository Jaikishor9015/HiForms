import { Star, Gift, ClipboardCheck, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function UserDashboard() {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/opportunities");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch opportunities");
        }

        setOpportunities(data);
      } catch (error) {
        console.error("Fetch opportunities error:", error);
        setError("Unable to load opportunities.");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/user-auth");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">HiForms</h1>

          <div className="flex items-center gap-4">
            <span className="text-gray-700">{user?.name}</span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-red-500"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Hi, {user?.name} 👋
          </h2>

          <p className="text-gray-500 mt-2">
            Discover products, share genuine feedback and earn rewards.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3">
              <Star className="text-yellow-500" />
              <h3 className="font-semibold">Reviews Given</h3>
            </div>

            <p className="text-3xl font-bold mt-4">0</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3">
              <Gift className="text-green-500" />
              <h3 className="font-semibold">Offers Earned</h3>
            </div>

            <p className="text-3xl font-bold mt-4">0</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="text-blue-500" />
              <h3 className="font-semibold">Applications</h3>
            </div>

            <p className="text-3xl font-bold mt-4">0</p>
          </div>
        </div>

        {/* Opportunities */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Available Opportunities</h2>

            <p className="text-gray-500 mt-1">
              Find products and apps looking for genuine feedback.
            </p>
          </div>

          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-white">
            <Search size={18} />
            Explore
          </button>
        </div>

        {/* Opportunity Card */}
        {loading && <p className="text-gray-500">Loading opportunities...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && opportunities.length === 0 && (
          <p className="text-gray-500">No opportunities available right now.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map((opportunity) => (
            <div
              key={opportunity._id}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">
                    {opportunity.businessName}
                  </h3>

                  <p className="text-gray-500 mt-1">{opportunity.title}</p>
                </div>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {opportunity.status}
                </span>
              </div>

              <p className="text-gray-600 mt-4">{opportunity.description}</p>

              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Gift size={18} />
                  {opportunity.reward}
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Star size={18} />
                  {opportunity.category}
                </div>
              </div>

              <button
                onClick={() =>
                  navigate(`/user-dashboard/opportunity/${opportunity._id}`)
                }
                className="mt-6 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700"
              >
                View Opportunity
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default UserDashboard;
