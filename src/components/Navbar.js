import React from "react";
import "./style.css"
import { connect } from 'react-redux';
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import ProductsList from "./Products";
import image from "./download.jpeg"
import { useState } from "react";

import {useNavigate} from "react-router-dom"

function MyNavbar(props) {
const [log,setlog] = useState(true)
    const { cart } = props;
    const navigate = useNavigate()
const carT = ()=>{
   navigate("./cart")
}
const login= ()=>{
    setlog(!log)
}
const addProduct = ()=>{
    navigate("./admin")
}
let button = log?"Logout":"Login"
console.log("caprt",cart.length)
    return (
        <div> 
        <Navbar bg="light" expand="lg">
            <Container>
              
                <Navbar.Brand>
                    {/* <img
                        src={image}
                        width="50"
                        height="50"
                        // className="d-inline-block align-top"
                        alt=""
                    /> */}
                    <button onClick={addProduct} variant="outline-primary" className="btn btn-warning">Add Product</button>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="right">
                        <Nav.Link >
                            <Button onClick={carT} variant="outline-primary">Cart ({cart.length})</Button>
                        </Nav.Link>
                        <Nav.Link >
                            <Button onClick={login} variant="primary">{button}</Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <ProductsList/>
        </div>
    );
}

const mapStateToProps = (state) => ({
    cart: state,
  });
  
  export default connect(mapStateToProps)(MyNavbar);
// export default MyNavbar;
