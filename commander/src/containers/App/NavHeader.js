import React from 'react'
import { 
	Nav, 
	Navbar, 
	NavItem, 
	NavDropdown, 
	MenuItem 
} from 'react-bootstrap'

import { history } from '../../store'

const NavHeader = (props) => (
	<Navbar inverse collapseOnSelect>
		<Navbar.Header>
			<Navbar.Brand>
				<a>Welcome</a>
			</Navbar.Brand>
			<Navbar.Toggle />
		</Navbar.Header>
		<Navbar.Collapse>
			<Nav>
				<NavItem eventKey={1} onClick={() => history.push('/')}>Home</NavItem>
				<NavItem eventKey={2} onClick={() => history.push('/game')}>Game</NavItem>
				<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
					<MenuItem eventKey={3.1}>Bullshit #1</MenuItem>
					<MenuItem eventKey={3.2}>Bullshit #2</MenuItem>
					<MenuItem eventKey={3.3}>Bullshit #3</MenuItem>
					<MenuItem divider />
					<MenuItem eventKey={3.3}>Separated link</MenuItem>
				</NavDropdown>
			</Nav>
			<Nav pullRight>
				<NavItem eventKey={1} onClick={() => history.push('/about-us')}>About Us</NavItem>
				<NavItem eventKey={2}>Support</NavItem>
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)
export default NavHeader