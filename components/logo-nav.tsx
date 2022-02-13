import Image from 'next/image'
import Link from 'next/link'

import {imageUrl} from '../lib/constants'

const LogoNav = () => {
  const scale = 0.2
  return (
    <>
      <nav aria-label="main navigation">
        <div className="navbar-brand">
          <Link href="/">
            <a>
              <Image
                className="navbar-logo"
                src={`${imageUrl}/logo-with-name.png`}
                width={1900 * scale} height={400 * scale}
                alt="STA Logo"
              />
            </a>
          </Link>
        </div>
      </nav>
    </>
  )
}

export default LogoNav