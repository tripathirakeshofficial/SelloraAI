import { Route, Routes } from "react-router-dom";
import { useGetCurrentUser } from "./hooks/useGetCurrentUser";
import Home from "./pages/Home";

function App() {
  useGetCurrentUser();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
