import React from 'react';
import Head from 'next/head';

import {getPostBySlug} from '@/lib/api';
import {CMS_NAME} from '@/lib/constants';
import markdownToHtml from '@/lib/markdownToHtml';

import PostHeader from '@/components/post-header';
import markdownStyles from '@/components/markdown-styles.module.css';

export default async function Post({ params }) {
  const post = getPostBySlug(params.slug);
  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;
  const content = await markdownToHtml(post.content || '');

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
