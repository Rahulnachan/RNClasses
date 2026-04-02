import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, hasRole, loading, user } = useContext(AuthContext);

  // Debug logs
  console.log("🛡️ ProtectedRoute - User:", user);
  console.log("🛡️ ProtectedRoute - Required Role:", role);
  console.log("🛡️ ProtectedRoute - Has required role:", role ? hasRole(role) : "No role required");
  console.log("🛡️ ProtectedRoute - Loading:", loading);
  console.log("🛡️ ProtectedRoute - Authenticated:", isAuthenticated());

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated()) {
    console.log("🔒 Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // Admin dashboard access
  if (children.type.name === "AdminDashboard") {
    if (user?.role === "ADMIN") {
      console.log("✅ Admin dashboard access granted");
      return children;
    } else {
      console.log("🔒 Not authorized for admin dashboard");
      if (hasRole("TRAINER")) return <Navigate to="/trainer-dashboard" replace />;
      if (hasRole("STUDENT")) return <Navigate to="/student-dashboard" replace />;
      return <Navigate to="/" replace />;
    }
  }

  // Check role if specified
  if (role && !hasRole(role)) {
    console.log(`🔒 User role ${user?.role} doesn't match required role ${role}`);
    
    // Redirect to appropriate dashboard based on role
    if (hasRole("ADMIN")) return <Navigate to="/admin-dashboard" replace />;
    if (hasRole("TRAINER")) return <Navigate to="/trainer-dashboard" replace />;
    if (hasRole("STUDENT")) return <Navigate to="/student-dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  console.log("✅ Access granted to protected route");
  return children;
};

export default ProtectedRoute;