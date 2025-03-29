import React, { useState, useEffect } from "react";
import { RoleProvider, useRole } from "../src/context/RoleContext";
import Client from "../src/Views/Client";
import Admin from "../src/Views/Admin";

const Role = () => {
  const { whoAreYou } = useRole();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  switch (whoAreYou) {
    case "":
    case "user":
      return <Client />;
    case "admin":
      return <Admin />;
    default:
      return <div>Không có quyền truy cập!</div>;
  }
};

const App = () => {
  return (
    <RoleProvider>
      <Role />
    </RoleProvider>
  );
};

export default App;
