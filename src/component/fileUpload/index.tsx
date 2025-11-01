"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Field } from "../types/form";
import { renderFormField } from "../customForm/renderField";

interface ChatMessage {
  sender: "user" | "bot";
  message: string;
  project?: string;
}

const formFields: Field[] = [
  {
    name: "project",
    type: "select",
    label: "Select Project",
    options: [
      { label: "Project Alpha", value: "alpha" },
      { label: "Project Beta", value: "beta" },
    ],
  },
  {
    name: "question",
    type: "text",
    label: "Ask your question",
    isSendIcon: true,
  },
];

const ProjectChat: React.FC = () => {
  const { handleSubmit, control, reset } = useForm();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const onSubmit = (data: any) => {
    if (!data.question) return;

    const userMessage: ChatMessage = {
      sender: "user",
      message: data.question,
      project: data.project,
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse: ChatMessage = {
        sender: "bot",
        message: `Response to "${data.question}" in project "${data.project}"`,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);

    reset({ question: "" });
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.project && msg.sender === "user" && (
              <div className="chat-project-tag">Project: {msg.project}</div>
            )}
            <div>{msg.message}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="chat-form">
        {formFields.map((field) => (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            defaultValue=""
            render={({ field: controllerField, fieldState }) =>
              renderFormField({
                field,
                controllerField,
                error: fieldState.error,
              })
            }
          />
        ))}
      </form>
    </div>
  );
};

export default ProjectChat;
