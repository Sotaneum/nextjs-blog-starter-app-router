import Head from 'next/head';

import {getAllPosts} from '@/lib/api';
import {CMS_NAME} from '@/lib/constants';

import Intro from '@/components/intro';
import HeroPost from '@/components/hero-post';
import MoreStories from '@/components/more-stories';

export default async function Page() {
  const allPosts = await getAllPosts();

  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Head>
        <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
      </Head>
      <div className="container mx-auto px-5">
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </div>
    </main>
  );
}
