import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LogIn from "./pages/LogIn";
import Board from "./pages/Board";
import Users from "./pages/Users";
import LogOut from "./pages/LogOut";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<LogIn />} />
          <Route path="/board" element={<Board />} />
          <Route path="/users" element={<Users />} />
          <Route path="/log-out" element={<LogOut />} />
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
