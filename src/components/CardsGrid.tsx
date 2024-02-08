import { useEffect, useState } from "react";
import AdditionCard from "./AdditionCard";
import Card from "./Card";
import { BenchmarkSettings } from "../App";
import axios from "axios";

export interface Website {
  name: string;
  url: string;
  latency?: number | "unknown";
}
export interface CardsGridProps {
  frequencyInterval: string;
  benchmarkSettings: BenchmarkSettings;
}

export default function CardsGrid({
  frequencyInterval,
  benchmarkSettings,
}: CardsGridProps) {
  const [websites, setWebsites] = useState<Website[]>([
    {
      name: "Google",
      url: "google.com",
    },
    {
      name: "Facebook",
      url: "facebook.com",
    },
    {
      name: "Amazon",
      url: "amazon.com",
    },
    {
      name: "Ynet",
      url: "ynet.com",
    },
    {
      name: "Mako",
      url: "mako.com",
    },
  ]);

  async function handleWebsiteAddition(newWebsite: Website) {
    try {
      const { data: newWebsiteInfo } = await axios.post(
        "http://localhost:8080/latency/website",
        newWebsite
      );
      setWebsites((websites) => [...websites, newWebsiteInfo]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    axios
      .post("http://localhost:8080/latency/websites", websites)
      .then((res) => {
        setWebsites(res.data);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .post("http://localhost:8080/latency/websites", websites)
        .then((res) => {
          setWebsites(res.data);
        });
    }, +frequencyInterval);
    return () => clearInterval(interval);
  }, [websites, frequencyInterval]);

  return (
    <div className="flex items-center justify-center ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {websites.map((website) => (
          <div key={website.url}>
            <Card website={website} benchmarkSettings={benchmarkSettings} />
          </div>
        ))}
        <AdditionCard handleWebsiteAddition={handleWebsiteAddition} />
      </div>
    </div>
  );
}
