
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { motion } from 'framer-motion';
import { DocumentList } from '@/components/Dashboard/DocumentList';
import { DocumentUploader } from '@/components/Dashboard/DocumentUploader';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ChatInterface } from '@/components/ChatInterface';
import { PlusIcon, MessageSquare, FileText, LayoutDashboard, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [showUploader, setShowUploader] = useState(false);
  const [activeTab, setActiveTab] = useState('documents');

  // Mock documents that would come from a real backend
  const [documents, setDocuments] = useState([
    { id: '1', name: 'Project Proposal.pdf', type: 'pdf', size: '1.2 MB', createdAt: new Date().toISOString() },
    { id: '2', name: 'Meeting Notes.docx', type: 'docx', size: '0.8 MB', createdAt: new Date().toISOString() },
    { id: '3', name: 'Financial Report.xlsx', type: 'xlsx', size: '2.5 MB', createdAt: new Date().toISOString() },
  ]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleUploadComplete = (newDoc: { id: string; name: string; type: string; size: string; createdAt: string }) => {
    setDocuments([newDoc, ...documents]);
    setShowUploader(false);
  };

  return (
    <div className="flex h-screen bg-muted/20 overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-20 md:w-64 bg-card h-full flex flex-col border-r shadow-sm"
      >
        <div className="p-6 pb-2 flex items-center justify-center md:justify-start space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold hidden md:block">DocuChat</h1>
        </div>
        
        <nav className="flex-1 px-2 py-6 space-y-2">
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === 'documents' ? 'bg-muted' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            <LayoutDashboard className="h-5 w-5 mr-2 md:mr-3" />
            <span className="hidden md:inline">Documents</span>
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === 'chat' ? 'bg-muted' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare className="h-5 w-5 mr-2 md:mr-3" />
            <span className="hidden md:inline">Chat</span>
          </Button>
        </nav>
        
        <div className="p-6 mt-auto">
          <Button variant="ghost" className="w-full justify-start" onClick={logout}>
            <LogOut className="h-5 w-5 mr-2 md:mr-3" />
            <span className="hidden md:inline">Logout</span>
          </Button>
          
          <Separator className="my-4" />
          
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="p-6 flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="chat">AI Chat Assistant</TabsTrigger>
            </TabsList>
            
            {activeTab === 'documents' && (
              <Button onClick={() => setShowUploader(true)}>
                <PlusIcon className="h-4 w-4 mr-2" /> Upload Document
              </Button>
            )}
          </div>

          <TabsContent value="documents" className="h-[calc(100%-80px)] p-6 pt-0">
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="h-full"
            >
              {showUploader ? (
                <motion.div variants={item}>
                  <DocumentUploader onComplete={handleUploadComplete} onCancel={() => setShowUploader(false)} />
                </motion.div>
              ) : (
                <motion.div variants={item} className="h-full">
                  <DocumentList documents={documents} />
                </motion.div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="chat" className="h-[calc(100%-80px)]">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <ChatInterface />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
