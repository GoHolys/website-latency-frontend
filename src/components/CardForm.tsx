import React, { useState } from "react";

export default function CardForm() {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
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
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-400 py-1 px-2 w-80"
            placeholder="Name"
          />
        </label>
        <label className="grid gap-2">
          Url
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="border border-gray-400 py-1 px-2 w-80"
            placeholder="Url"
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
