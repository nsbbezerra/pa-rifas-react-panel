import { Routes, Route } from "react-router-dom";
import Clients from "../pages/Clients";
import Index from "../pages/Index";
import NewRaffle from "../pages/NewRaffle";
import Petitions from "../pages/Petitions";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/clientes" element={<Clients />} />
      <Route path="/pedidos" element={<Petitions />} />
      <Route path="/criarrifa" element={<NewRaffle />} />
    </Routes>
  );
}
