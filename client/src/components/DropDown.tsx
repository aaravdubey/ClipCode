import { useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
// import { FaRegCopy } from "react-icons/fa6";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export default function DropDown({
  language,
  languages,
  setLanguage,
  handleCopy,
}: {
  language: string;
  languages: string[];
  setLanguage: (language: string) => void;
  handleCopy: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipText, setTooltipText] = useState("Copy All");
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setIsOpen(false);
  };

  const handleCopyClick = () => {
    handleCopy();
    setTooltipText("Copied!");
    setTooltipVisible(true);

    setTimeout(() => {
      setTooltipVisible(false);
      setTooltipText("Copy All");
    }, 2000);
  };

  return (
    <div className="fixed top-0.5 right-4 inline-block text-left">
      <div className="flex gap-3 items-start">
        <Tippy
          content={<span className="text-xs">{tooltipText}</span>}
          visible={tooltipVisible}
        >
          <button
            onClick={handleCopyClick}
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <FaRegCopy className="text-gray-50 pt-2 text-[1.4rem] opacity-30 hover:opacity-100" />
          </button>
        </Tippy>

        <div className="group">
          <button
            type="button"
            className="inline-flex w-20 justify-between items-center gap-x-1.5 rounded-md px-2 py-1 text-xs text-ellipsis border border-gray-400 group-hover:bg-grayy opacity-30 group-hover:opacity-100"
            id="menu-button"
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={() => setIsOpen(!isOpen)}
          >
            {language}
            <svg
              className="-mr-1 h-3 w-3 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {/* Dropdown Menu */}
          <div
            className="hidden group-hover:block relative right-0 z-10 mt-2 origin-top-right rounded-md bg-[#323232] focus:outline-none overflow-hidden"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div role="none">
              {languages.map((lang, index) => (
                <button
                  key={lang}
                  className={`w-full block p-2 text-xs text-left ${
                    lang == language && "bg-[#272626]"
                  } ${
                    languages.length != index + 1 && "border-b-[1px]"
                  } border-grayy hover:bg-[#272626] overflow-hidden`}
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() => handleLanguageChange(lang)}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
