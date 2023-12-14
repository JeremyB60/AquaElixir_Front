import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MenuAdmin from "../components/account/Admin/MenuAdmin";

const AdminView = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mx-auto max-w-screen w-full bg-white min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Partie gauche */}
        <MenuAdmin />
        {/* Partie droite */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminView;
