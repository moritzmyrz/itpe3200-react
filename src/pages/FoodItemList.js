import React, { useEffect, useState } from 'react';
import { Alert, Button, Spinner, Table } from 'react-bootstrap';
import {
	deleteFoodItem,
	fetchFoodCategories,
	getAllFoodItems,
} from '../api/foodRegApi';

const FoodItemList = ({ onEdit }) => {
	const [items, setItems] = useState([]); // Initialize items
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [itemsData, categoriesData] = await Promise.all([
					getAllFoodItems(),
					fetchFoodCategories(),
				]);

				// Log responses for debugging
				console.log('Items Data:', itemsData);
				console.log('Categories Data:', categoriesData);

				// Ensure data is in array format
				setItems(Array.isArray(itemsData) ? itemsData : []);
				setCategories(
					Array.isArray(categoriesData) ? categoriesData : []
				);
				setError(null);
			} catch (err) {
				console.error('Failed to fetch data:', err);
				setError('Failed to load food items or categories.');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleDelete = async (id) => {
		try {
			await deleteFoodItem(id);
			setItems((prev) => prev.filter((item) => item.foodItemId !== id));
		} catch (err) {
			console.error('Failed to delete item:', err);
			setError('Failed to delete item.');
		}
	};

	const getCategoryName = (id) =>
		categories.find((cat) => cat.foodCategoryId === id)?.name || 'Unknown';

	if (loading) {
		return (
			<div className="text-center">
				<Spinner animation="border" variant="primary" />
				<p>Loading data...</p>
			</div>
		);
	}

	if (error) {
		return <Alert variant="danger">{error}</Alert>;
	}

	if (!items.length) {
		return <div className="text-muted">No food items available.</div>;
	}

	return (
		<div className="container mt-4">
			<h1>Food Items</h1>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Category</th>
						<th>Calories</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr key={item.foodItemId}>
							<td>{item.name}</td>
							<td>{item.description}</td>
							<td>{getCategoryName(item.foodCategoryId)}</td>
							<td>{item.calories}</td>
							<td>
								<Button
									variant="warning"
									className="me-2"
									onClick={() => onEdit(item)}
								>
									Edit
								</Button>
								<Button
									variant="danger"
									onClick={() =>
										handleDelete(item.foodItemId)
									}
								>
									Delete
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default FoodItemList;
