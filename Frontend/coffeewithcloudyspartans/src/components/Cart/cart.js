import React from 'react';
import '../Login/Login';
import { Container, Row, Col, Button, Fa, Card, CardBody, ModalFooter } from 'mdbreact';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';

import axios from 'axios'

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      Redirection_Value : false,
      cartnumber:'',

      errors : false
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:4004/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials : 'include',
      body: JSON.stringify({
      username: this.state.signInEmail,
      password: this.state.signInPassword
      })
    })
    .then(response => {
      if(response.status === 400)
        {
          this.setState({errors : true})
        }
      else
        {
          response.json()
          .then(user => {
          console.log("NAME" + user)
          this.props.loadUser(user);
          this.setState({Redirection_Value : true})
          })
        }
      })
  }

  componentDidMount(){
      var Userid="test_user"
      axios.get('http://localhost:4004/cart/'+Userid).then(response=>
      {
          console.log("response is ", response.data[0])
          this.setState({
              cartnumber:response.data[0].count
          })
      })
    // fetch('http://localhost:4004/cart/'+Userid, {
    //     method: 'GET',
    //     headers: {'Content-Type': 'application/json'},
    //     credentials : 'include',
       
    //   })
    //   .then(response => {
    //     if(response.status === 400)
    //       {
    //        console.log("response is ",response)
    //       }
    //     else
    //       {
    //         response.json()
    //         .then(user => {
    //         console.log("NAME" + user)
    //         this.props.loadUser(user);
    //         this.setState({Redirection_Value : true})
    //         })
    //       }
    //     })


      


  }
  
  render()
  {
    let Redirecty = null;
    let Errors = null;
      console.log("HEEREE")
    if(this.state.Redirection_Value === true && cookie.load('cookie'))
    {
     Redirecty =  <Redirect to="/home" />
    }
    if(this.state.errors === true)
    {
      Errors = <p class="error">Username or Password doesn't exist </p>
    }
    return(
      <div>
    {Redirecty}
       {/* <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
        <a class="navbar-brand" href="#"><img alt="HomeAway birdhouse" class="site-header-birdhouse__image" role="presentation" src="https://static.savings-united.com/shop/20251/logo/Logo_0062_HomeAway.png" height="150" width="150"/></a>
            <ul class="navbar-nav mr-auto">
            </ul>
            <ul class="navbar-nav">
                <li>
                <a class="site-header-birdhouse" href="/" title="Learn more"><img alt="HomeAway birdhouse" class="site-header-birdhouse__image" role="presentation" src="https://lh3.googleusercontent.com/peTB5wWV332_otZJMJ897LqTv2B40lity4VDuStgZ4U8ocCGKUBGisnjSi9TyhXSOydm=s180" height="50" width="50"/></a>          
                </li>
            </ul>
    </nav> */}
    <br />
    <p>Cart</p>
      <Container>
       <h1 class="makeitceneter"> Log in to Coffee with Cloudy Spartans</h1>
       <br />
       <br />
        <p className="font-small grey-text d-flex justify-content-center">Not a member? <a href="/signup" className="blue-text ml-1"> Sign Up</a></p>
        <section className="form-elegant">
          <Row >
            <Col md="4" className="mx-auto">
              <Card>
                <CardBody className="mx-4">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5">Account Login</h3>
                    <hr></hr>
                  </div>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username"  onChange={this.onEmailChange} required/>
                  <br>
                  </br>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"  onChange={this.onPasswordChange} required/>
                   <br>
                  </br>
                  <div className="text-center mb-3">
                    <Button type="button" gradient="blue" className="btn btn-primary btn-lg btn-block" onClick = {this.onSubmitSignIn}>Log In</Button>
                      <hr></hr>
                  </div>

                   <div className="text-center mb-3">
                    {this.state.cartnumber}
                      <hr></hr>
                  </div>
                </CardBody>     
              </Card>
            </Col>
          </Row>
        </section>
         {Errors}
      </Container>
      </div>
      );
  }
}
export default Cart;
