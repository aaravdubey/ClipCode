import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-sql";
import { useEffect } from "react";

export default function CodeSnipps({
  code,
  language,
  classes,
}: {
  code: string;
  language: string;
  classes: string;
}) {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <pre className={classes}>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
}
