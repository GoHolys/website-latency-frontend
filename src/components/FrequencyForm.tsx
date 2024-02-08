import React, { useState } from "react";

export default function FrequencyForm() {
  const [formData, setFormData] = useState({
    frequency: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-col">
      <div className="grid gap-5 w-full ">
        <label className="grid gap-2">
          Frequency
          <input
            type="text"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className="border border-gray-400 py-1 px-2 w-80"
            placeholder="Frequency"
          />
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
