
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  FileText, 
  FileImage, 
  FileSpreadsheet, 
  FileCode, 
  File, 
  Search, 
  MoreVertical, 
  Download, 
  Trash, 
  Share 
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  createdAt: string;
}

interface DocumentListProps {
  documents: Document[];
}

const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'pdf':
      return <FileText className="h-6 w-6 text-red-500" />;
    case 'docx':
    case 'doc':
      return <FileText className="h-6 w-6 text-blue-600" />;
    case 'xlsx':
    case 'xls':
      return <FileSpreadsheet className="h-6 w-6 text-green-600" />;
    case 'png':
    case 'jpg':
    case 'jpeg':
      return <FileImage className="h-6 w-6 text-purple-500" />;
    case 'json':
    case 'html':
    case 'css':
    case 'js':
      return <FileCode className="h-6 w-6 text-yellow-500" />;
    default:
      return <File className="h-6 w-6 text-gray-500" />;
  }
};

export const DocumentList = ({ documents }: DocumentListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      }
    })
  };

  return (
    <Card className="border border-border/40 shadow-sm">
      <CardContent className="p-0">
        <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Badge variant="outline" className="whitespace-nowrap">
            {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''}
          </Badge>
        </div>
        
        <Separator />
        
        <div className="overflow-auto elegant-scrollbar h-[calc(100vh-300px)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Name</TableHead>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead className="w-[100px]">Size</TableHead>
                <TableHead className="w-[140px]">Uploaded on</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                    No documents found
                  </TableCell>
                </TableRow>
              ) : (
                filteredDocuments.map((doc, index) => (
                  <motion.tr
                    key={doc.id}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="group"
                  >
                    <TableCell className="font-medium py-4">
                      <div className="flex items-center space-x-3">
                        {getFileIcon(doc.type)}
                        <span className="truncate max-w-[200px] sm:max-w-[300px]">{doc.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="uppercase">
                        {doc.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell>{formatDate(doc.createdAt)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" /> Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share className="h-4 w-4 mr-2" /> Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
