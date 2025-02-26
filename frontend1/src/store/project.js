import { create } from "zustand";

export const useProjectStore = create((set) => ({
	projects: [],
	setProjects: (projects) => set({ projects }),
	createProject: async (newProject) => {
		if (!newProject.name || !newProject.description || !newProject.skills) {
			return { success: false, message: "Please fill in all fields." };
		}
		try {
			const res = await fetch("/api/projects", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newProject),
			});
	
			if (!res.ok) throw new Error("Failed to create project");
			
			const data = await res.json();
			set((state) => ({ projects: [...state.projects, data.data] }));
			return { success: true, message: "Project created successfully" };
		} catch (error) {
			console.error("Error creating project:", error);
			return { success: false, message: "Server error. Try again later." };
		}
	},
	fetchProjects: async () => {
		try {
			const res = await fetch("/api/projects");

			if (!res.ok) throw new Error("Failed to fetch projects");
			
			const data = await res.json();
			set({ projects: data.data });
		} catch (error) {
			console.error("Error fetching projects:", error);
		}
	},
	deleteProject: async (pid) => {
		try {
			const res = await fetch(`/api/projects/${pid}`, {
				method: "DELETE",
			});
	
			if (!res.ok) throw new Error("Failed to delete project");
			
			const data = await res.json();
			if (!data.success) return { success: false, message: data.message };

			// update the ui immediately, without needing a refresh
			set((state) => ({ projects: state.projects.filter((project) => project._id !== pid) }));
			return { success: true, message: data.message };
		} catch (error) {
			console.error("Error deleting project:", error);
			return { success: false, message: "Server error. Try again later." };
		}
	},
	updateProject: async (pid, updatedProject) => {
		try {
			const res = await fetch(`/api/projects/${pid}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedProject),
			});
	
			if (!res.ok) throw new Error("Failed to update project");
			
			const data = await res.json();
			if (!data.success) return { success: false, message: data.message };
	
			// update the ui immediately, without needing a refresh
			set((state) => ({
				projects: state.projects.map((project) => (project._id === pid ? data.data : project)),
			}));
			return { success: true, message: data.message };
		} catch (error) {
			console.error("Error updating project:", error);
			return { success: false, message: "Server error. Try again later." };
		}
	},
}));
