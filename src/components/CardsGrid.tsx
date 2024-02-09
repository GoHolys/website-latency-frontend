import { useEffect, useState } from "react";
import AdditionCard from "./AdditionCard";
import Card from "./Card";
import { BenchmarkSettings } from "../App";
import axios, { AxiosResponse } from "axios";

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
  const [isLoading, setIsLoading] = useState(false);
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
      console.log(newWebsiteInfo);
      setWebsites((websites) => [...websites, newWebsiteInfo]);
    } catch (error) {
      console.error(error);
    }
  }

  function handleWebsiteRemoval(targetWebsite: Website) {
    setWebsites((currentWebsites) =>
      currentWebsites.filter((website) => website.url !== targetWebsite.url)
    );
  }

  async function handleWebsiteUpdate(
    targetWebsite: Website,
    formData: Website
  ) {
    const updatedWebsites = await Promise.all(
      websites.map(async (website) => {
        if (website.url === targetWebsite.url) {
          if (formData.url !== targetWebsite.url) {
            const { data: newWebsiteInfo } = await fetchWebsite(formData);
            return newWebsiteInfo;
          }
          return { latency: targetWebsite.latency, ...formData };
        }
        return website;
      })
    );
    setWebsites(updatedWebsites);
  }

  function fetchWebsite(newWebsite: Website): Promise<AxiosResponse<Website>> {
    return axios.post("http://localhost:8080/latency/website", newWebsite);
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .post("http://localhost:8080/latency/websites", websites)
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
        .post("http://localhost:8080/latency/websites", websites, {
          signal: controller.signal,
        })
        .then((res) => {
          setWebsites(res.data);
          console.log("is this happening");
        })
        .catch(() => {
          return;
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, +frequencyInterval);
    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [frequencyInterval, websites]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex items-center justify-center ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {websites.map((website) => (
          <div key={website.url}>
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
