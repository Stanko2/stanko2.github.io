export interface Project {
  name: string;
  description: string;
  text?: string;
  titleImage: string;
  images?: string[];
  downloadLinks: DownloadOption[];
}

export interface DownloadOption {
  platform: "web" | "linux" | "windows" | "android" | "github";
  url: string;
  text?: string;
}

export interface Technology {
  icon: string;
  name: string;
}

export async function FetchProjects(): Promise<Project[]> {
  const data = await fetch("/data/projects.json");
  return (await data.json()) as Project[];
}

export async function FetchTechnologies(): Promise<Technology[]> {
  const data = await fetch("/data/technologies.json");
  return (await data.json()) as Technology[];
}
