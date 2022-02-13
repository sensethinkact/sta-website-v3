import Link from 'next/link'

import {tagsUrl} from '../lib/constants'

type Props = {
  tags: string[]
}

const TagsList = ({tags}: Props) => {
  return (
    <>
      <div className='is-flex is-flex-wrap-wrap'>
        {tags.sort().map(tag => (
          <Link key={tag} href={`${tagsUrl}/[tag]`} as={`${tagsUrl}/${tag}`}>
            <a className="button is-info is-outlined is-small m-1">
              {tag}
            </a>
          </Link>
        ))}
      </div>
    </>

  )
}

export default TagsList