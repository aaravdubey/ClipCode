import { FaFileCode } from "react-icons/fa";

export default function Header({ count }: { count: number }) {
  return (
    <header className="fixed bottom-0 z-10 w-full flex justify-between py-2 bg-dark-grayy ">
      <h1 className="font-semibold text-2xl">
        <FaFileCode className="inline-block text-3xl mx-1.5 bg-gray-700 p-1 rounded-full" />
        clipcode
      </h1>
      <div className="flex items-center gap-1 mr-3">
        <span className="inline-flex bg-green-400 rounded-full w-1.5 h-1.5"></span>
        <p className="text-xs">{count} connected</p>
      </div>
    </header>
  );
}
