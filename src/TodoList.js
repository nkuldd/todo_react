import React from 'react';  
class TodoList extends React.Component {
    constructor() {
        super();
        this.state = {
            myList: [],  
            todoItem: ''  
        };
        this.itemAdd = this.itemAdd.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.itemChange = this.itemChange.bind(this);
    }
    //使用localStorage储存数据
    componentWillMount() {
        let list = window.localStorage.getItem('list');
        if(!list){
            list = [];
        }else{
            list = list.split(',');
        }
        this.setState({
            myList: list
        });
        console.log('dddd')
    }
    //添加ddddd
    itemAdd() {
      if(this.state.todoItem){
        const newList = [...this.state.myList];
        newList.push(this.state.todoItem); 
        this.setState({
          myList : newList,
          todoItem : '',
        });
        window.localStorage.setItem('list', newList); 
      }else{
        window.alert('请填写内容！')
      }  
    }
    //回车添加事项
    keyDown(e) {
      if (e.keyCode == 13) {
        this.itemAdd();
      }
    }
    //获取当前输入
    itemChange(e) {
        this.setState({
            todoItem: e.target.value
        });
    }
    //删除
    ItemDelete(index) {
        const newList = [...this.state.myList];
        newList.splice(index, 1);
        this.setState({
          myList : newList,
        });
        window.localStorage.setItem('list', newList);
    }
    //改
    itemUpdate(index) {
        let newItem = window.prompt('变更事项为： ');
        if (newItem){
          const newList = this.state.myList;
          newList.splice(index,1,newItem);
          this.setState({
            myList : newList
          })
          window.localStorage.setItem('list', newList);
        }else{
          window.alert('请填写内容！')
        }
    }
    render() {
        return (
          <React.Fragment>
            <p style={{textAlign:"center",fontSize:"50px",color:"#33CCFF"}}>TodoList</p>
            <div>
              <input placeholder='请添加事项' style={{margin:"20px 60px",width:"300px",fontSize:"20px",height:"42px"}} type="text" value={this.state.todoItem} onChange={this.itemChange} onKeyDown={this.keyDown}></input>
              <button onClick={this.itemAdd} style={{width:"100px",height:"42px",fontSize:"20px",borderRadius:"3px",outline:"none",backgroundColor:"#33CCFF",borderColor:"#99CCFF",color:"white"}}>添加</button>
            </div>                       
            <ol>
                {this.state.myList.map((item, index) => {
                    return <li key={index} style={{margin:"20px"}}>
                        {item}
                        <button style={{marginLeft:"20px",backgroundColor:"yellow",outline:"none",borderColor:"#FFCC33"}} onClick={this.itemUpdate.bind(this, index)}>变更</button>&nbsp;&nbsp;
                        <button style={{marginLeft:"20px",backgroundColor:"red",outline:"none",borderColor:"#CC0000"}} onClick={this.ItemDelete.bind(this,index)}>删除!</button>
                    </li>                  
                })}
            </ol>
          </React.Fragment>
        );
    }
}
export default TodoList;
