import { useRouter } from "next/router"
import ErrorPage from 'next/error'
import Head from "next/head"

import getPostLoader from "../../lib/get-post-loader"
import type { SerializedPost } from "@sta-podcast/types"

import Layout from "../../components/layout"
import podcastConfig from "../../podcast.config"

type Props = {
  post: SerializedPost
}

const Post = ({ post }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Head>
        <title>{post.title} | {podcastConfig.name}</title>
      </Head>
      <div className="container">
        <h1 className="title">{post.title}</h1>
        <p>{post.description}</p>
      </div>
    </Layout>
  )
}

export default Post

export async function getStaticPaths() {
  const postLoader = await getPostLoader()
  const slugs = postLoader.getSlugs()
  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  }
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const postLoader = await getPostLoader()
  return {
    props: {
      post: postLoader.getPostBySlug(params.slug),
    }
  }
}