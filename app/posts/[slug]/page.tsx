import { getPostBySlug } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import markdownStyles from '@/components/markdown-styles.module.css';
import Head from 'next/head';
import PostHeader from '@/components/post-header';
import React from 'react';
import { CMS_NAME } from '@/lib/constants';

export default async function Post({ params }) {
  const post = getPostBySlug(params.slug);
  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;
  const content = await markdownToHtml(post.content || '');
  console.log(post.author);
  return (
    <article className="mb-32">
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={post.ogImage.url} />
      </Head>
      <PostHeader
        title={post.title}
        coverImage={post.coverImage}
        date={post.date}
        author={post.author}
      />
      <div className="max-w-2xl mx-auto">
        <div
          className={markdownStyles['markdown']}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </article>
  );
}
