"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Field } from "../types/form";
import { renderFormField } from "../customForm/renderField";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { ProjectOption, ProjectType } from "../types/project";
import { getAnswerAction, getChatHistoryAction } from "@/redux/action/assistant.action";
import Loading from "../customComponents/loading";
import ReactMarkdown from "react-markdown";
interface ChatMessage {
  role: "user" | "bot";
  content: string;
  project?: string;
}

const ProjectChat: React.FC = () => {
  const assistantState = useSelector((state: RootState) => state.assistant);
  const { handleSubmit, watch, control, reset, getValues } = useForm();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const projectState = useSelector((state: RootState) => state.project);
  const dispatch = useDispatch<AppDispatch>();
  const getChatHistory = async () => {
    let response = await dispatch(getChatHistoryAction({ projectId: watch("project") }));
    let { success, data } = response.payload || {};

    if (success) {
      setMessages(data || []);
    } else {
      setMessages([]);
    }
  }

  useEffect(() => {
    if (!watch("project")) return
    getChatHistory();
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
    let currentValue = getValues()
    reset({ ...currentValue, question: "" });
    let payload = {
      projectId: data.project,
      question: data.question,
    }
    try {
      const res = await dispatch(getAnswerAction(payload));
      const { data: result, success } = await res?.payload;
      if (success) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: result?.answer || "No response found." },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: result?.message || "Something went wrong." },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Server error. Please try again later." },
      ]);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };
  const isLoading = () => {
    return assistantState?.loading || projectState?.loading
  }
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
      disabled: !watch("project") && isLoading(),
      isSendIcon: true,
    },
  ];



  return (
    <div className="chat-container relative flex flex-col h-full">
      {isLoading() && <Loading />}
      <div className="chat-box flex-grow overflow-auto p-4 border rounded mb-4">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg?.role === "user" ? "user" : "bot"}`}
          >
            {msg?.project && msg?.role === "user" && (
              <div className="chat-project-tag">Project: {msg?.project}</div>
            )}
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => <p style={{ margin: '0 0 8px 0' }} {...props} />,
                strong: ({ node, ...props }) => <strong style={{ fontWeight: 'bold' }} {...props} />,
                li: ({ node, ...props }) => <li style={{ marginBottom: '4px' }} {...props} />,
              }}
            >
              {msg?.content}
            </ReactMarkdown>
            ` `
          </div>
        ))}
      </div>

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

    </div>
  );
};

export default ProjectChat;
