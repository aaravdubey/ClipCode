import { FaFileCode } from "react-icons/fa";
import { useNavigate } from "react-router";
import generateRandomString from "../utils/random";
import CodeSnipps from "../components/CodeSnipps";
import { FaGithub } from "react-icons/fa6";

export default function Main() {
  const navigate = useNavigate();
  const createRoom = () => {
    navigate("/" + generateRandomString());
  };
  return (
    <div className="h-screen">
      <header className="fixed top-0 w-full py-5 px-5 xs:px-7 flex justify-between items-end">
        <h1 className="font-semibold text-2xl">
          <FaFileCode className="inline-block text-3xl mr-1.5 bg-gray-700 p-1 rounded-full" />
          clipcode
        </h1>
        <a
          href="https://github.com/aaravdubey/Clipcode"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-zinc-700/60 p-1 rounded-full"
        >
          {" "}
          <FaGithub className="text-xl" />{" "}
        </a>
      </header>

      <main className="h-full flex flex-col justify-center items-center tracking-wide">
        <h1 className="text-3xl lg:text-6xl font-semibold px-5 xs:px-7 text-center">
          Easy
          <span className="bg-gray-500/15 rounded px-2 mx-1 lg:mx-2 text-2xl lg:text-5xl font-mono">
            Ctrl+C
          </span>
          <span className="block xs:hidden"></span>
          <span className="bg-gray-500/15 rounded px-2 mx-1 lg:mx-2 text-2xl lg:text-5xl font-mono">
            Ctrl+V
          </span>
          Code Snippets
        </h1>

        <h2 className="mt-5 xs:mt-10 text-xs xs:text-base lg:text-xl px-5 xs:px-7 text-center">
          A simple online code editor & code clipboard to type, copy or paste
          code in real-time.
        </h2>

        <button
          onClick={createRoom}
          className="mt-8 xs:mt-16 bg-cyan-800 hover:bg-cyan-900 px-3 py-2 text-base xs:px-6 xs:py-4 xs:text-xl rounded"
        >
          Share Code Now
        </button>

        <CodeSnipps
          code={reactCode}
          language={"jsx"}
          classes={`hidden md:block absolute bottom-0 right-10 opacity-20 -z-10`}
        />
        <CodeSnipps
          code={javaCode}
          language={"java"}
          classes={`hidden md:block absolute top-14 left-20 opacity-15 -z-10`}
        />
      </main>

      <div className="absolute inset-0 vignette -z-10" />

      <footer className="fixed bottom-0 w-full p-5 text-center text-zinc-700 text-[0.65rem] xs:text-sm flex justify-center tracking-wide">
        <p className="w-[40rem]">
          Developed by{" "}
          <a
            href="https://github.com/aaravdubey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:underline"
          >
            Aarav Dubey
          </a>
          <span className="hidden xs:block">
            . Frontend built with React.js, Tailwind CSS,
            react-simple-code-editor and Prism.js, deployed with Vercel. Backend
            built with Node.js, Express.js, and Socket.io, deployed with Render.
          </span>
        </p>
      </footer>
    </div>
  );
}

const reactCode = `import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  return (
    <div>
      <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button onClick={() => { setTodos([...todos, newTodo]);}}>Add</button>
      <ul>{todos.map((todo, i) => <li key={i}>{todo}</li>)}</ul>
    </div>
  );
};

export default TodoList;
`;

const javaCode = `public class Person {
  private String name;
  private int age;

  public Person(String name, int age) {
      this.name = name;
      this.age = age;
  }

  public void displayInfo() {
      System.out.println("Name: " + name + ", Age: " + age);
  }

  public static void main(String[] args) {
      Person person = new Person("Aarav", 25);
      person.displayInfo();
  }
}`;
