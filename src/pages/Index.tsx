
import Hero from "@/components/Hero";
import Examples from "@/components/Examples";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal, BookText, Database, Sparkles, Code, LayoutGrid } from "lucide-react";

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => {
  return (
    <Card className="bg-card transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-primary/10 text-primary">
            {icon}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Why HyperCall?
              </h2>
              <p className="text-muted-foreground text-lg">
                Discover the unique advantages of programming in this esoteric language
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in animate-delay-200">
              <FeatureCard
                icon={<Terminal size={24} />}
                title="Unique Data Structure"
                description="HyperCall uses the Databer system with Datalings, where each command's value is specified on the next line for clear data input."
              />
              <FeatureCard
                icon={<BookText size={24} />}
                title="Polite Syntax"
                description="Commands start with 'PLEASE', followed by the action, with values provided on separate lines, making code structure clear and courteous."
              />
              <FeatureCard
                icon={<Database size={24} />}
                title="Extensive Character Mapping"
                description="Supports a comprehensive set of 74 character mappings including lowercase and uppercase letters, numbers 0-9, and special characters for rich text output."
              />
              <FeatureCard
                icon={<Sparkles size={24} />}
                title="Creative Challenge"
                description="Comments use // for notes, and the clear line-by-line structure makes programs easy to write and understand."
              />
              <FeatureCard
                icon={<Code size={24} />}
                title="Educational Value"
                description="Perfect for learning programming concepts with its unique approach to data manipulation, control flow, and memory management in a simplified environment."
              />
              <FeatureCard
                icon={<LayoutGrid size={24} />}
                title="Visual Datalings"
                description="Watch your data structures in real-time with visual representations of Datalings, making it easier to understand how your program interacts with memory."
              />
            </div>
          </div>
        </section>
        
        {/* Examples Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container px-4">
            <Examples />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
