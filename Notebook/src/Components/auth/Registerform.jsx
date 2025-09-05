import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const Registerform = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = async () => {
    toast.info(username + " " + email + " " + password + " " + type);

    /////////////////////////////////////////////////////////
    /* here i made a request to register place the endpoint in "URL" and test*/

    ////////////////////////////////////////////////////////
    // try{
    //   await axios.post("URL",{
    //     username,email,password,type,bio
    //   });

    // }catch(error){
    //   toast.warning("unable to register")
    // }

    toast.success("Registered Successfully");
  };

  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            id="username"
            name="username"
            placeholder="write your username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter Your Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            id="examplePassword"
            name="password"
            placeholder="password placeholder"
            type="password"
            valide={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Select</Label>
          <Input
            id="exampleSelect"
            name="select"
            type="select"
            value={type}
            onChange={(e) => setType(e.target.value)} // ✅ Handle input change
          >
            <option value="">-- Select a Role --</option>
            <option value="Admin">Admin</option>
            <option value="Author">Author</option>
            <option value="Visitor">Visitor</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="exampleText">Tell About Yourself</Label>
          <Input id="exampleText" name="text" type="textarea" />
        </FormGroup>

        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
};

export default Registerform;
