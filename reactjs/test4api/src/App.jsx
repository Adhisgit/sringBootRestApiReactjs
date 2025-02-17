import "./App.css"
import React from "react";
import DataTable from "react-data-table-component";
import { useEffect,useState } from "react"
// import { render } from 'react-dom';
// import { Button, InputGroup,} from "react-bootstrap";
import { EntityTitle,InputGroup,Button ,Toaster, EditableText} from "@blueprintjs/core";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode} from "jwt-decode";
import { googleLogout } from '@react-oauth/google';
import axios from "axios"
// import { useCookies } from "react-cookie";
// import Cookies from "universal-cookie";
// import LoginButton from "./components/login";
// import LogoutButton from "./components/logout";
// import Logout from "./components/logout";

// import { gapi } from "gapi-script";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const AppToster = Toaster.create({
  position: "top"
})
function App(){
  const [users,setUsers] = useState ([]);
  const [newId,setNewId] = useState("")
  const [newName,setNewName] = useState("")
  const [newPrice,setNewPrice] = useState("")
  useEffect(()=>{
    fetch("http://localhost:8080/products")
    .then((Response) => Response.json())
    .then((json) => setUsers(json))
  },[])


  // useEffect(()=>{
  //   function start(){
  //     gapi.client.init({
  //       clientId : CLIENT_ID,
  //       scope :""
  //     })
  //   };
  //   gapi.load('client:auth2', start);
  // });
   //var accessToken  = gapi.auth.getToken().access_token;

   const [apipord,setapiprod] = useState([])
   const getapi = async () => {
    try{
      const apidata = await axios.get("http://localhost:8080/api");
      
      console.log(apidata.data)
      setapiprod(apidata.data)
    }
    catch(e){
      console.log(e)
    }
  };

  useEffect(()=>{
    getapi()
  },[]);
      
  function adduser(){
    
    const prodId = newId.trim();
    const prodName = newName.trim();
    const price = newPrice.trim();

    if( prodId && prodName && price){
      fetch("http://localhost:8080/products",
        {
          method : "POST",
          
          body: JSON.stringify({
            prodId,
            prodName,
            price
        
          }),
          headers:{
            "content-Type":"application/json; charset=UTF-8"
          }
          
      }
    ).then((Response ) => Response.json())
    .then(data =>{
      setUsers([...users,data]);
       AppToster.show({
        message:"user added successfully",
        intent:"success",
        timeout:3000
      })
      setNewId("");
      setNewName("");
      setNewPrice("");
    })
    }
    window.location.reload ()
  }
  function onChangeHandler( prodId,key,value){
    setUsers((users)=>{
      return users.map(user =>{
        return user.prodId === prodId ? {...user,[key]:value} : user;
      })
    })
  }
  function updateUser(prodId){
    const user = users.find((user) => user.prodId === prodId);
    fetch("http://localhost:8080/products",
      {
          method : "PUT",
          
          body: JSON.stringify(user),
          headers:{
            "content-Type":"application/json; charset=UTF-8"
          }
          
      }
    ).then((Response ) => Response.json())
    .then(data =>{
      
       AppToster.show({
        message:"user updated successfully",
        intent:"success",
        timeout:3000
      })
      
    })
    window.location.reload ()
  }
  function deleteUser(prodId){
    fetch(`http://localhost:8080/products/${prodId}`,
      {
          method : "DELETE",
      }
    )
    .then((Response ) => Response.json())
    .then(data =>{
      setUsers((users)=>{
        return users.filter(user => user.prodId !== prodId)
      })
       AppToster.show({
        message:"user deleted successfully",
        intent:"success",
        timeout:3000
      })
      // const cookies = useCookies(credentialResponseDecoded,credentialResponse)
      
    })
    window.location.reload ()

    

  };
 

  return (
    
    <div className="App">
      <span>
          <GoogleLogin
            onSuccess={credentialResponse => {
              const credentialResponseDecoded = jwtDecode(
                credentialResponse.credential
                
              );
              // JSON.stringify(credentialResponseDecoded)
              // console.log(JSON.parse(Cookies.get(credentialResponse)))
              // const cookies = new Cookies();
              // cookies.set(credentialResponse)
              // console.log(cookies.get(credentialResponse));
              
                console.log(credentialResponseDecoded);
                console.log(credentialResponse);

                // const currentTime = Math.floor(Date.now() / 1000);
                // if (credentialResponseDecoded.exp < currentTime) {
                //   console.log("Token has expired.");
                // } else {
                //   console.log("Token is valid.");
                // }   
                
            }}
            onError={() => {
                console.log('Login Failed');
            }}
            
            
            />
            
      </span>
      {/* <LoginButton/>
      <LogoutButton/>
      <Logout/> */}
      
      <table className="tableNAme">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>price</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => 
            <tr key={user.prodId}>
              <td>< EditableText onChange={value => onChangeHandler (user.prodId,"prodId",value )} value = {user.prodId} /></td>
              <td>< EditableText onChange={value => onChangeHandler (user.prodId,"prodName",value )} value = {user.prodName}/></td>
              <td>< EditableText onChange={value => onChangeHandler (user.prodId,"price",value )}  value ={user.price}/></td>
              <td>
                <Button className="u" intent ="primay " onClick={()=>updateUser(user.prodId)}>Update</Button>
                <Button className="d" intent= "danger"  onClick={()=>deleteUser(user.prodId)}>Delete</Button>
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
           
            <td >
              <InputGroup value={newId}
            onChange={(e) => setNewId(e.target.value)}
            placeholder="enter id..."
            />
            </td>
            <td >
              <InputGroup value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="enter product name..."
            />
            </td>
            <td >
              <InputGroup value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            placeholder="enter price id..."
            />
            </td>
            <td>
              <Button className="a" onClick=  { adduser}  >add</Button>
            </td>
          </tr>
        </tfoot>
      </table>
      <div>
        {/* {apipord.map((item) =>{
          return<p> 
            {item.id} - {item.email} - {item.first_name} - {item.last_name} 
            </p>
        }
        )} */}
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>userId </TableCell>
            <TableCell align="right">id</TableCell>
            <TableCell align="right">title</TableCell>
            <TableCell align="right">completed</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {apipord.map((item) => (
            <TableRow
              key={item.userId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {item.userId},
              </TableCell>
             
              <TableCell align="right">{item.id}</TableCell>
              <TableCell align="right"> {item.title}</TableCell>
              <TableCell align="right">{item.completed} </TableCell>
              {/* <TableCell align="right">src={item.avatar} </TableCell> */}
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    </div>
    
   
  )
  ;
}


export default App;
