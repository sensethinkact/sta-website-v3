import fs from 'fs'
import {join} from 'path'
import {INTERNAL_PUBLIC_URL} from '../lib/constants'
import getPostLoader from '../lib/get-post-loader'
import getRssFeed from '../lib/get-rss-feed'
import podcastConfig from '../podcast.config'

async function generateRss() {
  const postLoader = await getPostLoader()
  const rssFeed = getRssFeed(podcastConfig, postLoader)
  const writeFilePath = join(
    process.cwd(),
    INTERNAL_PUBLIC_URL,
    podcastConfig.itunes.feedFile,
  )
  fs.writeFileSync(writeFilePath, rssFeed)
}

generateRss()
