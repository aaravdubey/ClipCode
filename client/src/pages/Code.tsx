import Editor from "react-simple-code-editor";
import Header from "../components/Header";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import { useState, useRef, useEffect } from "react";
import "./Code.scss";
import DropDown from "../components/DropDown";
import { io, Socket } from "socket.io-client";
import { useLocation } from "react-router";

interface ServerToClientEvents {
  receiveCode: (code: string) => void;
  receiveLanguage: (lang: string) => void;
}

interface ClientToServerEvents {
  codeChange: (data: { roomId: string; code: string }) => void;
  joinRoom: (roomId: string) => void;
  languageChange: (data: { roomId: string; language: string }) => void;
}

export default function Code() {
  const [code, setCode] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const [lineNumbers, setLineNumbers] = useState("1");
  const [language, setLanguage] = useState(languages[languages.length - 1]);
  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);
  // const socket = io("http://localhost:3001");
  const roomId = useLocation().pathname.substring(1);
  // console.log(roomId);
  const lineHeight = 18;

  const calculateLineNumbers = () => {
    if (!editorRef.current) return;

    const editorHeight = editorRef.current.clientHeight;
    const numberOfLines = Math.ceil(editorHeight / lineHeight);
    console.log(editorHeight, numberOfLines);
    const lineNumbersString = Array.from(
      { length: numberOfLines },
      (_, i) => i + 1
    ).join("\n");
    setLineNumbers(lineNumbersString);
  };

  const highlightCode = (code: string) =>
    Prism.highlight(
      code,
      Prism.languages[language] || Prism.languages.plaintext,
      language
    );

  const handleCopy = () => {
    navigator.clipboard.writeText(code).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  };

  const handleCodeChange = (code: string) => {
    setCode(code);
    if (socket) socket.emit("codeChange", { roomId, code });
  };

  const handleLangChange = (language: string) => {
    setLanguage(language);
    if (socket) socket.emit("languageChange", { roomId, language });
  };

  useEffect(() => {
    calculateLineNumbers();
  }, [code]);

  useEffect(() => {
    let socketX: Socket<ServerToClientEvents, ClientToServerEvents>;
    if (socket) socketX = socket;
    else {
      socketX = io("http://localhost:3001");
      setSocket(socketX);
    }

    socketX.emit("joinRoom", roomId);

    socketX.on("receiveCode", (code) => {
      setCode(code);
    });

    socketX.on("receiveLanguage", (lang) => {
      setLanguage(lang);
    });

    return () => {
      socketX.off("receiveCode");
      socketX.disconnect();
    };
  }, []);

  return (
    <div>
      <Header />

      <main className="flex relative">
        {/* Line Numbers */}
        <div className="min-h-screen px-4 text-[12px] select-none text-gray-500 bg-[#1a1d1f]">
          <pre>{lineNumbers}</pre>
        </div>

        {/* Code Editor */}
        <div className="flex-1 px-2">
          <div ref={editorRef}>
            <Editor
              value={code}
              onValueChange={handleCodeChange}
              highlight={highlightCode}
              placeholder="// Paste your code here"
              // padding={10}
              className={`bg-grayy font-mono text-[12px]  code-editor`}
              style={{
                lineHeight: `${lineHeight}px`,
              }}
            />
          </div>
        </div>

        <DropDown
          language={language}
          languages={languages}
          setLanguage={handleLangChange}
          handleCopy={handleCopy}
        />
      </main>
    </div>
  );
}

const languages = [
  "jsx",
  "javascript",
  "java",
  "html",
  "xml",
  "css",
  "python",
  "sql",
  "c",
  "cpp",
  "csharp",
  "none",
];
