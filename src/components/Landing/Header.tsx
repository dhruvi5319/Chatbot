
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileText, Menu, X } from 'lucide-react';
import { useAuth } from '@/lib/auth';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
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
    </>
  );
};

export default Header;
