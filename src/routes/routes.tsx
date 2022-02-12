import { Routes, Route } from "react-router-dom";
import Clients from "../pages/Clients";
import Index from "../pages/Index";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/clientes" element={<Clients />} />
    </Routes>
  );
}
