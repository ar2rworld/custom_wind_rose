import React, {Component} from 'react'
class ListPoints extends Component{
  constructor(props){
    super()
    this.state={objects:props.objects, points:props.points,removeObj:props.removeObj}
  }
  componentWillReceiveProps(props){
    this.setState({objects:props.objects, points:props.points})
  }
  render(){
    var listPoints=[];
    for(let i=0; i<this.state.points.length; i+=1){
      listPoints.push(<li key={i+4000}>{this.state.objects[i]} - {this.state.points[i]} <input type="button" value="X" onClick={()=>this.state.removeObj(i)}/></li>)
    }
    return(<div style={{float:"right", padding:"0%"}}>
    {listPoints}
  </div>)}
}
export default ListPoints