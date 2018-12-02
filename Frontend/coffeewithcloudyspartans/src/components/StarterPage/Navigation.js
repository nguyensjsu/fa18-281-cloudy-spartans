import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import './Navigation.css'

//create the Navbar Component
class Navigation extends Component {
    constructor(props){
        super(props);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        localStorage.clear()
    }
    render(){
        let navLogin = null;
        let USERTYPE = "traveler"
        if(USERTYPE==="traveler"){
            console.log("Able to read cookie");
            let tripsboard =(
              <li class="nav-item nav-link lower" >
                   <li ><Link to="/tripsboard"><p>Trips Board</p><span class="sr-only">(current)</span></Link></li>
            </li>)
           navLogin = (
               <li class="nav-item dropdown ">
                <a class="nav-link dropdown-toggle lower " href="Dashboard" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Srinivas
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                     <a class="dropdown-item "><Link to="/inbox" >My Orders</Link></a>
                     <a class="dropdown-item" ><Link to="/tripsboard">My Cart</Link></a>
                     <a class="dropdown-item" ><Link to="/traveller/accounty">Payments</Link></a>
                     <a class="dropdown-item" ><Link to="#">Account</Link></a>
                </div>
                </li>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
           navLogin = (
                   <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle lower" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     <p class="backwhite"> Login </p>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" ><Link to="/login">Traveler Login</Link></a>
                        <a class="dropdown-item" ><Link to="/owner/login">Owner Login</Link></a>
                    </div>
                </li>
            )

        }// end of else
        
        return(
            <div >          
            <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
                <a class="navbar-brand" href="/home"><img alt="HomeAway birdhouse" class="site-header-birdhouse__image " role="presentation" src="https://img.icons8.com/ios/50/000000/roman-soldier.png" height="50" width="50"/><p class="Design">&nbsp;&nbsp;CCS</p></a>  

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <img class="addspaceinnavbar" src="https://img.icons8.com/color/50/000000/search.png"></img>
                <div class="">
                <input className="form-control smally searchbar" type="text" placeholder="Search a drink!" name="Company" value={this.props.Company} onChange={this.props.Change}></input>
                </div>
                <div id="navbarNavDropdown" class="navbar-collapse collapse">
                    <ul class="navbar-nav mr-auto">
                    </ul>
                    <ul class="navbar-nav">
                       {navLogin}
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <li class="nav-item">
                        <a class="btn btn-outline-primary bgwhite roundy" href="/owner/login" role="button">Add a Drink</a> 
                        &nbsp; &nbsp; &nbsp; 
                        <a class="site-header-birdhouse lower" href="/home" title="Learn more"><img alt="HomeAway birdhouse" class="site-header-birdhouse__image" role="presentation" src="https://img.icons8.com/doodle/50/000000/coffee-to-go.png"/></a>          
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        )
    }
}

export default Navigation;