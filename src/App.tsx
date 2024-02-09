import { useState } from "react";
import CardsGrid from "./components/CardsGrid";
import HeaderSection from "./components/HeaderSection";

export interface BenchmarkSettings {
  redLightLatency: number;
  greenLightLatency: number;
}

function App() {
  const [benchmarkSettings, setBenchmarkSettings] = useState<BenchmarkSettings>(
    {
      redLightLatency: 50,
      greenLightLatency: 20,
    }
  );

  const [frequency, setFrequency] = useState("15");

  function handleBenchmark(newBenchmarkSettings: BenchmarkSettings) {
    setBenchmarkSettings(newBenchmarkSettings);
  }

  function handleFrequency(newFrequency: string) {
    setFrequency(newFrequency);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen container mx-auto gap-10">
      <div className="mt-5 md:mt-0">
        <HeaderSection
          handleBenchmark={handleBenchmark}
          benchmarkSettings={benchmarkSettings}
          frequency={frequency}
          handleFrequency={handleFrequency}
        />
      </div>
      <CardsGrid
        frequencyInterval={frequency}
        benchmarkSettings={benchmarkSettings}
      />
    </div>
  );
}

export default App;
