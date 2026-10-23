import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

const codeSnippets = [
  {
    filename: "workflow.py",
    code: `# Automated lead qualification workflow
from foundry import Pipeline

pipeline = Pipeline()
pipeline.trigger("new_lead")`,
  },
  {
    filename: "automation.js",
    code: `// Auto-route high-value leads
const leadRouter = new AutoRouter({
  rules: ["score > 80", "budget > 10k"],
  action: "notify_sales_team"
});`,
  },
  {
    filename: "template.html",
    code: `<!-- Dynamic email template -->
<template name="welcome">
  <h1>Welcome {{customer.name}}!</h1>
  <p>Your {{product}} is ready.</p>
</template>`,
  },
];

export default function CodeWindow() {
  // With reduced motion, the first snippet shows in full and nothing types or cycles.
  const reduceMotion = useReducedMotion();
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [displayedCode, setDisplayedCode] = useState(reduceMotion ? codeSnippets[0].code : "");
  const [isTyping, setIsTyping] = useState(!reduceMotion);

  useEffect(() => {
    const snippet = codeSnippets[currentSnippet];
    if (reduceMotion) {
      setDisplayedCode(snippet.code);
      setIsTyping(false);
      return;
    }

    let index = 0;
    setDisplayedCode("");
    setIsTyping(true);

    // Batch 3 chars per tick at 80ms — same perceived speed, ~6× fewer renders.
    const charsPerTick = 3;
    let nextTimeout: ReturnType<typeof setTimeout>;

    const typewriter = setInterval(() => {
      if (index < snippet.code.length) {
        index = Math.min(index + charsPerTick, snippet.code.length);
        setDisplayedCode(snippet.code.slice(0, index));
      } else {
        clearInterval(typewriter);
        setIsTyping(false);
        // Type each snippet once, then stay on the last one rather than looping forever.
        if (currentSnippet < codeSnippets.length - 1) {
          nextTimeout = setTimeout(() => {
            setCurrentSnippet((prev) => prev + 1);
          }, 2000);
        }
      }
    }, 80);

    return () => {
      clearInterval(typewriter);
      clearTimeout(nextTimeout);
    };
  }, [currentSnippet, reduceMotion]);

  const currentFile = codeSnippets[currentSnippet];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="glass-card rounded-2xl overflow-hidden shadow-2xl"
      data-testid="code-window"
    >
      {/* Screen readers get every snippet once, as static text, instead of the
          half-typed code changing under them. */}
      <div className="sr-only">
        <p>Example automation code:</p>
        {codeSnippets.map((snippet) => (
          <figure key={snippet.filename}>
            <figcaption>{snippet.filename}</figcaption>
            <pre>{snippet.code}</pre>
          </figure>
        ))}
      </div>

      <div aria-hidden="true">
        {/* Window Header */}
        <div className="bg-muted/50 border-b border-border/50 px-4 py-3 flex items-center space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-muted-foreground/60 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-sm text-muted-foreground ml-4" data-testid="code-filename">
            {currentFile.filename}
          </div>
        </div>

        {/* Code Content */}
        <div className="bg-black/40 p-6 font-mono text-sm min-h-[200px]">
          <pre className="text-zinc-300 whitespace-pre-wrap" data-testid="code-content">
            {displayedCode}
            {isTyping && <span className="typewriter"></span>}
          </pre>
        </div>
      </div>
    </motion.div>
  );
}
