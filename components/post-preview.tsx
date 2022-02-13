import Link from "next/link"

import { listToString, truncateWords } from "../lib/utils"
import { toTimestampString } from "@sta-podcast/timestamp-tools"

import TagsList from "./tags-list"

import type { SerializedPost } from "@sta-podcast/types"

type Props = {
  post: SerializedPost
  maxPreviewWords?: number
}

const PostPreview = ({ post, maxPreviewWords=350 }: Props) => {
  return (

    <div key={post.slug} className='column is-12'>
      <article>
        <div className="media">
          <div className="media-content">
            <Link href="/episodes/[slug]" as={`/episodes/${post.slug}`}>
              <a>
                <p className="is-5 is-marginless">
                  <span className='title is-5'>
                    {post.number && post.number?.toString() + ". "}
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
            <TagsList tags={post.tags} />
          </div>
        </div>
      </article>
    </div>
  )
}

export default PostPreview