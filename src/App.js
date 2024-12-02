import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import FoodCategoryPage from './pages/FoodCategoryPage';
import FoodItemPage from './pages/FoodItemPage';

const App = () => {
	return (
		<Router>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Container>
					<Navbar.Brand href="#">Food Reg App</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/food-categories">
							Food Categories
						</Nav.Link>
						<Nav.Link as={Link} to="/food-items">
							Food Items
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
			<Container>
				<Routes>
					<Route
						path="/food-categories"
						element={<FoodCategoryPage />}
					/>
					<Route path="/food-items" element={<FoodItemPage />} />
					<Route
						path="/"
						element={<h1>Welcome to Food Reg App</h1>}
					/>
				</Routes>
			</Container>
		</Router>
	);
};

export default App;
