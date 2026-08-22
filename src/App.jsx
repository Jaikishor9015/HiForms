import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserDashboard from "./pages/UserDashboard.jsx";
import Home from "./pages/Home";
import UserAuth from "./pages/UserAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import OpportunityDetails from "./pages/OpportunityDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-auth" element={<UserAuth />} />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard/opportunity/:id"
          element={
            <ProtectedRoute>
              <OpportunityDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
