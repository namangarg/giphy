import React, { useEffect } from 'react'
import ListScroll from './ListScroll'

function Scroll(props) {
  const { result } = props
  return (
    <div>

      <div className="scroll__results">
        <ListScroll result={result} />
      </div>

    </div>
  )
}

export default Scroll
