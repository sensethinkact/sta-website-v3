import { useRouter } from "next/router"
import ErrorPage from 'next/error'
import Head from "next/head"
import Link from 'next/link'
import Image from "next/image"

import getPostLoader from "../../lib/get-post-loader"
import type { SerializedPost } from "@sta-podcast/types"

import Layout from "../../components/layout"
import podcastConfig from "../../podcast.config"
import PostPreview from "../../components/post-preview"

type Props = {
  posts: SerializedPost[]
  tag: string
}

const PostsWithTag = ({ posts, tag }: Props) => {
  const router = useRouter()
  if (!router.isFallback && posts.length === 0) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>

      <Head>
        <title>{`${tag} tag | ${podcastConfig.name}`}</title>
      </Head>

      <div className="container">
        <nav aria-label="main navigation">
          <div className="navbar-brand">
            <Link href="/">
              <a>
                <Image
                  className="navbar-logo"
                  src="/img/logo-with-name.png"
                  width={1900 / 5} height={400 / 5}
                  alt="STA Logo"
                />
              </a>
            </Link>
          </div>
        </nav>

        <section className="section">
          <div className="columns is-centered">
            <div className="column is-8-tablet is-desktop-7 is-fullhd-6">
              <article>
                <h2 className="subtitle">
                  {
                    posts.length === 1 ? "1 post" : `${posts.length} posts`
                  }
                  {' '} with the <b><i>{tag}</i></b> tag
                </h2>
                <div className="content">
                  {posts.map((post) => (
                    <PostPreview post={post} maxPreviewWords={100} key={post.slug} />
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
      params: { tag },
    })),
    fallback: false,
  }
}

type Params = {
  params: {
    tag: string
  }
}

export async function getStaticProps({ params }: Params) {
  const postLoader = await getPostLoader()
  const slugs = postLoader.getSlugsByTag(params.tag)
  const posts = slugs.map(slug => postLoader.getPostBySlug(slug)) as SerializedPost[]
  return {
    props: {
      posts,
      tag: params.tag,
    }
  }
}