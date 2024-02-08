import React, { useState } from "react";
import Modal from "./Modal";
import CardForm from "./CardForm";

export default function AdditionCard() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <CardForm />
      </Modal>
      <div
        onClick={() => setOpen(true)}
        className="rounded-xl shadow-lg h-44 w-52 flex flex-col justify-center items-center text-9xl font-extralight opacity-50 text-[#fffff] cursor-pointer"
      >
        +
      </div>
    </>
  );
}
