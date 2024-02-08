import React, { useState } from "react";
import Circle from "./Circle";

export default function Form() {
  const [formData, setFormData] = useState({
    red: "",
    orange: "",
    green: "",
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
        <label className="grid gap-3">
          <Circle bgColor={"bg-red-500"} />
          <div className="flex items-center gap-3">
            <input
              type="text"
              name="red"
              value={formData.red}
              onChange={handleChange}
              className="border border-gray-400 py-1 px-2 w-80"
              placeholder="latency"
            />
            <span>ms</span>
          </div>
        </label>
        <label className="grid gap-3">
          <Circle bgColor={"bg-orange-500"} />
          <div className="flex items-center gap-3">
            <input
              type="text"
              name="orange"
              value={formData.orange}
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
              name="green"
              value={formData.green}
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
    </form>
  );
}
