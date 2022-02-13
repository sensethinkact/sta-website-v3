import Link from "next/link"

import { copyableContentUrl } from "../lib/constants"

type Props = {
  slug: string
}
const CopyableContentLink = ({ slug }: Props) => {
  return (
    <Link passHref href={`${copyableContentUrl}/[slug]`} as={`${copyableContentUrl}/${slug}`}>
      <div className="button is-small is-warning" >
        Copyable Content Page
      </div>
    </Link>
  )
}

export default CopyableContentLink