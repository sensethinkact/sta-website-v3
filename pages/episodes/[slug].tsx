import { useRouter } from "next/router"
import ErrorPage from 'next/error'
import YouTube from "react-youtube"

import getPostLoader from "../../lib/get-post-loader"
import {toTimestampString} from "@sta-podcast/timestamp-tools"
import { listToString } from "../../lib/utils"
import podcastConfig from "../../podcast.config"

import Layout from "../../components/layout"
import Comments from "../../components/comments"
import TagsList from "../../components/tags-list"
import CopyableContentLink from "../../components/copyable-content-link"

import type { SerializedPost } from "@sta-podcast/types"
import LogoNav from "../../components/logo-nav"
import { isDebug } from "../../lib/constants"

type Props = {
  post: SerializedPost
  isDebug?: boolean
}

const Post = ({ post, isDebug }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout title={`${post.title} | ${podcastConfig.name}`}>
      <div className="container">
        <LogoNav/>

        <section className="section">
          <div className="columns is-centered">
            <div className="column is-8-tablet is-desktop-7 is-fullhd-6">
              <article>
                <h2>
                  <span className="title is-3">
                    {post.number && post.number?.toString() + ". "}
                    {post.title}
                  </span>
                  <span className="subtitle is-3">
                    {post.guests && `, with ${listToString(post.guests)}`}
                  </span>
                </h2>
                <div className="content is-small">
                  {post.publishDate}
                  <span>{' · '}</span>
                  {toTimestampString(post.duration)}
                </div>
                {isDebug && <CopyableContentLink slug={post.slug} />}
                <div className="content">
                  <TagsList tags={post.tags} />
                </div>
                <YouTube videoId={post.youtube.mainContentId} />
                <br/>
                <p className="content">
                  {post.description}
                </p>
                <br/>
                  <div className="content">
                    <h3 className="subtitle is-4">
                      Links
                    </h3>
                    <ul>
                      <li>
                        <a href={post.mp3.url} target="_blank" rel="noreferrer">
                          Download the episode
                        </a>
                      </li>
                      {
                        post.links && post.links.map(link => (
                          <li key={link.url}>
                            <a href={link.url} target="_blank" rel="noreferrer">
                              {link.name}
                            </a>
                          </li>
                        ))
                      }
                    </ul>
                    <h3 className="subtitle is-4">
                      Comments
                    </h3>

                    {/* <Comments pageUrl={post.url} /> */}

                    {
                      post.includes?.outline && (
                      <>
                        <h3 className="subtitle is-4">
                          Outline
                        </h3>
                        <ul>
                          {
                            post.includes?.outline.map(outline => (
                              <li key={outline.title}>
                                {toTimestampString(outline.timeStamp)}
                                {' - '}
                                {outline.title}
                              </li>
                            ))
                          }
                        </ul>
                      </>
                      )
                    }

                    {
                      post.includes?.transcript && (
                        <>
                          <h3 className="subtitle is-4">
                            Transcript
                          </h3>
                          <p className="content is-small">
                            <i>The transcript is for informational purposes and is not guaranteed to be correct.</i>
                          </p>
                          <div className="content">
                            {post.includes.transcript.map(dialog => {
                              const timestamp = toTimestampString(dialog.timeStamp)
                              return (
                                <div className="content" key={timestamp}>
                                  <h3 className="is-5">
                                    ({timestamp}) {' '}
                                    {dialog.speaker}
                                  </h3>
                                  <p>
                                    {dialog.text}
                                  </p>
                                </div>
                              )
                            })}
                          </div>
                        </>
                      )
                    }
                  </div>
              </article>
            </div>
          </div>
        </section>
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

export async function getStaticProps({ params }: Params): Promise<{ props: Props }> {
  const postLoader = await getPostLoader()
  return {
    props: {
      post: postLoader.getPostBySlug(params.slug) as SerializedPost,
      isDebug,
    }
  }
}