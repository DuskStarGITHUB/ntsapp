import React from "react";
import { Input } from "@/components/ui/input";

export default function NoteTitleInput({ title }) {
  return (
    <Input
      value={title}
      readOnly
      aria-label="Nombre de la nota"
      className="mb-4 text-lg font-semibold bg-zinc-800 text-white"
    />
  );
}
