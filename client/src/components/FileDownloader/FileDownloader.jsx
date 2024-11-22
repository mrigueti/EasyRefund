import React, { useState } from 'react';
import { FileDown } from 'lucide-react'
import { Modal, Button } from "react-bootstrap";

const FileDownloader = ({ fileUrl, fileName }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(fileUrl);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      // You can add a user notification here
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button 
      onClick={handleDownload} 
      disabled={isDownloading}
      aria-label={`Baixar ${fileName}`}
    >
      <FileDown className="mr-2 h-4 w-4" />
      {isDownloading ? 'Baixando...' : 'Baixar Arquivo'}
    </Button>
  );
};

export default FileDownloader;

