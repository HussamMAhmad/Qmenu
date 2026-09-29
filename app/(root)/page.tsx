import React from "react";
import { Header } from "@/components/Layouts";

function Home() {
  return (
    <div className="bg-slate-50 text-slate-800 dark:text-slate-200 transition-colors duration-300 selection:bg-brand-500 selection:text-white overflow-x-hidden">
      <Header />
    </div>
  );
}

export default Home;
