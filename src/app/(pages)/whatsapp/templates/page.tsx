"use client";

import { useState, useEffect } from 'react';
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
  };

  const columnStyle: React.CSSProperties = {
    flex: 1,
    padding: `${currentTheme.spacing.large}px`,
    display: 'flex',
    flexDirection: 'column',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: currentTheme.background,
    borderRadius: `${currentTheme.borderRadius}px`,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: `${currentTheme.spacing.large}px`,
    flex: 1,
  };

  const headingStyle: React.CSSProperties = {
    fontSize: `${currentTheme.fontSize.large}px`,
    fontWeight: 'bold',
    color: currentTheme.primary,
    marginBottom: `${currentTheme.spacing.medium}px`,
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: currentTheme.primary,
    color: currentTheme.background,
    padding: `${currentTheme.spacing.small}px ${currentTheme.spacing.medium}px`,
    borderRadius: `${currentTheme.borderRadius}px`,
    border: 'none',
    cursor: 'pointer',
    fontSize: `${currentTheme.fontSize.medium}px`,
    fontWeight: 'bold',
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
      <div style={columnStyle}>
        {selectedTemplate ? (
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
        ) : (
          <div style={{ ...cardStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: currentTheme.text, fontSize: `${currentTheme.fontSize.large}px` }}>
              Selecciona una plantilla para previsualizar
            </p>
          </div>
        )}
      </div>
    </div>
  );
}