import React from "react";
import { Header , Footer} from "@/components/Layouts";
import { Main, Features , HowItWorks , Pricing , Faq, FinalCall} from "@/components/Sections";

function Home() {
  return (
    <div className="bg-slate-50 text-slate-800 flex flex-col transition-colors duration-300 selection:bg-brand-500 selection:text-white overflow-x-hidden">
      <Header />
      <Main />
      <Features />
      <HowItWorks />
      <Pricing />
      <Faq />
      <FinalCall />
      <Footer />
    </div>
  );
}

export default Home;
