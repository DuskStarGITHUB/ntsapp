/**
 * @file App.jsx
 * @description The main component for the React application.
 */

import React from "react";
import "./styles/global.css";
import { Textarea } from "./components/ui/textarea";

function App() {
  return (
    <div className="flex flex-col h-screen w-screen bg-black text-white p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Bloc de Notas - NTS</h1>
      </header>
      <main className="flex-1">
        <Textarea
          className="w-full h-full resize-none bg-zinc-900 text-white border border-zinc-700 rounded-xl p-4 text-base focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Escribe tu nota aquí..."
        />
      </main>
    </div>
  );
}

export default App;
