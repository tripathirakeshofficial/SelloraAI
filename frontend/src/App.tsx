import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "./components/ui/sonner";
import { useGetCurrentUser } from "./hooks/useGetCurrentUser";
import type { RootState } from "./redux/store";

const Home = lazy(() => import("./pages/Home"));
const Admin = lazy(() => import("./pages/Admin"));
const Partner = lazy(() => import("./pages/Partner"));

function App() {
  useGetCurrentUser();

  const { user, loading } = useSelector((state: RootState) => state.user);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Toaster />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            path="/"
            element={
              user?.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : user?.role === "partner" ? (
                <Navigate to="/partner" replace />
              ) : (
                <Home />
              )
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
      </Suspense>
    </>
  );
}

export default App;
