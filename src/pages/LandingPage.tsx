
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { FileText, MessageSquare, Upload, Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between border-b backdrop-blur-sm bg-background/90 sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold">DocuChat</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">How it works</a>
          <Link to={isAuthenticated ? '/dashboard' : '/login'}>
            <Button>{isAuthenticated ? 'Go to Dashboard' : 'Sign In'}</Button>
          </Link>
        </nav>
        
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </header>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden p-4 bg-background border-b"
        >
          <nav className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="p-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="p-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it works
            </a>
            <Link 
              to={isAuthenticated ? '/dashboard' : '/login'}
              className="p-2 text-primary hover:text-primary/80 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Sign In'}
            </Link>
          </nav>
        </motion.div>
      )}
      
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Chat with your documents, powered by AI
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Upload your documents and get instant answers. DocuChat analyzes your files and provides accurate responses based on their content.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to={isAuthenticated ? '/dashboard' : '/register'}>
                <Button size="lg" className="w-full sm:w-auto">
                  {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl overflow-hidden shadow-2xl border border-border/60"
          >
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80" 
              alt="AI Document Chat Interface" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
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
            {[
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
            ].map((feature, index) => (
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
      
      {/* How it Works Section */}
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
            {[
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
            ].map((step, index) => (
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
      
      {/* Footer */}
      <footer className="bg-card border-t py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <h2 className="text-xl font-semibold">DocuChat</h2>
            </div>
            
            <nav className="flex flex-wrap gap-x-8 gap-y-4 justify-center">
              <a href="#features" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-foreground/80 hover:text-foreground transition-colors">How it works</a>
              <Link to="/login" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Sign In</Link>
              <Link to="/register" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Sign Up</Link>
            </nav>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} DocuChat. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
