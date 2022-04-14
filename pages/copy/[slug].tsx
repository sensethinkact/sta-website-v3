import type {SerializedPost} from '@sta-podcast/types'
import endent from 'endent'
import ErrorPage from 'next/error'
import {useRouter} from 'next/router'
import {ChangeEventHandler, useState} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import Layout from '../../components/layout'
import {MAX_TITLE_LENGTH} from '../../lib/constants'
import {checkYoutubeTitle, getTitle} from '../../lib/content-maker/common'
import getGluetext from '../../lib/content-maker/gluetext'
import getIrishTechNewsPost from '../../lib/content-maker/irish-tech-news'
import getRobohubPost from '../../lib/content-maker/robohub'
import {getLinkedIn, getTweet} from '../../lib/content-maker/social-media'
import {
  getYoutubeClipDescription,
  getYoutubeClipTitles,
  getYoutubeInterviewDescription,
} from '../../lib/content-maker/youtube'
import getPostLoader from '../../lib/get-post-loader'
import podcastConfig from '../../podcast.config'

type Props = {
  post: SerializedPost
}

const PostContentHelper = ({post}: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const title = getTitle(podcastConfig, post)
  checkYoutubeTitle(title, MAX_TITLE_LENGTH)

  const fileName = post.mp3.url.replaceAll('%20', ' ').match(/[^/]*$/)
  if (!fileName) {
    throw new Error('Could not get file name from URL')
  }

  return (
    <Layout title={`Copy Content for ${post.title}`}>
      <div className="container">
        <h1 className="title">{post.title} Content</h1>
        <h2 className="subtitle">Rsync command</h2>
        <TextAreaWithCopy
          startingText={endent`
          FILE_OUT="${fileName}"
          mv <FILE_IN> $FILE_OUT
          rsync -av $FILE_OUT ros@ftp-osl.osuosl.org:/home/ros/data/download.ros.org/sensethinkact/episodes/
          ssh ros@ftp-osl.osuosl.org /home/ros/trigger-ros
          ls -l $FILE_OUT # for file size
          `}
        />
        <h2 className="subtitle">Youtube</h2>
        <h3 className="subtitle is-6">Title</h3>
        <TextAreaWithCopy startingText={title} />

        <h3 className="subtitle is-6">Description</h3>
        <TextAreaWithCopy
          startingText={getYoutubeInterviewDescription(podcastConfig, post)}
        />

        <h3 className="subtitle is-6">Clip titles</h3>
        {post.youtube.clips && (
          <>
            {getYoutubeClipTitles(podcastConfig, post).map((title) => (
              <TextAreaWithCopy key={title} startingText={title} />
            ))}
            <h3 className="subtitle is-6">Clip description</h3>
            <TextAreaWithCopy
              startingText={getYoutubeClipDescription(podcastConfig, post)}
            />
          </>
        )}

        <h2 className="subtitle">Crossposting</h2>
        <h3 className="subtitle is-6">Robohub</h3>
        <TextAreaWithCopy startingText={getRobohubPost(podcastConfig, post)} />
        <h3 className="subtitle is-6">Irish Tech News</h3>
        <TextAreaWithCopy
          startingText={getIrishTechNewsPost(podcastConfig, post)}
        />

        <h2 className="subtitle">Gluetext</h2>
        <TextAreaWithCopy startingText={getGluetext(podcastConfig, post)} />

        <h2 className="subtitle">Social Media</h2>
        <h3 className="subtitle is-6">Twitter</h3>
        <TextAreaWithCopy startingText={getTweet(podcastConfig, post)} />
        <h3 className="subtitle is-6">LinkedIn</h3>
        <TextAreaWithCopy startingText={getLinkedIn(podcastConfig, post)} />
      </div>
    </Layout>
  )
}

const TextAreaWithCopy = ({startingText}: {startingText: string}) => {
  const [text, setText] = useState(startingText)
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setText(e.target.value)
  }

  return (
    <>
      <div className="columns is-centered">
        <div className="column is-8">
          <textarea
            onChange={handleChange}
            rows={4}
            style={{width: '100%'}}
            defaultValue={startingText}
          />
        </div>
        <div className="column is-4">
          <CopyToClipboard text={text}>
            <button style={{width: '100%', height: '100%'}}>
              Copy to clipboard
            </button>
          </CopyToClipboard>
        </div>
      </div>
      <br />
    </>
  )
}

export default PostContentHelper

export async function getStaticPaths() {
  const postLoader = await getPostLoader()
  const slugs = postLoader.getSlugs()
  const isDebug = process.env.DEBUG
  if (!isDebug) {
    return {
      paths: [],
      fallback: false,
    }
  } else {
    return {
      paths: slugs.map((slug) => ({
        params: {slug},
      })),
      fallback: false,
    }
  }
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({params}: Params) {
  const postLoader = await getPostLoader()
  return {
    props: {
      post: postLoader.getPostBySlug(params.slug),
    },
  }
}
