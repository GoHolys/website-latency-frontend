import AdditionCard from "./AdditionCard";
import Card from "./Card";

export interface Website {
  name: string;
  url: string;
  latency: number;
}

interface CardsGridProps {
  websites: Website[];
}

export default function CardsGrid({ websites }: CardsGridProps) {
  return (
    <div className="flex items-center justify-center ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {websites.map((website) => (
          <Card website={website} />
        ))}
        <AdditionCard />
      </div>
    </div>
  );
}
