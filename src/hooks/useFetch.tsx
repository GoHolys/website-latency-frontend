import { useEffect, useState } from "react";

export default function useFetch<T>(
  url: string,
  method: string,
  body?: T,
  interval?: number
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [url, method]);

  useEffect(() => {
    if (interval) {
      console.log("bye");
      let intervalId: number;
      intervalId = setInterval(fetchData, interval);
      return () => clearInterval(intervalId);
    }
  }, [interval]);

  return { data, error, loading, setData };
}
