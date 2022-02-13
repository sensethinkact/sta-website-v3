import getPostLoader from '../lib/get-post-loader'
import getRssFeed from '../lib/get-rss-feed'
import podcastConfig from '../podcast.config'
import {internalPublicUrl} from '../lib/constants'
import fs from 'fs'
import {join} from 'path'

async function generateRss() {
  const postLoader = await getPostLoader()
  const rssFeed = getRssFeed(podcastConfig, postLoader)
  const writeFilePath = join(process.cwd(), internalPublicUrl, podcastConfig.itunes.feedFile)
  fs.writeFileSync(writeFilePath, rssFeed)
}

generateRss()