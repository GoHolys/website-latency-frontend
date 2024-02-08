import React, { useState } from "react";
import { Website } from "./CardsGrid";
import Circle from "./Circle";
import gearIcon from "../assets/gear.png";
import binIcon from "../assets/bin.png";
import infoIcon from "../assets/information.png";
import DeleteModal from "./DeleteModal";
import CardForm from "./CardForm";
import Modal from "./Modal";
import InfoModal from "./InfoModal";

interface CardProps {
  website: Website;
}

export default function Card({ website }: CardProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleCloseDelete = () => setIsDeleteOpen(false);
  const handleCloseUpdate = () => setIsUpdateOpen(false);
  const handleCloseInfo = () => setIsInfoOpen(false);

  const { name, latency } = website;

  return (
    <>
      <InfoModal
        handleCloseInfo={handleCloseInfo}
        isInfoOpen={isInfoOpen}
        website={website}
      />
      <DeleteModal
        handleCloseDelete={handleCloseDelete}
        isDeleteOpen={isDeleteOpen}
      />
      <Modal open={isUpdateOpen} onClose={handleCloseUpdate}>
        <CardForm />
      </Modal>
      <div className="rounded-xl shadow-lg h-44 w-52 p-5 flex flex-col">
        <h5 className="text-2xl md:text-3xl font-medium mt-3">{name}</h5>
        <div className="flex mt-auto">
          <Circle bgColor="bg-red-500" />
          <div className="flex ml-auto gap-x-2">
            <img
              src={infoIcon}
              onClick={() => setIsInfoOpen(true)}
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <img
              src={binIcon}
              onClick={() => setIsDeleteOpen(true)}
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <img
              src={gearIcon}
              onClick={() => setIsUpdateOpen(true)}
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
}
