import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { app } from "./firebase";
import { Navbar, Nav, Container } from "react-bootstrap";


function Dashboard() {
    
     let navigate = useNavigate();
         let [data, setData] = useState([]);
         var value = [];
         let [email_new,setEmail]=useState("");
 useEffect(() => {
   checkAuth();
 });
    let checkAuth = async()=>{

        let token = sessionStorage.getItem('token')
        let email = sessionStorage.getItem("email");
        setEmail(email)
        console.log(email_new)
        if(token)
        {
            let config = {
                headers: {
                  token: token,
                }
              }
              
            let res = await axios.post("https://express-video-app.herokuapp.com/users/auth",{purpose:"Validate Access"},config)
            if(res.data.statusCode!==200)
            {
                sessionStorage.clear();
                navigate('/login');
            }
        }
        else
        {
            navigate('/login');
        }
    }
  let logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  let upload_nav = () => {
    
    navigate("/upload");
  };

 
     useEffect(() => {
       getData();
     }, []);
     let getData = async () => {
       try {
         let res = await axios.get("https://express-video-app.herokuapp.com/users/video_url");
         if (res.data.statusCode === 200) {
           if (res.data.users.length > 0) {
             for (let i in res.data.users) {
               value.push(res.data.users[i]);
             }
             setData(value);
             console.log(data);
           }
         }
       } catch (error) {
         console.log(error);
       }
     };

     return (
       <>
         <Navbar bg="dark" variant="dark">
           <Container>
             <div style={{ float: "left" }}>
               <Navbar.Brand href="#home">Video Streaming App</Navbar.Brand>
             </div>
             <div>
               <Nav className="me-auto">
                 <Nav.Link href="#">
                   <button
                     style={{ backgroundColor: "white" }}
                     onClick={() => upload_nav()}
                   >
                     Upload
                   </button>
                 </Nav.Link>
                 <Nav.Link href="#">{email_new}</Nav.Link>
                 <Nav.Link href="#">
                   {" "}
                   <button
                     style={{ backgroundColor: "white" }}
                     onClick={() => logout()}
                   >
                     Logout
                   </button>
                 </Nav.Link>
               </Nav>
             </div>
           </Container>
         </Navbar>
         
         {data.map((e, i) => {
           return (
             <div class="wrapper_each " key={i}>
               <div class="video_wrap">
                 <video width="750" height="500" controls>
                   <source src={e.image_url} type="video/mp4" />
                 </video>
                 <div class="text_wrap">
                   <div>Title: {e.image_name}</div>
                   <div>Description: {e.image_des}</div>
                 </div>
               </div>
             </div>
           );
         })}
       </>
     );
}

export default Dashboard