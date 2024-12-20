"use client";
import { User } from "@/lib/";
import { useWhatsappData } from "@/hooks/useWhatsappData";
import React, { Suspense, useState } from "react";
import ChatWhatsappComponent from "@/components/whatsapp/ChatWhatsappComponent";

const WhatsappMessagesComponent = React.lazy(
  () => import("@/components/whatsapp/WhatsappMessageComponent")
);

function Chat() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data, loading, error } = useWhatsappData();

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-purple-100 to-pink-100">
      <div className="w-full md:w-4/12 lg:w-3/12 p-4 bg-white shadow-lg rounded-lg md:rounded-r-none">
        <h1 className={`text-2xl font-bold text-purple-600 mb-4 `}>WhatsApp</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <WhatsappMessagesComponent onSelectUser={handleSelectUser} />
        </Suspense>
      </div>
      <div
        className={`w-full md:w-8/12 lg:w-9/12 p-4 bg-white shadow-lg rounded-lg md:rounded-l-none `}
      >
        <h1 className="text-2xl font-bold text-purple-600 mb-4">Chat</h1>

        {selectedUser ? (
          <Suspense fallback={<div>Loading...</div>}>
            <ChatWhatsappComponent user={selectedUser} />
          </Suspense>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">
              Selecciona un usuario para iniciar el chat
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
