import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const snippet = codeSnippets[currentSnippet];
    let index = 0;
    setDisplayedCode("");
    setIsTyping(true);

    const typewriter = setInterval(() => {
      if (index < snippet.code.length) {
        setDisplayedCode(snippet.code.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typewriter);
        setIsTyping(false);
        
        // Wait 2 seconds then switch to next snippet
        setTimeout(() => {
          setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
        }, 2000);
      }
    }, 50);

    return () => clearInterval(typewriter);
  }, [currentSnippet]);

  const currentFile = codeSnippets[currentSnippet];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="glass-card rounded-2xl overflow-hidden shadow-2xl"
      data-testid="code-window"
    >
      {/* Window Header */}
      <div className="bg-muted/50 border-b border-border/50 px-4 py-3 flex items-center space-x-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
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
    </motion.div>
  );
}
