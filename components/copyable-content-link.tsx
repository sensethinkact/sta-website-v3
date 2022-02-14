import Link from "next/link"

import { COPYABLE_CONTENT_URL } from "../lib/constants"

type Props = {
  slug: string
}
const CopyableContentLink = ({ slug }: Props) => {
  return (
    <Link passHref href={`${COPYABLE_CONTENT_URL}/[slug]`} as={`${COPYABLE_CONTENT_URL}/${slug}`}>
      <div className="button is-small is-warning" >
        Copyable Content Page
      </div>
    </Link>
  )
}

export default CopyableContentLink