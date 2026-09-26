"use client";
import { Preview } from 'shaders/react'

export function SmokeScreen() {
  return (
  <div className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden">
      <Preview presetId="77e87f9f-add2-470a-ae55-8760075f28f1" />
  </div>
  );
}