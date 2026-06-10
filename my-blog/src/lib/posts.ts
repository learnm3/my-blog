import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  readingTime: string;
}

const postsDirectory = join(process.cwd(), "src/content/posts");

export function getAllPosts(): PostMeta[] {
  try {
    const files = readdirSync(postsDirectory).filter((f) =>
      f.endsWith(".mdx")
    );

    const posts = files.map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = readFileSync(join(postsDirectory, file), "utf-8");
      const { data } = matter(raw);

      const wordCount = raw.split(/\s+/).length;
      const minutes = Math.max(1, Math.ceil(wordCount / 200));

      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        summary: data.summary || "",
        readingTime: `${minutes} 分钟阅读`,
      };
    });

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    return [];
  }
}

export function getPostBySlug(slug: string): PostMeta | null {
  try {
    const raw = readFileSync(join(postsDirectory, `${slug}.mdx`), "utf-8");
    const { data } = matter(raw);
    const wordCount = raw.split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      summary: data.summary || "",
      readingTime: `${minutes} 分钟阅读`,
    };
  } catch {
    return null;
  }
}
