'use client'

import React, { createContext, useContext, useState, ReactNode } from "react";
import { PartyTheme, PartyAddOn, CakeFlavor} from '../common'

// 1️⃣ Define types for your party data
export interface PartyData {
  darkMode: boolean;
  name: string;
  email: string;
  partyTheme: PartyTheme;
  newAge: number;
  partyAddOns: PartyAddOn[];
  cakeFlavor: CakeFlavor;
  singingVideo: Blob | null;
  photos: Blob[];
  step: number;
}

// 2️⃣ Define the context value type
export interface PartyContextType {
  partyData: PartyData;
  updatePartyData: (updates: Partial<PartyData>) => void;
}

// 3️⃣ Create the context with default null
const PartyContext = createContext<PartyContextType | null>(null);

// 4️⃣ Provider function component
export function PartyProvider({ children }: { children: ReactNode }) {
  const [partyData, setPartyData] = useState<PartyData>({
    darkMode: false,
    name: "",
    email: "",
    partyTheme: "SHRIMP",
    newAge: 100,
    partyAddOns: [],
    cakeFlavor: "VANILLA",
    singingVideo: null,
    photos: [],
    step: 1,
  });

  function updatePartyData(updates: Partial<PartyData>) {
    setPartyData((prev) => ({ ...prev, ...updates }));
  }

  return (
    <PartyContext.Provider value={{ partyData, updatePartyData }}>
      {children}
    </PartyContext.Provider>
  );
}

// 5️⃣ Custom hook for easier usage
export function useParty() {
  const context = useContext(PartyContext);
  if (!context) {
    throw new Error("useParty must be used within a PartyProvider");
  }
  return context;
}
