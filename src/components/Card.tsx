import { useState } from "react";
import { BenchmarkSettings } from "../App";
import binIcon from "../assets/bin.png";
import gearIcon from "../assets/gear.png";
import infoIcon from "../assets/information.png";
import CardUpdateForm from "./CardUpdateForm";
import { Website } from "./CardsGrid";
import Circle from "./Circle";
import DeleteModal from "./DeleteModal";
import InfoModal from "./InfoModal";
import Modal from "./Modal";

interface CardProps {
  website: Website;
  benchmarkSettings: BenchmarkSettings;
  handleWebsiteRemoval(targetWebsite: Website): void;
  handleWebsiteUpdate(targetWebsite: Website, formData: Website): Promise<void>;
}

export default function Card({
  website,
  benchmarkSettings,
  handleWebsiteRemoval,
  handleWebsiteUpdate,
}: CardProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleCloseDelete = () => setIsDeleteOpen(false);
  const handleCloseUpdate = () => setIsUpdateOpen(false);
  const handleCloseInfo = () => setIsInfoOpen(false);

  const { name, latency } = website || {};
  const { greenLightLatency, redLightLatency } = benchmarkSettings;

  function handleStatusColor() {
    if (latency === "unknown" || !latency) {
      return;
    }
    if (latency >= redLightLatency) {
      return "bg-red-500";
    }
    if (latency <= greenLightLatency) {
      return "bg-green-500";
    } else {
      return "bg-orange-500";
    }
  }

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
        website={website}
        handleWebsiteRemoval={handleWebsiteRemoval}
      />
      <Modal open={isUpdateOpen} onClose={handleCloseUpdate}>
        <CardUpdateForm
          website={website}
          handleWebsiteUpdate={handleWebsiteUpdate}
        />
      </Modal>
      <div className="rounded-xl shadow-lg h-44 w-52 p-5 flex flex-col">
        <h5 className="text-2xl md:text-3xl font-medium mt-3">{name}</h5>
        <h5 className="text-2xl md:text-3xl font-medium mt-3">{latency}ms</h5>
        <div className="flex mt-auto">
          <Circle bgColor={handleStatusColor()} />
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
