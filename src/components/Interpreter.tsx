
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Trash, Copy, Save, Download } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Define a simple instruction set for Interfuck language
const INSTRUCTIONS = {
  ">": "Move the pointer to the right",
  "<": "Move the pointer to the left",
  "+": "Increment the memory cell at the pointer",
  "-": "Decrement the memory cell at the pointer",
  ".": "Output the character signified by the cell at the pointer",
  ",": "Input a character and store it in the cell at the pointer",
  "[": "Jump past the matching ] if the cell at the pointer is 0",
  "]": "Jump back to the matching [ if the cell at the pointer is nonzero",
  "!": "Print the numeric value of the current cell",
  "?": "Print the current state of the memory and pointer for debugging",
};

interface HighlightedCodeProps {
  code: string;
}

// Component to display highlighted code
const HighlightedCode: React.FC<HighlightedCodeProps> = ({ code }) => {
  const highlight = (text: string) => {
    return text
      .split("")
      .map((char, index) => {
        let className = "";
        
        if ("><".includes(char)) className = "token-keyword";
        else if ("+-".includes(char)) className = "token-operator";
        else if ("[].!?".includes(char)) className = "token-string";
        else if (char === ",") className = "token-comment";
        
        return (
          <span key={index} className={className}>
            {char}
          </span>
        );
      });
  };

  return (
    <div className="font-mono whitespace-pre-wrap overflow-x-auto">
      {highlight(code)}
    </div>
  );
};

// Interpreter for Interfuck language
const interpretInterfuck = (code: string): { output: string; logs: string[] } => {
  // Filter out non-instruction characters
  const validChars = Object.keys(INSTRUCTIONS).join("");
  code = code.split("").filter(char => validChars.includes(char)).join("");
  
  const memory = new Array(30000).fill(0);
  let pointer = 0;
  let output = "";
  const logs = [];
  
  // Find matching brackets
  const bracketPairs: Record<number, number> = {};
  const stack: number[] = [];
  
  for (let i = 0; i < code.length; i++) {
    if (code[i] === '[') {
      stack.push(i);
    } else if (code[i] === ']') {
      if (stack.length === 0) {
        logs.push(`Error: Unmatched closing bracket at position ${i}`);
        return { output, logs };
      }
      const openingIndex = stack.pop()!;
      bracketPairs[openingIndex] = i;
      bracketPairs[i] = openingIndex;
    }
  }
  
  if (stack.length > 0) {
    logs.push(`Error: Unmatched opening bracket at position ${stack[0]}`);
    return { output, logs };
  }
  
  // Execute the code
  for (let i = 0; i < code.length; i++) {
    const instruction = code[i];
    
    switch (instruction) {
      case '>':
        pointer = (pointer + 1) % 30000;
        break;
      case '<':
        pointer = (pointer - 1 + 30000) % 30000;
        break;
      case '+':
        memory[pointer] = (memory[pointer] + 1) % 256;
        break;
      case '-':
        memory[pointer] = (memory[pointer] - 1 + 256) % 256;
        break;
      case '.':
        output += String.fromCharCode(memory[pointer]);
        break;
      case ',':
        // In a web context, we can't easily get input, so we'll just set a default value
        memory[pointer] = 0;
        logs.push("Input operation encountered (set to 0 by default)");
        break;
      case '[':
        if (memory[pointer] === 0) {
          i = bracketPairs[i];
        }
        break;
      case ']':
        if (memory[pointer] !== 0) {
          i = bracketPairs[i];
        }
        break;
      case '!':
        output += memory[pointer].toString() + " ";
        break;
      case '?':
        const memoryState = memory.slice(Math.max(0, pointer - 5), pointer + 6);
        logs.push(`Memory[${Math.max(0, pointer - 5)}...${pointer + 5}]: [${memoryState.join(", ")}]`);
        logs.push(`Pointer: ${pointer}, Value: ${memory[pointer]}`);
        break;
    }
    
    // Safety check to prevent infinite loops
    if (i > 100000) {
      logs.push("Execution halted: maximum instruction count exceeded");
      break;
    }
  }
  
  return { output, logs };
};

// Example programs
const EXAMPLES = {
  "Hello World": `+++++++++[>++++++++<-]>++++++++++[>++++++++++<-]>+++++.>+++++++++[>+++++++++++<-]>+.+++++++..+++.>++++[>+++++++++++<-]>-.------------.<<<<+++++++++++++++.>>.+++.------.--------.>>+.`,
  "Counter to 10": `++++++++++[>!<-]`,
  "Debug Test": `+++>++>+<?<?<?`,
  "Cat Program": `,[-.,]`,
  "Simple Addition": `++++[>+++++<-]>[<++++>-]<[>!<-]`,
};

interface InterpreterProps {
  initialCode?: string | null;
}

const Interpreter: React.FC<InterpreterProps> = ({ initialCode = null }) => {
  const [code, setCode] = useState<string>(EXAMPLES["Hello World"]);
  const [output, setOutput] = useState<string>("");
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  // Initialize with initialCode when available
  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);
  
  const runCode = () => {
    setIsRunning(true);
    setOutput("");
    setLogs([]);
    
    try {
      setTimeout(() => {
        const { output: result, logs: executionLogs } = interpretInterfuck(code);
        setOutput(result);
        setLogs(executionLogs);
        setIsRunning(false);
      }, 100); // Small delay to allow UI to update
    } catch (error) {
      setLogs(prev => [...prev, `Runtime error: ${(error as Error).message}`]);
      setIsRunning(false);
    }
  };
  
  const clearCode = () => {
    setCode("");
    setOutput("");
    setLogs([]);
  };
  
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };
  
  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "interfuck-program.if";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Downloaded code");
  };
  
  const loadExample = (name: string) => {
    setCode(EXAMPLES[name as keyof typeof EXAMPLES]);
    setOutput("");
    setLogs([]);
  };
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Code Editor</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyCode}
                className="h-8 px-2 text-xs"
              >
                <Copy size={14} className="mr-1" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearCode}
                className="h-8 px-2 text-xs"
              >
                <Trash size={14} className="mr-1" />
                Clear
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadCode}
                className="h-8 px-2 text-xs"
              >
                <Download size={14} className="mr-1" />
                Save
              </Button>
            </div>
          </div>
          
          <div className="editor-wrapper">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono text-sm p-4 w-full h-64 resize-none bg-card focus:outline-none focus:ring-1 focus:ring-ring"
              spellCheck="false"
              placeholder="Enter your Interfuck code here..."
            />
            <div className="absolute inset-0 pointer-events-none p-4">
              <HighlightedCode code={code} />
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              <Button
                onClick={runCode}
                disabled={isRunning || !code.trim()}
                className="gap-2"
              >
                <Play size={16} />
                {isRunning ? "Running..." : "Run"}
              </Button>
            </div>
            
            <div className="flex gap-2">
              <select
                onChange={(e) => loadExample(e.target.value)}
                className="h-9 rounded-md border bg-transparent px-3 py-1 text-sm text-muted-foreground focus:outline-none"
                value=""
              >
                <option value="" disabled>
                  Load example
                </option>
                {Object.keys(EXAMPLES).map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm font-medium mb-2">Output</h3>
          <div className="code-output flex-1">
            {output ? (
              <div className="whitespace-pre-wrap">
                {output || "No output generated yet."}
              </div>
            ) : (
              <div className="text-muted-foreground">
                Run your code to see the output here.
              </div>
            )}
          </div>
          
          {logs.length > 0 && (
            <>
              <h3 className="text-sm font-medium mt-4 mb-2">Logs</h3>
              <div className="code-output">
                {logs.map((log, index) => (
                  <div key={index} className="text-xs">
                    {log}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-sm font-medium mb-3">Instruction Reference</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(INSTRUCTIONS).map(([symbol, description]) => (
            <div
              key={symbol}
              className="flex gap-3 p-3 rounded-md border bg-card"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded bg-primary/10 font-mono text-primary">
                {symbol}
              </div>
              <div className="text-sm">{description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interpreter;
