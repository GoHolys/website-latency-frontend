import { useState } from "react";
import BenchmarkForm from "./BenchmarkForm";
import FrequencyForm from "./FrequencyForm";
import HeaderCard from "./HeaderCard";
import Modal from "./Modal";

export default function HeaderSection() {
  const [isFrequencyOpen, setIsFrequencyOpen] = useState(false);
  const [isBenchmarkOpen, setIsBenchmarkOpen] = useState(false);

  return (
    <>
      <Modal open={isFrequencyOpen} onClose={() => setIsFrequencyOpen(false)}>
        <FrequencyForm />
      </Modal>
      <Modal open={isBenchmarkOpen} onClose={() => setIsBenchmarkOpen(false)}>
        <BenchmarkForm />
      </Modal>
      <div className="flex md:gap-32 flex-col md:flex-row gap-16">
        <div className="flex-1" onClick={() => setIsFrequencyOpen(true)}>
          <HeaderCard name="Frequency of sampling" />
        </div>
        <div className="flex-1" onClick={() => setIsBenchmarkOpen(true)}>
          <HeaderCard name="Benchmark settings" />
        </div>
      </div>
    </>
  );
}
