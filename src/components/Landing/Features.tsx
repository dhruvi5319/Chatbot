
import { motion } from 'framer-motion';
import { Upload, MessageSquare, FileText, Shield, Globe } from 'lucide-react';

const FEATURES = [
  {
    icon: <Upload className="h-6 w-6" />,
    title: "Document Upload",
    description: "Easily upload various document formats including PDF, DOCX, TXT, and more.",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "AI-Powered Chat",
    description: "Ask questions about your documents and get instant, accurate answers.",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Document Analysis",
    description: "Our AI analyzes your documents to extract key information and insights.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure Storage",
    description: "Your documents are securely stored with enterprise-grade encryption.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Web Search Fallback",
    description: "When your documents don't have the answer, we search the web for you.",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Document Management",
    description: "Organize and manage your documents with our intuitive interface.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-6 md:px-12 lg:px-24 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold"
          >
            Powerful Features
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Everything you need to interact with your documents
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border/60 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
