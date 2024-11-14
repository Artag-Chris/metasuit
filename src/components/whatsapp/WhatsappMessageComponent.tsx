"use client"

import React, { useEffect, useState } from "react";
import { MessageCircle, RefreshCw } from "lucide-react";
import { User } from "@/lib/interfaces/userInterface";
import { numberParser } from "@/lib";
import { useWhatsappData } from "@/hooks/useWhatsappData";
import { useThemeStore } from '@/store/ui/ThemeConfiguration';

interface WhatsappMessagesComponentProps {
  onSelectUser: (user: User) => void;
}

const WhatsappMessagesComponent: React.FC<WhatsappMessagesComponentProps> = ({
  onSelectUser,
}) => {
  const { data: initialData, error, refreshData } = useWhatsappData();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const { themes, currentThemeId } = useThemeStore();
  const currentTheme = themes.find(theme => theme.id === currentThemeId) || themes[0];

  useEffect(() => {
    if (initialData) {
      setMessages(initialData);
    }
  }, [initialData]);

  const handleClick = (item: User) => {
    onSelectUser(item);
    setSelectedUserId(item.id || null);
  };

  if (error) {
    return <div style={{ color: currentTheme.text, padding: `${currentTheme.spacing.medium}px`, textAlign: 'center' }}>{error}</div>;
  }

  return (
    <div style={{
      backgroundColor: currentTheme.background,
      color: currentTheme.text,
      borderRadius: `${currentTheme.borderRadius}px`,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      maxWidth: '28rem',
      margin: '0 auto',
      fontFamily: currentTheme.fontFamily,
    }}>
      <div style={{
        padding: `${currentTheme.spacing.medium}px`,
        background: `linear-gradient(to right, ${currentTheme.primary}, ${currentTheme.secondary})`,
      }}>
        <h1 style={{
          fontSize: `${currentTheme.fontSize.large}px`,
          fontWeight: 'bold',
          color: currentTheme.background,
          marginBottom: `${currentTheme.spacing.small}px`,
          textAlign: 'center',
        }}>Clientes en Espera</h1>
        <button
          onClick={refreshData}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: `${currentTheme.spacing.small}px`,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: currentTheme.background,
            borderRadius: `${currentTheme.borderRadius}px`,
            transition: 'background-color 0.3s ease-in-out',
            cursor: 'pointer',
            border: 'none',
            fontSize: `${currentTheme.fontSize.medium}px`,
          }}
        >
          <RefreshCw style={{ width: '20px', height: '20px', marginRight: '8px' }} />
          Actualizar Datos
        </button>
      </div>
      <div style={{
        padding: `${currentTheme.spacing.medium}px`,
        maxHeight: 'calc(100vh - 200px)',
        overflowY: 'auto',
      }}>
        {messages.map((item: any) => {
          if (item !== null && item.id !== null && item.id !== undefined && item.WhatsappMessage && item.WhatsappMessage.length > 0 && item.WhatsappMessage[0].status === 'unread') {
            return (
              <div
                key={item.id}
                style={{
                  marginBottom: `${currentTheme.spacing.medium}px`,
                  padding: `${currentTheme.spacing.medium}px`,
                  backgroundColor: selectedUserId === item.id ? currentTheme.secondary : currentTheme.background,
                  borderRadius: `${currentTheme.borderRadius}px`,
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease-in-out',
                  border: selectedUserId === item.id ? `2px solid ${currentTheme.primary}` : 'none',
                }}
                onClick={() => handleClick(item)}
              >
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: `${currentTheme.spacing.small}px`,
                }}>
                  <div>
                    <p style={{
                      fontWeight: 'bold',
                      fontSize: `${currentTheme.fontSize.large}px`,
                    }}>{item.name}</p>
                    <p style={{
                      color: currentTheme.text,
                      opacity: 0.6,
                      fontSize: `${currentTheme.fontSize.small}px`,
                    }}>{numberParser(item.phone)}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://wa.me/${item.phone}`, "_blank");
                    }}
                    style={{
                      padding: `${currentTheme.spacing.small}px`,
                      backgroundColor: currentTheme.primary,
                      color: currentTheme.background,
                      borderRadius: '9999px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease-in-out',
                    }}
                    aria-label={`Abrir chat de WhatsApp con ${item.name}`}
                  >
                    <MessageCircle style={{ width: '20px', height: '20px' }} />
                  </button>
                </div>
                <p style={{
                  color: currentTheme.text,
                  backgroundColor: currentTheme.background,
                  padding: `${currentTheme.spacing.small}px`,
                  borderRadius: `${currentTheme.borderRadius}px`,
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  fontSize: `${currentTheme.fontSize.medium}px`,
                }}>
                  "{item.WhatsappMessage[0].message}"
                </p>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default WhatsappMessagesComponent;