import { useState } from "react";
import { FaFileCode } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router";

export default function Header({ count }: { count: number }) {
  const [isCopied, setIsCopied] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const path = `${window.location.protocol}//${window.location.host}${location.pathname}${location.search}${location.hash}`;

  const handleCopy = () => {
    setIsCopied(true);

    navigator.clipboard.writeText(path).catch((err) => {
      console.error("Failed to copy text: ", err);
    });

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <header className="relative h-[6vh] z-10 w-full flex justify-between items-center bg-dark-grayy ">
      <h1
        onClick={() => navigate("")}
        className="font-semibold text-lg xs:text-2xl cursor-pointer"
      >
        <FaFileCode className="inline-block text-xl xs:text-3xl mx-1.5 bg-gray-700 p-0.5 xs:p-1 rounded-full" />
        clipcode
      </h1>

      <div className="flex items-center gap-1 mr-2">
        {isShare && (
          <>
            <div className="w-56 xs:w-fit absolute -top-32 right-0 z-10 bg-[#323232] text-gray-50 mr-3 flex flex-col justify-center px-2 py-1.5 rounded text-[0.65rem] xs:text-xs gap-1 xs:gap-2 ">
              <p className="text-sm xs:text-base w-full flex justify-between">
                Share Room Link
                <button
                  onClick={() => setIsShare(false)}
                  className="px-1.5 hover:bg-zinc-700 rounded-full group"
                >
                  <IoMdClose className="text-xs text-zinc-300 group-hover:text-white" />
                </button>
              </p>
              <p className="xs:text-nowrap">
                Anyone with access to this URL will see your code in real time.
              </p>
              <p className="text-zinc-400">Share this URL</p>

              <div className="flex gap-1">
                <input
                  type="text"
                  value={path}
                  readOnly
                  className="text-nowrap flex-1 bg-[#272626] rounded p-1.5"
                />
                <button
                  onClick={handleCopy}
                  className="px-1.5 text-xs hover:bg-zinc-800 rounded"
                >
                  {isCopied ? <MdOutlineDone /> : <FaRegCopy />}
                </button>
              </div>
            </div>
          </>
        )}

        <button
          onClick={() => setIsShare(true)}
          className="bg-grayy hover:bg-gray-800 mr-3 flex items-center px-2 py-1 rounded text-[0.65rem] xs:text-xs gap-1 "
        >
          <RiShareForwardLine />
          Share Link
        </button>
        <span className="inline-flex bg-green-400 rounded-full w-1.5 h-1.5"></span>
        <p className="text-[0.65rem] xs:text-xs">{count} connected</p>
      </div>
    </header>
  );
}
