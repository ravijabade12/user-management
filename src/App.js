import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";

function App() {
  return (
    <Router>
      <Routes>
        {/* Other routes */}
        <Route path="/" element={<UserList />} />
        {/* Route with dynamic userId */}
        <Route path="/user/:userId" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
