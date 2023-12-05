import React from 'react'

const ListPoints = (props) => {
  const renderList = [];
  
  props.points.forEach((p, i) => {
    renderList.push(
      <li key={i}>
        {props.objects[i]} - {p}
        <input type="button" value="x" onClick={() => props.removeObj(i)}/>
      </li>
    )
  })
  
  return <>
    { renderList }
  </>
}
export default ListPoints
