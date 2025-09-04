import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
const Registerform = () => {
  return (
    <div>
      <Form>
      
      <FormGroup>
        <Label for="username">username</Label>
        <Input
          id="username"
          name="username"
          placeholder="Enter Your Name"
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="with a placeholder"
          type="email"
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="password placeholder"
          type="password"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Select</Label>
        <Input id="exampleSelect" name="select" type="select">
          <option>Author</option>
          <option>Visitor</option>
          
        </Input>
      </FormGroup>
      
      <FormGroup>
        <Label for="exampleText">Tell About Yourself</Label>
        <Input id="exampleText" name="text" type="textarea" />
      </FormGroup>
      
      <Button>Submit</Button>
    </Form>
    </div>
  )
}

export default Registerform
