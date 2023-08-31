import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const DocuSign = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_BACKEND_API}` + "/docu-sign",
      {
        method: "POST",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          name,
          email,
          company,
        }),
      }
    );
    const data = await result.json();
    // window.location = data.data;
  };
  return (
    <>
      {/* <div style={{backgroundColor:"white",display:"block" , padding:"10px 0px"}}>
                    <h2 style={{marginLeft:"2rem"}}>Docu Sign</h2>
                    <form method="post">
                        <TextField onChange={(e)=>setName(e.target.value)} style={{display:"block" , margin: "2rem"}} id="name" label="name" variant="outlined" />
                        <TextField onChange={(e)=>setEmail(e.target.value)}  style={{display:"block" , margin: "2rem"}} id="email" label="email" variant="outlined" />
                        <TextField  onChange={(e)=>setCompany(e.target.value)}  style={{display:"block" , margin: "2rem"}} id="company" label="company" variant="outlined" />
                        <Button  style={{display:"block" , margin: "2rem"}} variant="contained" onClick={handleSubmit}>submit</Button> 
                    </form>
                </div> */}
    </>
  );
};
export default DocuSign;
