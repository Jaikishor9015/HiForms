import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Gift, Star } from "lucide-react";

function OpportunityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applying, setApplying] = useState(false);
  const [applyMessage, setApplyMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleApply = async () => {
    try {
      setApplying(true);
      setApplyMessage("");
      setError("");

      // Get logged-in user from localStorage
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setError("Please login first.");
        return;
      }

      const user = JSON.parse(storedUser);

      // Check if userId exists
      if (!user.userId) {
        setError("User information not found. Please login again.");
        return;
      }

      const response = await fetch(
        "https://hiforms-backend.onrender.com/api/applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.userId,
            opportunityId: opportunity._id,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to apply.");
        return;
      }

      setApplyMessage("Application submitted successfully! 🎉");

      console.log("Application:", data.application);
    } catch (error) {
      console.error("Apply error:", error);
      setError("Unable to connect to server.");
    } finally {
      setApplying(false);
    }
  };

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const response = await fetch(
          `http://hiforms-backend.onrender.com/api/opportunities/${id}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch opportunity");
        }

        setOpportunity(data);
      } catch (error) {
        console.error("Fetch opportunity error:", error);
        setError("Unable to load opportunity.");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunity();
  }, [id]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading opportunity...</p>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Opportunity not found.</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate("/user-dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-2">Opportunity</p>

              <h1 className="text-3xl font-bold text-gray-900">
                {opportunity.title}
              </h1>

              <p className="text-gray-500 mt-2">{opportunity.businessName}</p>
            </div>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              Active
            </span>
          </div>

          <div className="border-t border-gray-200 my-6" />

          <p className="text-gray-500">Opportunity ID: {opportunity._id}</p>

          <p className="text-gray-600 mt-4">{opportunity.description}</p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">About this opportunity</h2>

            <p className="text-gray-600 mt-3">
              Details about this opportunity will appear here.
            </p>
          </div>

          <div className="flex gap-8 mt-8">
            <div className="flex gap-8 mt-8">
              <div className="flex items-center gap-2 text-gray-600">
                <Gift size={20} />
                {opportunity.reward}
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Star size={20} />
                {opportunity.category}
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Star size={20} />
              Genuine Review
            </div>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              {opportunity.status}
            </span>
          </div>
          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {applyMessage && (
            <div className="mt-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-center">
              {applyMessage}
            </div>
          )}
          <button
            onClick={() => setShowForm(true)}
            className="mt-10 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default OpportunityDetails;
