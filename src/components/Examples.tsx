import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Copy } from "lucide-react";
import { toast } from "sonner";

interface ExampleCardProps {
  title: string;
  description: string;
  code: string;
  level: "beginner" | "intermediate" | "advanced";
}

const ExampleCard: React.FC<ExampleCardProps> = ({
  title,
  description,
  code,
  level,
}) => {
  const navigate = useNavigate();
  
  const getLevelColor = () => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  const handleTryIt = () => {
    navigate('/try', { state: { code } });
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{title}</CardTitle>
          <span
            className={`px-2 py-0.5 text-xs rounded-full font-medium ${getLevelColor()}`}
          >
            {level}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-muted-foreground text-sm mb-3">{description}</p>
        <div className="bg-secondary/50 p-3 rounded-md font-mono text-xs max-h-[200px] overflow-y-auto">
          {code}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={handleCopy}>
          <Copy size={12} />
          Copy
        </Button>
        <Button size="sm" className="gap-1 text-xs" onClick={handleTryIt}>
          <Play size={12} />
          Try it
        </Button>
      </CardFooter>
    </Card>
  );
};

const Examples = () => {
  const examples = [
    {
      title: "Hello",
      description: "Outputs the word 'hello'",
      code: `PLEASE DO :1.
9
PLEASE DO :1.
6
PLEASE DO :1.
13
PLEASE DO :1.
13
PLEASE DO :1.
16
PLEASE CALL :4.
PLEASE EXIT :6.`,
      level: "beginner" as const,
    },
    {
      title: "Hello Programmer",
      description: "Displays a greeting to the programmer",
      code: `PLEASE DO :1.
9
PLEASE DO :1.
6
PLEASE DO :1.
13
PLEASE DO :1.
13
PLEASE DO :1.
16
PLEASE DO :1.
1
PLEASE DO :1.
17
PLEASE DO :1.
19
PLEASE DO :1.
16
PLEASE DO :1.
8
PLEASE DO :1.
19
PLEASE DO :1.
2
PLEASE DO :1.
14
PLEASE DO :1.
14
PLEASE DO :1.
6
PLEASE DO :1.
19
PLEASE CALL :4.
PLEASE EXIT :6.`,
      level: "beginner" as const,
    },
    {
      title: "Clear and Reset",
      description: "Shows how to create values and then clear them",
      code: `PLEASE DO :1.
3
PLEASE DO :1.
26
PLEASE DO :1.
6
PLEASE CALL :4.
PLEASE BREACH :5.
PLEASE DO :1.
3
PLEASE DO :1.
26
PLEASE DO :1.
6
PLEASE CALL :4.
PLEASE EXIT :6.`,
      level: "beginner" as const,
    },
    {
      title: "Value Updates",
      description: "Shows how to update existing values",
      code: `PLEASE DO :1.
16
PLEASE DO :1.
15
PLEASE DO :1.
6
PLEASE CALL :4.
PLEASE LET :3. 0
21
PLEASE LET :3. 1
24
PLEASE LET :3. 2
16
PLEASE CALL :4.
PLEASE EXIT :6.`,
      level: "intermediate" as const,
    },
    {
      title: "Delete Specific Values",
      description: "Demonstrates deleting specific datalings from a sequence",
      code: `PLEASE DO :1.
2
PLEASE DO :1.
3
PLEASE DO :1.
4
PLEASE DO :1.
5
PLEASE DO :1.
6
PLEASE CALL :4.
PLEASE DONT :2. 2
PLEASE CALL :4.
PLEASE EXIT :6.`,
      level: "intermediate" as const,
    },
    {
      title: "Building Words",
      description: "Builds the word 'code' letter by letter",
      code: `PLEASE DO :1.
4
PLEASE CALL :4.
PLEASE DO :1.
16
PLEASE CALL :4.
PLEASE DO :1.
5
PLEASE CALL :4.
PLEASE DO :1.
6
PLEASE CALL :4.
PLEASE EXIT :6.`,
      level: "beginner" as const,
    },
    {
      title: "Word Transformation",
      description: "Demonstrates creating a word and transforming it to another by removing a character",
      code: `PLEASE DO :1.
7
PLEASE DO :1.
19
PLEASE DO :1.
16
PLEASE DO :1.
8
PLEASE CALL :4.
PLEASE DONT :2. 1
PLEASE CALL :4.
PLEASE EXIT :6.`,
      level: "intermediate" as const,
    },
    {
      title: "Complex Sequence",
      description: "Creates and manipulates a more complex sequence of values",
      code: `PLEASE DO :1.
9
PLEASE DO :1.
6
PLEASE DO :1.
13
PLEASE DO :1.
13
PLEASE DO :1.
16
PLEASE CALL :4.
PLEASE BREACH :5.
PLEASE DO :1.
24
PLEASE DO :1.
16
PLEASE DO :1.
19
PLEASE DO :1.
13
PLEASE DO :1.
5
PLEASE CALL :4.
PLEASE EXIT :6.`,
      level: "advanced" as const,
    },
    {
      title: "Interactive Example",
      description: "Shows a variety of Interfuck commands in action",
      code: `PLEASE DO :1.
10
PLEASE DO :1.
15
PLEASE DO :1.
21
PLEASE DO :1.
6
PLEASE DO :1.
19
PLEASE DO :1.
2
PLEASE DO :1.
4
PLEASE DO :1.
21
PLEASE CALL :4.
PLEASE LET :3. 2
22
PLEASE CALL :4.
PLEASE EXIT :6.`,
      level: "advanced" as const,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight">Example Programs</h2>
        <p className="text-muted-foreground mt-2">
          Explore these sample programs to understand Interfuck capabilities and
          learn programming patterns
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example, index) => (
          <ExampleCard
            key={index}
            title={example.title}
            description={example.description}
            code={example.code}
            level={example.level}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link to="/try">
          <Button className="gap-2">
            <Play size={16} />
            Try the IDE
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Examples;
