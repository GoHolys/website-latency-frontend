import React, { useState } from "react";
import { BenchmarkSettings } from "../App";
import Circle from "./Circle";

interface BenchMarkFormProps {
  handleBenchmark(newBenchmarkSettings: BenchmarkSettings): void;
  benchmarkSettings: BenchmarkSettings;
  handleCloseBenchmark: () => void;
}

interface FormData extends BenchmarkSettings {
  errors?: Record<string, string>;
}

export default function BenchmarkForm({
  handleBenchmark,
  benchmarkSettings,
  handleCloseBenchmark,
}: BenchMarkFormProps) {
  const [formData, setFormData] = useState<FormData>(benchmarkSettings);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: Record<string, string> = {};
    if (formData.redLightLatency <= formData.greenLightLatency) {
      errors.form = "The red value must be greater than the green value";
      setFormData((prevState) => ({ ...prevState, errors }));
    } else {
      handleCloseBenchmark();
      handleBenchmark(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-col">
      <div className="grid gap-5 w-full ">
        <label className="grid gap-3">
          <Circle bgColor={"bg-red-500"} />
          <div className="flex items-center gap-3">
            <input
              type="text"
              name="redLightLatency"
              value={formData.redLightLatency}
              onChange={handleChange}
              className="border border-gray-400 py-1 px-2 w-80"
              placeholder="latency"
            />
            <span>ms</span>
          </div>
        </label>
        <label className="grid gap-3">
          <Circle bgColor={"bg-green-500"} />
          <div className="flex items-center gap-3">
            <input
              type="text"
              name="greenLightLatency"
              value={formData.greenLightLatency}
              onChange={handleChange}
              className="border border-gray-400 py-1 px-2 w-80"
              placeholder="latency"
            />
            <span>ms</span>
          </div>
        </label>
        <input
          type="submit"
          value="Submit"
          className="w-full bg-blue-500 text-white rounded py-2 cursor-pointer"
        />
      </div>
      {formData?.errors?.form && (
        <p className="text-red-500">{formData.errors.form}</p>
      )}
    </form>
  );
}
