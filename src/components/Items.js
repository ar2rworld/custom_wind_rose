import React, {Component} from 'react'
class Items extends Component{
  constructor(props){
    super()
    this.state={objects:props.objects, points:props.points}
  }
  componentDidMount(){
    var Tindex=Array.from(Array(this.state.points.length).keys());
    var n=Tindex.length;
    const items=Tindex.map((i) =>{
      var temp=(i+1)*2*Math.PI/n;
      var Tx2=290;
      var Ty2=290;
      var l=this.state.points[i]*300;
      if(temp<=Math.PI/2){
        temp-=Math.PI/2;
        Tx2=Math.cos(temp)*l +300;
        Ty2=Math.sin(temp)*l +300;
        //console.log(temp)
      }else if(temp<=Math.PI){
        temp-=Math.PI/2;
        Tx2=Math.cos(temp)*l +300;
        Ty2=Math.sin(temp)*l +300;
      }else if(temp<=Math.PI*(3/2)){
        temp+=Math.PI*3/2;
        Tx2=Math.cos(temp)*l +300;
        Ty2=Math.sin(temp)*l +300;
      }else{
        temp-=Math.PI*2.5;
        Tx2=Math.cos(temp)*l +300;
        Ty2=Math.sin(temp)*l +300;
      }
      this.setState({points: this.state.points.concat({x:Tx2,y:Ty2})})
      //this.setState({points})
      //console.log(points)
      return(<line key={i} x1="300" y1="300" x2={Tx2} y2={Ty2}/>)
    })
    this.setState({items})
    console.log(items);
  }
  render(){return(
    this.state.items
  )}
}
export default Items