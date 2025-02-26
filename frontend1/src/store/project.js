import { create } from "zustand";

export const useProjectStore = create((set) => ({
	projects: [],
	setProjects: (projects) => set({ projects }),
	createProject: async (newProject) => {
		if (!newProject.name || !newProject.description || !newProject.skills) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("http://localhost:5000/api/projects", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProject),
		});
		const data = await res.json();
		set((state) => ({ projects: [...state.projects, data.data] }));
		return { success: true, message: "Project created successfully" };
	},
	fetchProjects: async () => {
		const res = await fetch("http://localhost:5000/api/projects");
		const data = await res.json();
		set({ projects: data.data });
	},
	deleteProject: async (pid) => {
		const res = await fetch(`http://localhost:5000/api/projects/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ projects: state.projects.filter((project) => project._id !== pid) }));
		return { success: true, message: data.message };
	},
	updateProject: async (pid, updatedProject) => {
		const res = await fetch(`http://localhost:5000/api/projects/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProject),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			projects: state.projects.map((project) => (project._id === pid ? data.data : project)),
		}));

		return { success: true, message: data.message };
	},
}));
