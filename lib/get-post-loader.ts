import createPostLoader from '@sta-podcast/post-loader'
import {join} from 'path'
import podcastConfig from '../podcast.config'
import {EPISODES_URL, IS_DEBUG} from './constants'

export default async function getPostLoader() {
  const postsDirectory = join(process.cwd(), EPISODES_URL)
  const postLoader = await createPostLoader(postsDirectory, podcastConfig, {
    isDebug: IS_DEBUG,
    isNewestPostFirst: true,
    isSerialized: true,
  })
  return postLoader
}
