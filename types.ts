export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  imageUrl: string;
  link: string;
}

export interface SkillData {
  subject: string;
  A: number;
  fullMark: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum Section {
  HERO = 'hero',
  ABOUT = 'about',
  SKILLS = 'skills',
  PROJECTS = 'projects',
  CONTACT = 'contact'
}