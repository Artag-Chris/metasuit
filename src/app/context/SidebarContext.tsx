import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define la interfaz para el estado del contexto
interface SidebarContextProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// Crea el contexto con valores predeterminados
const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

// Define el proveedor del contexto
export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useSidebar = (): SidebarContextProps => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
};
