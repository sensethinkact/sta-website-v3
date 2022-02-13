import {useState} from 'react'

type Props = {
  children: React.ReactNode
  isStartExpanded?: boolean
  showText?: string
  hideText?: string
}

const ReadMore = ({children, isStartExpanded=false, showText="Read more", hideText="Read less"}: Props) => {

  const [isReadMore, setIsReadMore] = useState(isStartExpanded)

  return (
    <>
      {
        isReadMore ? (
          <div>
            <p>
              {children}
            </p>
            <button className="button is-info is-small" onClick={() => setIsReadMore(false)}>{hideText}</button>
          </div>
        ) : (
          <button className="button is-info is-small" onClick={() => setIsReadMore(true)}>{showText}</button>
        )
      }
    </>
  )
}

export default ReadMore