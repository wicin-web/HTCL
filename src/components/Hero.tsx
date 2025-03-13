
import { Button } from "@/components/ui/button";
import { ChevronRight, Play, BookText } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden border-b">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[20%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[20%] h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container px-4 py-16 md:py-24 lg:py-32 mx-auto">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>Now in public beta</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Experience the <span className="text-primary">HyperCall</span> Programming Language
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
            HyperCall Programming Language (HCPL) is an esoteric programming language designed to challenge conventional programming paradigms with its unique syntax and execution model.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link to="/try">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <Play size={18} />
                Try it now
              </Button>
            </Link>
            <Link to="/docs">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                <BookText size={18} />
                Read the docs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
