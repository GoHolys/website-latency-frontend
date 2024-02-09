import { Website } from "./CardsGrid";
import Modal from "./Modal";

interface DeleteModalProps {
  isDeleteOpen: boolean;
  website: Website;
  handleCloseDelete: () => void;
  handleWebsiteRemoval(targetWebsite: Website): void;
}

export default function DeleteModal({
  isDeleteOpen,
  handleCloseDelete,
  website,
  handleWebsiteRemoval,
}: DeleteModalProps) {
  return (
    <Modal open={isDeleteOpen} onClose={handleCloseDelete}>
      <div className="grid gap-5 text-center w-56">
        <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this item?
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => handleWebsiteRemoval(website)}
            className="bg-red-600 w-full flex-1 rounded-sm py-0.5"
          >
            Delete
          </button>
          <button
            onClick={handleCloseDelete}
            className="bg-gray-500 flex-1 rounded-sm py-0.5"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
