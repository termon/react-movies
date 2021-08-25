
import React, { useEffect, useState } from "react";
import { GotoPageAction, IPaginator } from "./store";

// calculate paginator data
const pagination = (c:number, m:number): any[] => {
  const current = c
  const last = m
  const delta = 4
  const left = current - delta
  const right = current + delta + 1
  const range = []
  const rangeWithDots = []

  for (let i = 1; i <= last; i++) {
      if (i == 1 || i == last || i >= left && i < right) {
          range.push(i);
      }
  }

  let l = undefined
  for (const i of range) {
      if (l) {
          if (i - l === 2) {
              rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
              rangeWithDots.push('...');
          }
      }
      rangeWithDots.push(i);
      l = i;
  }
  //console.log(`paginate page:${c} Max:${m} ArrayLength:${rangeWithDots.length}`)
  return rangeWithDots;
}

interface PropTypes  {
 paginator: IPaginator
 gotoPage: GotoPageAction
}
function Paginator( { paginator, gotoPage}  : PropTypes) {
  const {page, totalPages} = paginator 

  // local paginator state
  const [pages, setPages] = useState<(number|string)[]>([])
  
  // calculate number of pages to display in paginator in effect
  useEffect( () => {
    setPages(pagination(page, totalPages))
  }, [page, totalPages])
  
  // don't display paginator if no pages 
  if (totalPages == 0) return null

  return ( 
    <nav aria-label="Page navigation example">
        <ul className="pagination">
          
          <li className="page-item">
            <button className="page-link" onClick={() => gotoPage(page-1, totalPages)} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>

          { pages.map( (p,i) => {
              if (p === '...')      
                return <li key={i} className="page-item"><button className="page-link">{p}</button></li>
              else if (p == page)
                return <li key={i} className="page-item active"><button className="page-link" onClick={()=>gotoPage(+p, totalPages)}>{p}</button></li>
              else
                return <li key={i} className="page-item"><button className="page-link" onClick={()=>gotoPage(+p, totalPages)}>{p}</button></li>
            }
          )} 
        
          <li className="page-item">
            <button className="page-link" onClick={() => gotoPage(page+1, totalPages)} aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
  )
}

export default Paginator;

