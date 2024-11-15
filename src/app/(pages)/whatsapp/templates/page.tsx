"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SendMessagesTemplate } from '@/components';
import SelectTemplateMessages from '@/components/whatsapp/SelectTemplateMessages';
import { useThemeStore } from '@/store/ui/ThemeConfiguration';

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isExcelFileLoaded, setIsExcelFileLoaded] = useState(false);
  const [messages, setMessages] = useState<any[][]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const { themes, currentThemeId, checkAndUpdateVersion } = useThemeStore();
  const currentTheme = themes.find(theme => theme.id === currentThemeId) || themes[0];

  useEffect(() => {
    checkAndUpdateVersion();
  }, [checkAndUpdateVersion]);

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: currentTheme.background,
    color: currentTheme.text,
    fontFamily: currentTheme.fontFamily,
    fontSize: `${currentTheme.fontSize.medium}px`,
    display: 'flex',
    flexDirection: 'column',
  };

  const columnStyle: React.CSSProperties = {
    padding: `${currentTheme.spacing.large}px`,
    display: 'flex',
    flexDirection: 'column',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: currentTheme.background,
    borderRadius: `${currentTheme.borderRadius}px`,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: `${currentTheme.spacing.large}px`,
    marginBottom: `${currentTheme.spacing.large}px`,
  };

  const headingStyle: React.CSSProperties = {
    fontSize: `${currentTheme.fontSize.large}px`,
    fontWeight: 'bold',
    color: currentTheme.primary,
    marginBottom: `${currentTheme.spacing.medium}px`,
  };

  return (
    <div style={containerStyle}>
      <div style={columnStyle}>
        <div style={cardStyle}>
          <h2 style={headingStyle}>Envío de Plantilla</h2>
          <SelectTemplateMessages 
            setIsExcelFileLoaded={setIsExcelFileLoaded}
            setSelectedTemplate={setSelectedTemplate} 
            selectedTemplate={selectedTemplate} 
            setMessages={setMessages}
            messages={messages}
            imageUrl={imageUrl}
            documentUrl={documentUrl}
            videoUrl={videoUrl}
          />
        </div>
      </div>
      <AnimatePresence>
        {selectedTemplate ? (
          <motion.div
            key="template-preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={columnStyle}
          >
            <div style={cardStyle}>
              <h2 style={headingStyle}>Plantilla de Texto</h2>
              <SendMessagesTemplate 
                selectedTemplate={selectedTemplate} 
                isExcelFileLoaded={isExcelFileLoaded} 
                setImageUrl={setImageUrl} 
                messages={messages}  
                imageUrl={imageUrl}
                setDocumentUrl={setDocumentUrl} 
                documentUrl={documentUrl}
                setVideoUrl={setVideoUrl} 
                videoUrl={videoUrl}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="template-placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ ...cardStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <p style={{ color: currentTheme.text, fontSize: `${currentTheme.fontSize.large}px` }}>
              Selecciona una plantilla para previsualizar
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx>{`
        @media (min-width: 768px) {
          div[style] {
            flex-direction: row !important;
          }
          div[style] > div {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
}