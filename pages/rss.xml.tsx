import { GetServerSideProps } from 'next'
import React from 'react'
import createPostLoader from '@sta-podcast/post-loader'
import podcastConfig from '../podcast.config'
import { join } from 'path'

const RssFeed: React.FC = () => null

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (res) {
    const postsDirectory = join(process.cwd(), 'posts')
    const postLoader = await createPostLoader(
      postsDirectory,
      podcastConfig,
    )
    const allPosts = postLoader.getPosts()

    res.setHeader('Content-Type', 'text/text')
    res.write(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPosts.map(p => p.slug).join('; ')}
  ${allPosts.map(p => p.publishDate).join('; ')}
  ${postLoader.getTags().join('; ')}
</urlset>`)
    res.end()
  }
  return {
    props: {},
  }
}

export default RssFeed