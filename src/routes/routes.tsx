import { Routes, Route } from "react-router-dom";
import Clients from "../pages/Clients";
import Index from "../pages/Index";
import NewRaffle from "../pages/NewRaffle";
import NewRaffleParams from "../pages/NewRaffleParams";
import Orders from "../pages/Orders";
import Petitions from "../pages/Petitions";
import Raffle from "../pages/Raffle";
import Raffles from "../pages/Raffles";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/clientes" element={<Clients />} />
      <Route path="/pedidos" element={<Petitions />} />
      <Route path="/criarrifa" element={<NewRaffle />} />
      <Route path="/rifas" element={<Raffles />} />
      <Route path="/vendas/:rifa" element={<Orders />} />
      <Route path="/rifa/:rifa" element={<Raffle />} />
      <Route path="/novarifa/:rifa" element={<NewRaffleParams />} />
    </Routes>
  );
}
