
import Layout from "@/components/Layout";
import InterfuckInterpreter from "@/components/InterfuckInterpreter";

const Try = () => {
  return (
    <Layout>
      <div className="container px-4 py-16">
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">HyperCall IDE</h1>
          <p className="text-muted-foreground text-lg">
            Write, run, and debug HCPL code in your browser
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <InterfuckInterpreter />
        </div>
      </div>
    </Layout>
  );
};

export default Try;
