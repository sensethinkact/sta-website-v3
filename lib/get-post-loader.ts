import createPostLoader from '@sta-podcast/post-loader'
import podcastConfig from '../podcast.config'
import { join } from 'path'

import { IS_DEBUG, EPISODES_URL } from './constants'

export default async function getPostLoader() {
  const postsDirectory = join(process.cwd(), EPISODES_URL)
  const postLoader = await createPostLoader(
    postsDirectory,
    podcastConfig,
    {
      isDebug: IS_DEBUG,
      isNewestPostFirst: true,
      isSerialized: true,
    }
  )
  return postLoader
}