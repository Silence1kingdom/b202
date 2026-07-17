import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/queries";

const SITE = "https://b202.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/work`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
