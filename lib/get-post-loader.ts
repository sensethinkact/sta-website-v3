import createPostLoader from '@sta-podcast/post-loader'
import podcastConfig from '../podcast.config'
import { join } from 'path'

export default async function getPostLoader() {
  const postsDirectory = join(process.cwd(), 'posts')
  const postLoader = await createPostLoader(
    postsDirectory,
    podcastConfig,
    {
      isDebug: process.env.DEBUG === 'true',
      isNewestPostFirst: true,
      isSerialized: true,
    }
  )
  return postLoader
}