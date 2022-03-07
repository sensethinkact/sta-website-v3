import type {SerializedPost} from '@sta-podcast/types'
import ErrorPage from 'next/error'
import {useRouter} from 'next/router'
import EpisodePreview from '../../components/episode-preview'
import Layout from '../../components/layout'
import LogoNav from '../../components/logo-nav'
import {IS_DEBUG} from '../../lib/constants'
import getPostLoader from '../../lib/get-post-loader'
import podcastConfig from '../../podcast.config'

type Props = {
  posts: SerializedPost[]
  tag: string
  isDebug?: boolean
}

const PostsWithTag = ({posts, tag, isDebug = false}: Props) => {
  const router = useRouter()
  if (!router.isFallback && posts.length === 0) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout title={`${tag} tag | ${podcastConfig.name}`}>
      <div className="container">
        <LogoNav />
        <section className="section">
          <div className="columns is-centered">
            <div className="column is-8-tablet is-desktop-7 is-fullhd-6">
              <article>
                <h2 className="subtitle">
                  {posts.length === 1 ? '1 post' : `${posts.length} posts`} with
                  the{' '}
                  <b>
                    <i>{tag}</i>
                  </b>{' '}
                  tag
                </h2>
                <div className="content">
                  {posts.map((post) => (
                    <EpisodePreview
                      key={post.slug}
                      post={post}
                      isDebug={isDebug}
                      maxPreviewWords={100}
                    />
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default PostsWithTag

export async function getStaticPaths() {
  const postLoader = await getPostLoader()
  const tags = postLoader.getTags()
  return {
    paths: tags.map((tag) => ({
      params: {tag},
    })),
    fallback: false,
  }
}

type Params = {
  params: {
    tag: string
  }
}

export async function getStaticProps({
  params,
}: Params): Promise<{props: Props}> {
  const postLoader = await getPostLoader()
  const slugs = postLoader.getSlugsByTag(params.tag)
  const posts = slugs.map((slug) =>
    postLoader.getPostBySlug(slug),
  ) as SerializedPost[]
  return {
    props: {
      posts,
      tag: params.tag,
      isDebug: IS_DEBUG,
    },
  }
}
