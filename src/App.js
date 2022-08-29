import logo from './logo.svg';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Navigate
} from "react-router-dom";
import './App.css';
class Sidepanel extends React.Component{
  constructor(props) {
    super(props);
    // this.state = {display: false};
  }
  render(){
    if(this.props.display){
      return(
        <div className='sidepanel'>{this.props.children}</div>
      );
    } else {
      return(
        <div className='sidepanel d-none'>{this.props.children}</div>
      );
    }
  }
}
class FrameContainer extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    if(this.props.panelVisibility){
      return(<div className='frame-container' 
                  style={{
                    height:'calc(100vh - 40px)',
                    width:'calc(100wv - 200px)',
                    overflowY:'scroll',
                    overflowX:'hidden',
                    marginLeft:'200px'
                  }}>
        {this.props.children}
      </div>);
    } else {
      return(<div className='frame-container' 
                  style={{height:'calc(100vh - 40px)',
                          width:'calc(100wv - 200px)',
                          overflowY:'scroll',
                          overflowX:'hidden'
                  }}>
        {this.props.children}
      </div>);
    }
  }
}
class App extends React.Component {
  constructor(props) { 
    super(props);
    this.state = {menuVisibility: false,data:{
      'Loading':[{name:'loading',img:''}]
      }};
  }
  getContent = ()=>{
    //async load
    var p = new Promise((resolve,reject)=>{
      var exampleData = {
                        'category1':[{'name':'test11','img':''},{'name':'test12','img':''},{'name':'test13','img':''},{'name':'test14','img':''},{'name':'test15','img':''},{'name':'test16','img':''},{'name':'test11','img':''},{'name':'test12','img':''},{'name':'test13','img':''},{'name':'test14','img':''},{'name':'test15','img':''},{'name':'test16','img':''}],
                        'category2':[{'name':'test21','img':''},{'name':'test22','img':''},{'name':'test23','img':''},{'name':'test24','img':''},{'name':'test25','img':''},{'name':'test26','img':''},{'name':'test21','img':''},{'name':'test22','img':''},{'name':'test23','img':''}],
                        'category3':[{'name':'test31','img':''},{'name':'test32','img':''},{'name':'test33','img':''},{'name':'test34','img':''},{'name':'test35','img':''},{'name':'test36','img':''},{'name':'test32','img':''},{'name':'test33','img':''},{'name':'test34','img':''},{'name':'test35','img':''},{'name':'test36','img':''}]
                        };
      resolve(exampleData);
    });
    return p;
  };
  renderCategories = (data)=>{
    var DOMElements=[];
    for(var category in data){
      DOMElements.push(<NavLink to={category} 
                                className={({ isActive }) =>
                                              isActive ? 'active' : undefined
                                          }
                                style={{ textDecoration: 'none' }}>
                          <div className='li'>{category}</div>
                       </NavLink>);
    }
    return(<div className='ul'>{DOMElements}</div>);
  }
  renderContents = (data)=>{
    var DOMElements =[];
    for(var category in data){
      var categoryContents = [];
      for(var unit in data[category]){
        var name = data[category][unit].name;
        categoryContents.push(<div className='frame'>{name}</div>);
      }
      DOMElements.push(<Route path={category} element={categoryContents}/>);
    }
    return(DOMElements);
  }
  toggleVisibility = ()=>{
    if(this.state.menuVisibility==true){
      this.setState({menuVisibility: false});
    } else {
      this.setState({menuVisibility: true});
    }
  }
  async componentDidMount() {

    this._asyncRequest = this.getContent();
    const externalData = await this._asyncRequest;
    this._asyncRequest = null;
    this.setState({data:externalData});
  }
  render() {
      return (
        <div>
          <div className='nav bg-dark' style={{height:'40px',width:'100%'}}>
            <button className='btn' onClick={this.toggleVisibility} style={{height:'40px',width:'40px'}}>
              <i className='bi bi-list text-light' style={{height:'40px',width:'40px',fontSize:'30px'}}></i>
            </button>
          </div>
          <Sidepanel display={this.state.menuVisibility} children={this.renderCategories(this.state.data)}/>
          <FrameContainer panelVisibility = {this.state.menuVisibility} children={
            <Routes>
              {this.renderContents(this.state.data)}
            </Routes>
          }/>
        </div>
      );
  }
}

export default App;
