/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import '../main/main.css'
import React, { Component } from 'react'
import apis from '../../service/api.service';
import { Table } from 'react-bootstrap';
export class Maincard extends Component<any, any> {

  constructor(props: any) {
    super(props);
    console.log(props);
    
    this.state = { restoLists: null };
  }

  componentDidMount() {
    apis.get('posts/').then(res => {
      this.setState({ restoLists: res.data })
    })
  }


  render() {
    console.log(this.state.restoLists);
    return (

      <><div>
         <div>
     {
       this.state.restoLists ?
       <><h1>RestaurantList</h1><div>
         <Table striped bordered hover>  
           <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {/* {
              this.state.restoLists.map((Item:any)=>{
                return (<tr>
                 <td>{Item.id}</td>
                <td>{Item.usetId}</td>
                <td>{Item.body}</td>
                <td>@{Item.id}</td>
              </tr>)
              })
            } */}
          </tbody>
             {this.state.restoLists.map((Item: any) => {
               
               console.log(Item.id); 
               return (<tr  key={Item.id}>
                <td >{Item.id}</td>
               <td>{Item.userId}</td>
               <td>{Item.body}</td>
               <td>@{Item.id}</td>
             </tr>)
               
             })}
           </Table>
         </div></>
         :
         <p>Please Wait...</p>
     }
    </div>
        {/* <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.restoLists.map((Item:any)=>{
                return <tr>
                <td>{Item.id}</td>
                <td>{Item.usetId}</td>
                <td>{Item.body}</td>
                <td>@{Item.id}</td>
              </tr>
              })
            }
          </tbody>
        </Table> */}
      </div>
      </>
    )
  }
}




export default Maincard;