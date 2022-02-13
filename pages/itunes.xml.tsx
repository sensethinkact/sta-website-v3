import { GetServerSideProps } from 'next'
import React from 'react'
import getPostLoader from '../lib/get-post-loader'
import getRssFeed from '../lib/get-rss-feed'
import podcastConfig from '../podcast.config'

const RssFeed: React.FC = () => null

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (res) {
    const postLoader = await getPostLoader()
    const rssFeed = getRssFeed(podcastConfig, postLoader)

    res.setHeader('Content-Type', 'text/text')
    res.write(rssFeed)
    res.end()
  }
  return {
    props: {},
  }
}

export default RssFeed