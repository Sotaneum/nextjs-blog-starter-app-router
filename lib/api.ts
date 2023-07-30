import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import PostType from '@/interfaces/post';

const postsDirectory = join(process.cwd(), '_posts');

function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): PostType {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title,
    date: data.date,
    coverImage: data.coverImage,
    author: data.author,
    excerpt: data.excerpt,
    ogImage: { url: data.ogImage.url },
    content,
  };
}

export function getAllPosts() {
  return (
    getPostSlugs()
      .map((slug) => getPostBySlug(slug))
      // sort posts by date in descending order
      .sort((a, b) => (a.date > b.date ? -1 : 1))
  );
}
