import { Website } from "./CardsGrid";
import Modal from "./Modal";

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
  const { name, url, latency } = website;
  return (
    <Modal open={isInfoOpen} onClose={handleCloseInfo}>
      <ul>
        <li>Name - {name}</li>
        <li>Url - {url}</li>
        <li>Latency - {latency}ms</li>
      </ul>
    </Modal>
  );
}
