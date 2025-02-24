import { create } from 'zustand';

export const useProjectStore = create((set) => ({
    projects: [],
    setProject: (projects) => set({ projects }),
    createProject: async (newProject) => {
        if(!newProject.name || !newProject.description || !newProject.skills) {
            return { success: false, message: "Please fills in all fields" }
        }
        const res = await fetch("api/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProject)
        });

        const data = await res.json();
        set((state) => ({ projects: [...state.projects, data.data] }));
        return { success: true, message: "Project Created Successfully!" };
    },
    fetchProjects: async () => {
        const res = await fetch("/api/projects");
        const data = await res.json();
        set({ projects: data.data });
    }
}));