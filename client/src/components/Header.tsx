import { FaFileCode } from "react-icons/fa";

export default function Header() {
  return (
    <header className="fixed bottom-0 z-10 w-full flex  py-2 bg-dark-grayy ">
      <h1 className="font-semibold text-2xl">
        <FaFileCode className="inline-block text-3xl mx-1.5 bg-gray-700 p-1 rounded-full" />
        clipcode
      </h1>
    </header>
  );
}
