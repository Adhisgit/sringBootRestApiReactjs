// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";

// const CLIENT_ID="148063497584-8i6mg43qmjgjon34mu46s7ib6stpc849.apps.googleusercontent.com"

// function login () {
//     const onSuccess =(res)=>{
//         console.log("login",res,);
//         const idToken = res.credential;
//         const decoded = jwtDecode(idToken);
//         console.log("Decoded Token:", decoded);
//         // let decoded = jwtDecode(res?.credential);
//         // const email = decoded?.email;
//         // const name = decoded?.name;
//         // const token = res?.tokenId;
//         // const googleId = res?.googleId;
//         // const result = { email, name, token, googleId };
//         // console.log(result);
//         // console.log(res.payload);
//     }
//     const onFailure =(res)=>{
//         console.log("login falied",res);
//          //console.log(tokenResponse.access_token);
        
//     }

//     return(
//         <div id = "signInButton">
//             <GoogleLogin
//             clientId={CLIENT_ID}
//             buttontext={"Login"}
//             onSuccess={onSuccess}
//             onFailure={onFailure}
//             cookiePolicy={'single_host_origin'}
//             isSignedIn={true}
//             />
//         </div>
//     )
// }

// export default login;