import { useState } from "react";
import BenchmarkForm from "./BenchmarkForm";
import FrequencyForm from "./FrequencyForm";
import HeaderCard from "./HeaderCard";
import Modal from "./Modal";
import { BenchmarkSettings } from "../App";

interface HeaderSectionProps {
  handleBenchmark(newBenchmarkSettings: BenchmarkSettings): void;
  benchmarkSettings: BenchmarkSettings;
  frequency: string;
  handleFrequency(newFrequency: string): void;
}

export default function HeaderSection({
  handleBenchmark,
  benchmarkSettings,
  frequency,
  handleFrequency,
}: HeaderSectionProps) {
  const [isFrequencyOpen, setIsFrequencyOpen] = useState(false);
  const [isBenchmarkOpen, setIsBenchmarkOpen] = useState(false);

  const handleCloseFrequency = () => setIsFrequencyOpen(false);
  const handleCloseBenchmark = () => setIsBenchmarkOpen(false);

  return (
    <>
      <Modal open={isFrequencyOpen} onClose={() => setIsFrequencyOpen(false)}>
        <FrequencyForm
          frequency={frequency}
          handleFrequency={handleFrequency}
          handleCloseFrequency={handleCloseFrequency}
        />
      </Modal>
      <Modal open={isBenchmarkOpen} onClose={() => setIsBenchmarkOpen(false)}>
        <BenchmarkForm
          handleBenchmark={handleBenchmark}
          benchmarkSettings={benchmarkSettings}
          handleCloseBenchmark={handleCloseBenchmark}
        />
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
