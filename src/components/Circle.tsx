interface CircleProps {
  bgColor?: string;
}

export default function Circle({ bgColor }: CircleProps) {
  return <div className={`h-5 w-5 shadow-md rounded-full ${bgColor}`}></div>;
}
