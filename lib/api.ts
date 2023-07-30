import fs from 'fs';
import {join} from 'path';
import matter from 'gray-matter';

import PostType from '@/interfaces/post';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).map((slug)=>slug.replace(/\.md$/, ''));
}

export async function getPostBySlug(realSlug: string): Promise<PostType> {
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
    Promise.all(getPostSlugs()
      .map((slug) => getPostBySlug(slug)))
      // sort posts by date in descending order
      .then((posts)=>posts
        .sort((a, b) => (a.date > b.date ? -1 : 1)))
  );
}
