import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import getPostLoader from '../lib/get-post-loader'
import { truncateWords, listToString } from "../lib/utils"
import { toTimestampString } from "@sta-podcast/timestamp-tools"

import Layout from '../components/layout'

import type { SerializedPost } from '@sta-podcast/types'

import podcastConfig from '../podcast.config'

type Props = {
  posts: SerializedPost[]
}

const Home = ({ posts }: Props) => {
  const logoSizePx = 350
  const maxPreviewWords = 30
  return (
    <Layout>
      <Head>
        <title>{podcastConfig.name}</title>
        <meta name="description" content={podcastConfig.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container">
          <section className="section">
            <div className="columns is-desktop is-centered is-variable is-6">
              <div className="column is-narrow">
                <figure className="field has-text-centered has-text-right-desktop">
                  <Image className="logo" src='/img/cover.jpg' alt="STA logo" width={logoSizePx} height={logoSizePx} />
                </figure>
              </div>
              <div className="column is-7-desktop is-6-widescreen">
                <article className="block">
                  <h1 className="title is-1 uppercase">Sense Think Act</h1>
                  <h2 className="subtitle is-2">Robotics Podcast</h2>
                  <br />
                  <div className="content">
                    <p>
                      A long-form, technical podcast about all areas of robotics that is
                      hosted by {' '} <a href="https://audrow.github.io/" target="_blank" rel="noreferrer">Audrow Nash</a> {' '}
                      and sponsored by {' '}
                      <a href="https://www.openrobotics.org/" target="_blank" rel="noreferrer">
                        Open Robotics</a>.
                    </p>
                    <div id="more">
                      <p>
                        One way to think about a robot is as a machine that senses the world, thinks about what it sees, and then
                        acts in the world.
                        Our podcast seeks to explore the world of robotics - that is, machines that sense, think, and act - through
                        long-form interviews.
                        We’ll cover a diverse range of topics: from hardware to software, from design to ethics, and from government
                        to startups, and everything in between.
                        Also, we want to make this podcast accessible to anyone interested in robotics.
                        To do this, we’ll explain each new concept in the interview as it comes up, to help roboticists and non
                        roboticists alike to follow and enjoy our content.
                        We hope you enjoy exploring the world of machines that sense, think, and act with us!
                      </p>
                    </div>
                  </div>
                </article>
                <Link href="/tags">
                  <a>View all tags</a>
                </Link>
                <div className="block">
                  <h2 className="title is-4">Available on</h2>
                  <div className="columns is-mobile is-multiline is-variable is-2">
                    <div className="column is-narrow">
                      <a href="{{ site.sites.apple-podcasts }}" target="_blank">
                        <figure className="image is-48x48">
                          <Image src="/img/apple.svg" layout='fill' alt="Apple Podcast logo" />
                        </figure>
                      </a>
                    </div>
                    <div className="column is-narrow">
                      <a href="{{ site.sites.spotify }}" target="_blank">
                        <figure className="image is-48x48">
                          <Image src="/img/spotify.svg" layout='fill' alt="Spotify logo" />
                        </figure>
                      </a>
                    </div>
                    <div className="column is-narrow">
                      <a href="{{ site.sites.google-podcasts }}" target="_blank">
                        <figure className="image is-48x48">
                          <Image src="/img/google.svg" layout='fill' alt="Google Podcasts Logo" />
                        </figure>
                      </a>
                    </div>
                    <div className="column is-narrow">
                      <a href="{{ site.sites.overcast }}" target="_blank">
                        <figure className="image is-48x48">
                          <Image src="/img/overcast.svg" layout='fill' alt="Overcast Logo" />
                        </figure>
                      </a>
                    </div>
                    <div className="column is-narrow">
                      <a href="{{ site.sites.pocketcasts }}" target="_blank">
                        <figure className="image is-48x48">
                          <Image src="/img/pocketcasts.svg" layout='fill' alt="Pocketcasts Logo" />
                        </figure>
                      </a>
                    </div>
                    <div className="column is-narrow">
                      <a href="{{ site.sites.youtube }}" target="_blank">
                        <figure className="image is-48x48">
                          <Image src="/img/youtube.svg" layout='fill' alt="Youtube Logo" />
                        </figure>
                      </a>
                    </div>
                    <div className="column is-narrow">
                      <a href="/itunes.xml" target="_blank">
                        <figure className="image is-48x48">
                          <Image src="/img/rss.svg" layout='fill' alt="RSS Logo" />
                        </figure>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="block">
                  <h2 className="title is-4">Episodes</h2>

                  <div className="columns is-centered is-multiline">
                    {posts.map(post => (
                      <div key={post.slug} className='column is-12'>
                        <article>
                          <div className="media">
                            <div className="media-content">
                              <Link href="/episodes/[slug]" as={`/episodes/${post.slug}`}>
                                <a>
                                  <p className="is-5 is-marginless">
                                    <span className='subtitle is-4'>
                                      {post.number && post.number?.toString() + ". "}
                                    </span>
                                    <span className='title is-5'>
                                      {post.title}
                                    </span>
                                    <span className='subtitle is-5'>
                                      {post.guests && `, with ${listToString(post.guests)}`}
                                    </span>
                                  </p>
                                </a>
                              </Link>
                              <p className="content is-marginless">
                                {
                                  truncateWords(post.description, maxPreviewWords)
                                }
                              </p>
                              <div className="content is-small">
                                {post.publishDate}
                                <span>{' · '}</span>
                                {toTimestampString(post.duration)}
                              </div>
                              <div>
                                {post.tags.map(tag => (
                                  <Link key={tag} href="/tags/[tag]" as={`/tags/${tag}`}>
                                  <a className="button is-info is-outlined is-small">
                                    {tag}
                                  </a>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </article>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const postLoader = await getPostLoader()
  return {
    props: {
      posts: postLoader.getPosts()
    }
  }
}

export default Home
