// src/constants/routes.ts
export const ROUTES = {
  ASSISTANT:"/pages/assistant",
  PROJECTS: {
    LIST: "/pages/projects",
    ADD: "/pages/projects/add",
    EDIT: (id: string) => `/pages/projects/edit/${id}`, // dynamic route
  },
  PROFILE: "/pages/profile",
  AUTH: {
    LOGIN: "/pages/login",
    SIGNUP: "/pages/signup",
  },
};
