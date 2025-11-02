"use client";

import React, { use, useEffect, useState } from "react";
import { renderFormField } from "../customForm/renderField";

interface ChatMessage {
  role: "user" | "bot";
  content: string;
  timestamp?: string;
}

interface ChatHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

const ChatHistoryDrawer: React.FC<ChatHistoryDrawerProps> = ({
  projectId,
  changeProject,
  isOpen,
  projectOption,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !projectId) return;
    setLoading(true);
    fetch(`/api/chat?projectId=${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.messages || []);
      })
      .catch(() => setMessages([]))
      .finally(() => setLoading(false));
  }, [projectId, isOpen, projectId]);

  if (!isOpen) return null;

  const field = {
    type: "select",
    name: "project",
    label: "Project",
    options: projectOption
  }

  const handleProject = (value) => {
    changeProject(value)
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0  bg-opacity-50 z-40"
      ></div>

      {/* Right Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-[360px] bg-white shadow-lg p-4 z-50 overflow-y-auto transition-transform duration-300">
        <button
          onClick={onClose}
          className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Close
        </button>

        <h2 className="text-xl font-semibold mb-4">Chat</h2>
        {renderFormField({
          field, controllerField: { value: projectId, onChange: handleProject }

        })}
        {loading && <div>Loading...</div>}
        {!projectId && <div> Please Select Project </div>}
        {!loading && messages.length === 0 && projectId && (
          <div>No chat history available.</div>
        )}

        <div className="space-y-2">
          {messages.map((msg, idx) => (
            msg?.role === "user" && <div
              key={idx}
              className="text-[14px] text-purple-900 rounded"
            >
              <div>{msg.content}</div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatHistoryDrawer;
