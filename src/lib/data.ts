export type Project = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  desc: string;
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
  desc: string;
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
  desc: string;
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
  desc: string;
};

export type Member = {
  id?: string;
  name: string;
  role: string;
  avatar: string;
};
