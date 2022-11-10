/* eslint-disable @next/next/no-img-element */

import Link from 'next/link'
import {IMAGES_URL} from '../lib/constants'

const LogoNav = () => {
  const scale = 0.2
  return (
    <>
      <nav aria-label="main navigation">
        <div className="navbar-brand">
          <Link href="/">
            <img
              className="navbar-logo"
              src={`${IMAGES_URL}/logo-with-name.png`}
              width={1900 * scale}
              height={400 * scale}
              alt="STA Logo"
            />
          </Link>
        </div>
      </nav>
    </>
  )
}

export default LogoNav
