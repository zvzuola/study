import React, { useState, useRef } from 'react'

export default function InfinityScroll() {
  const list = Array.from({ length: 1000 }, (v, i) => i)
  const count = 15
  const viewHeight = 200
  const liHeight = 40
  // const totalHeight = liHeight * list.length
  const [startIndex, setStartIndex] = useState(0)
  const [top, setTop] = useState(0)
  const [showList, setShowList] = useState(list.slice(startIndex, startIndex + count))
  const containerEl = useRef(null);
  const handleScroll = () => {
    const scrollTop = containerEl.current ? (containerEl.current as any).scrollTop : 0
    const index = Math.floor(scrollTop / liHeight)
    setStartIndex(index)
    setTop(scrollTop - scrollTop % liHeight)
    setShowList(list.slice(index, index + count))
  }
  return <div
    style={{ height: viewHeight, overflowY: 'auto', position: 'relative', border: '1px solid' }}
    ref={containerEl}
    onScroll={handleScroll}>
    {/* <div style={{ height: totalHeight, position: 'absolute' }}></div> */}
    <div style={{ transform: `translateY(${top}px)` }}>
      {showList.map(v => <div key={v} style={{ height: `${liHeight}px`, lineHeight: `${liHeight}px`, borderBottom: '1px solid #ddd' }}>{v}</div>)}
    </div>
  </div>
}