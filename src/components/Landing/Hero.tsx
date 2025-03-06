
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
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
  );
};

export default Hero;
