'use client'
import Image from "next/image";
import {createContext, useState, useEffect } from 'react'
import { PartyTheme, PartyThemes, PartyAddOn, PartyAddOns, CakeFlavor, CakeFlavors} from './common'
import { useParty } from "./contexts/PartyContext";

interface PartyFormData {
  darkMode: boolean,
  name: string;
  partyTheme: PartyTheme;
  newAge: number;
  partyAddOns: PartyAddOn[];
  cakeFlavor: CakeFlavor;
}
export default function Home() {

  const { partyData, updatePartyData } = useParty();

  const [formData, setFormData] = useState<PartyFormData>({
    darkMode: partyData.darkMode ?? false,
    name: partyData.name ?? "",
    partyTheme: partyData.partyTheme ?? "SHRIMP",
    newAge: partyData.newAge ?? 100,
    partyAddOns: partyData.partyAddOns ?? [],
    cakeFlavor: partyData.cakeFlavor ?? "VANILLA",
  });

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    // Update global party context on submit
    updatePartyData(formData);
    console.log("Updated Party Context:", formData);

    // Optionally navigate to next step (e.g., photobooth)
    // router.push("/photobooth");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === "partyAddOns") {
      const val = e.target.value as PartyAddOns;
      setFormData((prev) => {
        const alreadySelected = prev.partyAddOns.includes(val);
        return {
          ...prev,
          partyAddOns: alreadySelected
            ? prev.partyAddOns.filter((a) => a !== val)
            : [...prev.partyAddOns, val],
        };
      });
    } else if (type === "checkbox") {
      const checked = e.target.checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Welcome to your virtual birthday party!</h1>
      <div className={`min-h-screen p-4 ${formData.darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold mb-4">🎉 Birthday Party Form</h2>

        {/* Dark mode toggle */}
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="darkMode"
            checked={formData.darkMode}
            onChange={handleChange}
            className="h-5 w-5"
          />
          Dark Mode
        </label>

        {/* Name input */}
        <label className="flex flex-col">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your name"
            required
          />
        </label>

        {/* Party Theme dropdown */}
        <label className="flex flex-col">
          Party Theme:
          <select
            name="partyTheme"
            value={formData.partyTheme}
            onChange={handleChange}
            className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {PartyThemes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </label>

        {/* Age number selector */}
        <label className="flex flex-col">
          New Age:
          <input
            type="number"
            name="newAge"
            value={formData.newAge}
            onChange={handleChange}
            className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min={0}
            max={150}
          />
        </label>

        {/* Party Add-Ons multi-select (checkboxes) */}
        <fieldset>
          <legend className="mb-1 font-medium">Party Add-Ons:</legend>
          <div className="flex flex-col gap-1">
            {PartyAddOns.map((addOn) => (
              <label key={addOn} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="partyAddOns"
                  value={addOn}
                  checked={formData.partyAddOns.includes(addOn)}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                {addOn}
              </label>
            ))}
          </div>
        </fieldset>
        {/* Cake Flavor dropdown */}
        <label className="flex flex-col">
          Cake Flavor:
          <select
            name="cakeFlavor"
            value={formData.cakeFlavor}
            onChange={handleChange}
            className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {CakeFlavors.map((flavor) => (
              <option key={flavor} value={flavor}>
                {flavor}
              </option>
            ))}
          </select>
        </label>

        {/* Submit button */}
        <button
          type="submit"
          className="mt-4 p-3 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
        >
          Save & Next
        </button>
      </form>
       </div>
      <button>Start Your Party</button>
    </div>
  );
}
