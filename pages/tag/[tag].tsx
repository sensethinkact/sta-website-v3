import { useRouter } from "next/router"
import ErrorPage from 'next/error'
import Head from "next/head"
import Link from 'next/link'

import getPostLoader from "../../lib/get-post-loader"
import type { SerializedPost } from "@sta-podcast/types"

import Layout from "../../components/layout"

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
        <title>{`Posts with the ${tag} tag`}</title>
      </Head>
      <div className="container">
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/tags">
              <a>All tags</a>
            </Link>
          </li>
        </ul>
        <h1 className='title'>{`Posts with the ${tag} tag`}</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href="/episodes/[slug]" as={`/episodes/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
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