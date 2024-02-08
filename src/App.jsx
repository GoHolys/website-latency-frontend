import { useState } from "react";
import CardsGrid from "./components/CardsGrid";
import HeaderSection from "./components/HeaderSection";

function App() {
  const [websites, setWebsites] = useState([
    {
      name: "Google",
      url: "google.com",
      latency: 10,
    },
    {
      name: "Facebook",
      url: "facebook.com",
      latency: 30,
    },
    {
      name: "Amazon",
      url: "amazon.com",
      latency: 10,
    },
    {
      name: "Ynet",
      url: "ynet.com",
      latency: 10,
    },
    {
      name: "Mako",
      url: "mako.com",
      latency: 30,
    },
  ]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen container mx-auto gap-10">
      <div className="mt-5 md:mt-0">
        <HeaderSection />
      </div>
      <CardsGrid websites={websites} />
    </div>
  );
}

export default App;
