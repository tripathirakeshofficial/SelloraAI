import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { useGetCurrentUser } from "./hooks/useGetCurrentUser";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Partner from "./pages/Partner";
import type { RootState } from "./redux/store";

function App() {
  useGetCurrentUser();

  const { user, loading } = useSelector((state: RootState) => state.user);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            user?.role === "admin" ? <Navigate to="/admin" replace /> : <Home />
          }
        />
        <Route
          path="/admin"
          element={
            user?.role === "admin" ? <Admin /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/partner"
          element={
            user?.role === "partner" ? (
              <Partner />
            ) : user?.role === "admin" ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
