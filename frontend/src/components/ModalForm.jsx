import { useEffect, useState } from "react";

function ModalForm({ isOpen, onClose, mode, onSubmit, clientData }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [rate, setRate] = useState("");
  const [status, setStatus] = useState(false);

  const handleStatusChange = (e) => {
    setStatus(e.target.value === "Active");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientData = {
        name,
        email,
        job,
        rate: Number(rate),
        isactive: status,
      };
      await onSubmit(clientData);
      onClose();
    } catch (error) {
      console.log("Error adding client", error);
    }
    onClose();
  };

  useEffect(() => {
    if (mode === "edit" && clientData) {
      setName(clientData.name);
      setEmail(clientData.email);
      setJob(clientData.job);
      setRate(clientData.rate);
      setStatus(clientData.isactive);
    } else {
      setName("");
      setEmail("");
      setJob("");
      setRate("");
      setStatus("");
    }
  }, [mode, clientData]);

  return (
    <>
      <dialog id="my_modal_3" className="modal" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">
            {mode === "edit" ? "Edit Client" : "Client Info"}
          </h3>
          <form method="dialog" onSubmit={handleSubmit}>
            <label className="input input-bordered my-4 flex items-center gap-2">
              Name
              <input
                type="text"
                className="grow"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="input input-bordered my-4 flex items-center gap-2">
              Email
              <input
                type="email"
                className="grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered my-4 flex items-center gap-2">
              Job
              <input
                type="text"
                className="grow"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </label>

            <div className="flex mb-4 justify-between my-4">
              <label className="input input-bordered mr-4 flex items-center gap-2">
                Rate
                <input
                  type="text"
                  className="grow"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </label>
              <select
                value={status ? "Active" : "Inactive"}
                className="select select-bordered w-full max-w-xs"
                onChange={handleStatusChange}
              >
                <option>Inactive</option>
                <option>Active</option>
              </select>
            </div>

            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onClose}
            >
              ✕
            </button>
            <button className="btn btn-success">
              {mode === "edit" ? "Save Changes" : "Add Client"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default ModalForm;
