import React, { useState } from "react";

interface FrequencyFormProps {
  frequency: string;
  handleFrequency(newFrequency: string): void;
  handleCloseFrequency: () => void;
}

export default function FrequencyForm({
  frequency,
  handleFrequency,
  handleCloseFrequency,
}: FrequencyFormProps) {
  const [formData, setFormData] = useState(frequency);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleCloseFrequency();
    handleFrequency(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-col">
      <div className="grid gap-5 w-full">
        <label className="grid gap-2">
          Frequency
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="frequency"
              value={formData}
              onChange={handleChange}
              className="border border-gray-400 py-1 px-2 w-80"
              placeholder="Frequency"
            />
            <span>sec</span>
          </div>
        </label>
        <input
          type="submit"
          value="Submit"
          className="w-full bg-blue-500 text-white rounded py-2 cursor-pointer"
        />
      </div>
    </form>
  );
}
