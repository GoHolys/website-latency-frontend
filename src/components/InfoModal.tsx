import React from "react";
import Modal from "./Modal";
import { Website } from "./CardsGrid";

interface InfoModalProps {
  isInfoOpen: boolean;
  handleCloseInfo: () => void;
  website: Website;
}

export default function InfoModal({
  isInfoOpen,
  handleCloseInfo,
  website,
}: InfoModalProps) {
  return (
    <Modal open={isInfoOpen} onClose={handleCloseInfo}>
      <ul className="grid gap-2 text-justify">
        {Object.entries(website).map(([key, value]) => {
          return (
            <li>
              {key} - {value}
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}
