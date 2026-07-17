export type Project = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  tags: string[];
  year: string;
  tone: string;
  live_url?: string;
  featured?: boolean;
};

export type Service = {
  id?: string;
  icon: string;
  title: string;
  description: string;
};

export type Testimonial = {
  id?: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
  rating?: number;
};

export type ProcessStep = {
  id?: string;
  step: string;
  icon: string;
  title: string;
  description: string;
};

export type Stat = {
  id?: string;
  value: number;
  suffix: string;
  label: string;
};

export type Value = {
  id?: string;
  icon: string;
  title: string;
  description: string;
};

export type Member = {
  id?: string;
  name: string;
  role: string;
  bio?: string;
  skills?: string[];
  avatar: string;
  tone?: string;
  links?: { label: string; href: string; icon: "whatsapp" | "email" | "twitter" | "linkedin" | "github" | "globe" }[];
};
