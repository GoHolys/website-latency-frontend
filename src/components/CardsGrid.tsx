import axios from "axios";
import { useEffect, useState } from "react";
import { BenchmarkSettings } from "../App";
import AdditionCard from "./AdditionCard";
import Card from "./Card";

export interface Website {
  id: string;
  name: string;
  url: string;
  latency?: number | "unknown";
}

export interface WebsiteToAdd {
  name: string;
  url: string;
}
export interface CardsGridProps {
  frequencyInterval: string;
  benchmarkSettings: BenchmarkSettings;
}

export default function CardsGrid({
  frequencyInterval,
  benchmarkSettings,
}: CardsGridProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [websites, setWebsites] = useState<Website[]>([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8080/latency/websites")
      .then((res) => {
        setWebsites(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const interval = setInterval(() => {
      setIsLoading(true);
      axios
        .get("http://localhost:8080/latency/websites", {
          signal: controller.signal,
        })
        .then((res) => {
          setWebsites(res.data);
        })
        .catch(() => {
          return;
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, +frequencyInterval * 1000);
    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [frequencyInterval, websites]);

  async function handleWebsiteAddition(newWebsite: Website) {
    try {
      const { data: websites } = await axios.post(
        "http://localhost:8080/latency/websites",
        newWebsite
      );
      setWebsites(websites);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleWebsiteUpdate(website: WebsiteToAdd, websiteId: string) {
    try {
      const { data: websites } = await axios.put(
        "http://localhost:8080/latency/websites",
        { id: websiteId, ...website }
      );
      console.log(website);
      setWebsites(websites);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleWebsiteRemoval(websiteId: string) {
    try {
      const { data: websites } = await axios.delete(
        `http://localhost:8080/latency/websites/${websiteId}`
      );
      console.log(websites);
      setWebsites(websites);
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex items-center justify-center ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {websites.map((website) => (
          <div key={website.id}>
            <Card
              website={website}
              benchmarkSettings={benchmarkSettings}
              handleWebsiteRemoval={handleWebsiteRemoval}
              handleWebsiteUpdate={handleWebsiteUpdate}
            />
          </div>
        ))}
        <AdditionCard handleWebsiteAddition={handleWebsiteAddition} />
      </div>
    </div>
  );
}
