"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Field } from "../types/form";
import { renderFormField } from "../customForm/renderField";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ProjectOption, ProjectType } from "../types/project";
import ChatHistoryDrawer from "./chat";

interface ChatMessage {
  role: "user" | "bot";
  content: string;
  project?: string;
}

const ProjectChat: React.FC = () => {
  const { handleSubmit, watch, control, reset ,getValues} = useForm();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const projectState = useSelector((state: RootState) => state.project);
  
  useEffect(() => {
    setLoading(true);
    fetch(`/api/chat?projectId=${watch("project")}`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.messages || []);
      })
      .catch(() => setMessages([]))
      .finally(() => setLoading(false));
  }, [watch("project")]);

  useEffect(() => {
    const projects = projectState?.projects || [];
    const updatedProjects = projects
      .filter((project) => project._id != null)
      .map((project: ProjectType) => ({
        label: project.name,
        value: project._id!,
      }));
    setProjects(updatedProjects);
  }, [projectState?.projects]);

  const onSubmit = async (data: any) => {
    if (!data.question || !data.project) return;

    const newMessage: ChatMessage = {
      role: "user",
      content: data.question,
      project: data.project,
    };

    setMessages((prev) => [...prev, newMessage]);
    let currentValue=getValues()
    reset({...currentValue, question: "" });
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: data.project,
          question: data.question,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: result.answer || "No response found." },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: result.error || "Something went wrong." },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Server error. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const formFields: Field[] = [
    {
      name: "project",
      type: "select",
      label: "Select Project",
      options: projects || [],
    },
    {
      name: "question",
      type: "text",
      label: "Ask your question",
      isSendIcon: true,
    },
  ];

  const changeProject = (projectId: string) => {
    reset({ project: projectId });
  }
  return (
    <div className="chat-container relative flex flex-col h-full">
      {/* Chat Box */}
      <div className="chat-box flex-grow overflow-auto p-4 border rounded mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.role === "user" ? "user" : "bot"}`}
          >
            {msg.project && msg.role === "user" && (
              <div className="chat-project-tag">Project: {msg.project}</div>
            )}
            <div>{msg.content}</div>
          </div>
        ))}
      </div>

      {/* Button on right side to open drawer */}
      {/* <button
        onClick={toggleDrawer}
        className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded shadow hover:bg-blue-700 z-10"
      >
        Chat History
      </button> */}

      {/* Chat Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="chat-form flex gap-2">
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
      {/* <ChatHistoryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        projectId={watch("project")}
        changeProject={changeProject}
        projectOption={projects}
      /> */}
    </div>
  );
};

export default ProjectChat;
