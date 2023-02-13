import {
    Nav,
    NavItem,
    NavLink,
    Navbar
} from 'reactstrap'


const NavBar = () => {
    return (
        <>
           <Navbar color='dark'>
                <Nav pills> 
                   <NavItem>
                      <NavLink active href='/Home'>Home</NavLink>  
                    </NavItem> 
                   <NavItem>
                      <NavLink href='/Home'>SF/Bay Area</NavLink>  
                    </NavItem> 
                   <NavItem>
                      <NavLink href='/Home'>Los Angeles</NavLink>  
                    </NavItem> 
                    <NavItem>
                        <NavLink href='/About'>New York</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href='/Contact'>Contact</NavLink>
                    </NavItem>
                </Nav>
           </Navbar>
        </>

    )
}

export default NavBar