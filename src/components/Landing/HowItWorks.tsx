
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';

const STEPS = [
  {
    step: "01",
    title: "Upload Your Documents",
    description: "Simply drag and drop your documents or browse to upload them. We support various formats including PDF, DOCX, and TXT.",
  },
  {
    step: "02",
    title: "AI Processes Your Content",
    description: "Our advanced AI analyzes and understands your documents, extracting key information and creating a searchable knowledge base.",
  },
  {
    step: "03",
    title: "Chat and Get Answers",
    description: "Ask questions about your documents in natural language. Our AI provides answers based on the content of your files.",
  },
];

const HowItWorks = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section id="how-it-works" className="py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold"
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Get started in just a few simple steps
          </motion.p>
        </div>
        
        <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {STEPS.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-5 -top-5 text-6xl font-bold text-primary/10">{step.step}</div>
              <div className="bg-card/50 backdrop-blur-sm border border-border/60 rounded-lg p-6 shadow-sm relative z-10">
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <Link to={isAuthenticated ? '/dashboard' : '/register'}>
            <Button size="lg">
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started Now'}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
