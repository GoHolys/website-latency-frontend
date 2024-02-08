
interface HeaderCardProps {
  name: string;
}

export default function HeaderCard({ name }:HeaderCardProps) {
  return (
    <div className="rounded-xl shadow-lg h-44 w-72 p-5 flex flex-col bg-gradient-to-r from-gray-200 to-white items-center justify-center cursor-pointer">
      <h5 className="text-2xl md:text-3xl font-medium mt-3 text-center">
        {name}
      </h5>
    </div>
  );
}
