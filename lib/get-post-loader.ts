import createPostLoader from '@sta-podcast/post-loader'
import podcastConfig from '../podcast.config'
import { join } from 'path'

import { isDebug, episodesUrl } from './constants'

export default async function getPostLoader() {
  const postsDirectory = join(process.cwd(), episodesUrl)
  const postLoader = await createPostLoader(
    postsDirectory,
    podcastConfig,
    {
      isDebug,
      isNewestPostFirst: true,
      isSerialized: true,
    }
  )
  return postLoader
}