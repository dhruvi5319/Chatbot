
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Footer = () => {
  return (
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
  );
};

export default Footer;
