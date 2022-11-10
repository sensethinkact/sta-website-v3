import {toTimestampString} from '@sta-podcast/timestamp-tools'
import type {SerializedPost} from '@sta-podcast/types'
import Link from 'next/link'
import {EPISODES_URL} from '../lib/constants'
import {listToString, truncateWords} from '../lib/utils'
import CopyableContentLink from './copyable-content-link'
import TagsList from './tags-list'

type Props = {
  post: SerializedPost
  maxPreviewWords?: number
  isDebug?: boolean
}

const EpisodePreview = ({post, maxPreviewWords = 350, isDebug}: Props) => {
  const titleEndsWithPunctuation = /[.?!]$/.test(post.title)
  const withStr = titleEndsWithPunctuation ? ' with' : ', with'
  return (
    <div key={post.slug} className="column is-12">
      <article>
        <div className="media">
          <div className="media-content">
            <Link
              href={`${EPISODES_URL}/[slug]`}
              as={`${EPISODES_URL}/${post.slug}`}
            >
              <p className="is-5 is-marginless">
                <span className="title is-5">
                  {post.number && post.number?.toString() + '. '}
                  {post.title}
                </span>
                <span className="subtitle is-5">
                  {post.guests && `${withStr} ${listToString(post.guests)}`}
                </span>
              </p>
          </Link>
            {isDebug && <CopyableContentLink slug={post.slug} />}
            <p className="content is-marginless">
              {truncateWords(post.description, maxPreviewWords)}
            </p>
            <div className="content is-small">
              {post.publishDate}
              <span>{' · '}</span>
              {toTimestampString(post.duration)}
            </div>
            <TagsList tags={post.tags} />
          </div>
        </div>
      </article>
    </div>
  )
}

export default EpisodePreview
