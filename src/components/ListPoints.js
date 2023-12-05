import React, {Component} from 'react'
class ListPoints extends Component{
  constructor(props){
    super()
    this.state={objects:props.objects, points:props.points, removeObj:props.removeObj}
    this.renderList = [];
    this.state.points.forEach((p, i) => {
      this.renderList.push(
        <li key={i}>
          {this.state.objects[i]} - {p}
          <input type="button" value="x" onClick={()=>this.state.removeObj(i)}/>
        </li>
      )
    })
  }

  render(){
    return(<>
      { this.renderList }
    </>)
  }
}
export default ListPoints
