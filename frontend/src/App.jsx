import { useState } from "react";
import "./App.css";
import axios from "axios";
import ModalForm from "./components/ModalForm";
import Navbar from "./components/Navbar";
import TableList from "./components/TableList";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [clientData, setClientData] = useState(null);

  const handleOpen = (mode, client) => {
    setClientData(client);
    setIsOpen(true);
    setOpenModal(mode);
  };

  const handleSubmit = async (newClientData) => {
    if (openModal === "add") {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/clients",
          newClientData
        );
        console.log("Added new client: ", response.data);
      } catch (error) {
        console.error("Error adding client", error);
      }
      console.log("modal mode add");
    } else {
      console.log("Updated client: ", clientData.id);
      try {
        const response = await axios.put(
          `http://localhost:3000/api/clients/${clientData.id}`,
          newClientData
        );
        console.log("Updated client: ", response.data);
      } catch (error) {
        console.error("Error updating client", error);
      }
    }
  };

  return (
    <>
      <Navbar onOpen={() => handleOpen("add")} onSearch={setSearchTerm} />
      <TableList handleOpen={handleOpen} searchTerm={searchTerm} />
      <ModalForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        mode={openModal}
        clientData={clientData}
      />
    </>
  );
}

export default App;
