import React from 'react'
import ListPoints from './components/ListPoints'
import Items from './components/Items'
import './style.css'
class App extends React.Component{
  constructor(){
    super()
    this.state={objects:["A","B","C"],values:[1,2,4],points:[0.25, 0.5,1],max:4,step:1, unit:"years",
      sX:170.09618943233417, sY:375,
      displayDots:true, dotsFill:"red", dotRadius:"5",dotsTextColor:"white",
      svgFontSize:"20"
    }
    this.onChange=this.onChange.bind(this)
    this.handleForm=this.handleForm.bind(this)
    this.addText=this.addText.bind(this);
  }
  handleForm=(e)=>{
    e.preventDefault();
    this.setState({objects:this.state.objects.concat(this.state.object),
      points:this.state.points.concat(Number(this.state.point)>=this.state.max?1:Number(this.state.point/this.state.max)),
      values:this.state.values.concat(this.state.point)})
  }
  calcItems=()=>{
    var Tindex=Array.from(Array(this.state.points.length).keys());
    var n=Tindex.length;
    const items=Tindex.map((i) =>{
      var temp=(i+1)*2*Math.PI/n;
      var Tx2=290;
      var Ty2=290;
      var l=this.state.points[i]*150;
      if(temp<=Math.PI/2){
        temp-=Math.PI/2;
        Tx2=Math.cos(temp)*l +300;
        Ty2=Math.sin(temp)*l +300;
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
      return({key:i+10000, x:Tx2, y:Ty2})
    })
    return items;
  }
  calcOutline=()=>{
    var outline=[];
    var points=this.calcItems();
    for(let i=1; i<points.length; i+=1){
      var Tx2=points[i].x;
      var Ty2=points[i].y;
      var Tx1=points[i-1].x;
      var Ty1=points[i-1].y;
      outline.push({cName:"outline", key:i, x1:Tx1, y1:Ty1, x2:Tx2, y2:Ty2});
    }
    if(points.length)
      outline.push({cName:"outline", key:9999999, x1:points[0].x,y1:points[0].y, x2:points[points.length-1].x, y2:points[points.length-1].y});
    return outline;
  }
  addText=()=>{
    var outline=[];
    var points=this.calcItems();
    var labels=this.state.objects;
    for(let i=0; i<points.length; i+=1){
      var Tx1=points[i].x;
      var Ty1=points[i].y;
      if(Tx1<=300 && Ty1<=300){
        Tx1-=30;
        Ty1-=30;
      }else if(Tx1>=300 && Ty1<=300){
        Tx1+=30;
        Ty1-=30;
      }else if(Tx1>=300 && Ty1>=300){
        Tx1+=30;
        Ty1+=30;
      }else if(Tx1<=300 && Ty1>=300){
        Tx1-=30;
        Ty1+=30;
      }
      outline.push({cName:"label",text:this.state.objects[i], key:i, x1:Tx1, y1:Ty1});
    }
    return outline;
  }
  removeObj = (i)=>{
    this.setState({points:this.deleteElement(this.state.points, i)});
    this.setState({objects:this.deleteElement(this.state.objects, i)});
    this.setState({values:this.deleteElement(this.state.values, i)});
  }
  deleteElement = (arr, index) => {
    var temp = [];
    for ( let i=0; i < arr.length; i += 1) {
      if(index != i){
        temp.push(arr[i]);
      }
    }
    return temp;
  }
  scales=()=>{
    var sX=this.state.sX;
    var sY=this.state.sY;
    var h=this.length2d(300,300,sX,sY);
    var f=1;
    var cos=Math.cos(Math.PI*f+(300 -this.state.sX)/h);
    var sin=Math.sin(Math.PI*f+(-this.state.sY +300)/h);
    var coors=[];
    var step=this.state.step;
    var max=this.state.max;
    var k=150/(max);
    for(let i=step; i<=max; i+=step){
      coors.push({x:cos*i*k +300, y: sin*i*k +300});
    }
    return coors;
  }
  length2d=(x1,y1,x2,y2)=>{
    return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
  }
  onChange=(e)=>{
    const {name, value, type, checked} = e.target;
    if(type==="checkbox"){
      this.setState({[name]:checked})
      console.log(this.state)
      return
    }
    if(type==="number" && value<=0){
      this.setState(this.setState({[name]:0.001}))
      return
    }
    if(name==="max" && value>=this.state.max){
      this.setState({points:this.state.points.map(x => x*(this.state.max/value))})
    }
    if(name==="max" && value<this.state.max){
      this.setState({points:this.state.points.map(x => x*(this.state.max/value))})
    }
    this.setState({[name]:value})
    
  }
  render(){
    return(
    <div className="wrapper" style={{margin:"auto",textAlign:"center"}}>
      <div className="c2">
        <h2>Hello there! Add new vector to you custom Wind-rose:</h2>
        <form onSubmit={this.handleForm}>
        <p>Label: <input name="object" onChange={this.onChange} type="text" required/> 
        Value: <input name="point"   onChange={this.onChange} min="0" max={this.state.max} type="number" step={this.state.step} required/>
        <input type="submit" value="Add"/>
        </p>
        </form>
        <p>Step<input name="step" onChange={this.onChange} min="0.1" type="number" step="any" value={this.state.step} /><br/>
        Max value: <input name="max" onChange={this.onChange} min="0" type="number" step="any" value={this.state.max} /> units <input name="unit" onChange={this.onChange} type="text" step="any" value={this.state.unit} />
        <br/>
        Display dots <input name="displayDots" onChange={this.onChange} type="checkbox" checked={this.state.displayDots} />
        dots color <input name="dotsFill" onChange={this.onChange} type="text" value={this.state.dotsFill}/>
        dots raduis <input name="dotRadius" onChange={this.onChange} min="1" type="number" step="1" value={this.state.dotRadius} />
        dots text color <input name="dotsTextColor" onChange={this.onChange} type="text" value={this.state.dotsTextColor}/>
        <br/>
        svgFontSize: <input name="svgFontSize" onChange={this.onChange} min="1" type="number" step="1" value={this.state.svgFontSize} />px
        </p>
        <div key="123123123123" style={{}}>
        <svg id="svg" style={{height:"600px", width:"600px", backgroundColor:"grey", fontSize:this.state.svgFontSize+"px"}}>
          <text key="a" x="10" y="20">Max value: {this.state.max} {this.state.unit}</text>
          <circle cx="300" cy="300" r="150" fill="white" strokeWidth="4"/>
          {this.calcItems().map((item) => <line key={item.key} x1="300" y1="300" x2={item.x} y2={item.y}/>)}
          {this.calcOutline().map((item) => <line className={item.cName} key={item.key} x1={item.x1} y1={item.y1} x2={item.x2} y2={item.y2}/>)}
          {this.addText().map((item)=> <text key={item.key} x={item.x1} y={item.y1}>{item.text}</text>)}
          {this.state.displayDots?this.calcItems().map((i)=><circle cx={i.x} cy={i.y} r={this.state.dotRadius} fill={this.state.dotsFill} strokeWidth="4"/>):""}
          {this.state.displayDots?this.calcItems().map((i)=><text fill={this.state.dotsTextColor} x={i.x-4} y={i.y+4} strokeWidth="4">{this.state.values[i.key-10000]}</text>):""}
        </svg>
        <p style={{padding:"0% 5%", margin:"3%"}}>Source: <a href="https://github.com/ar2rworld/custom_wind_rose">https://github.com/ar2rworld/custom_wind_rose</a></p>
      </div>
      <ListPoints removeObj={this.removeObj} objects={this.state.objects} points={this.state.values}/>
    </div>
  </div>)}
}
export default App