import React, { useEffect, useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { deleteFoodCategory, fetchFoodCategories } from '../api/foodRegApi';

const FoodCategoryList = ({ onEdit }) => {
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadCategories = async () => {
			try {
				setLoading(true);
				const data = await fetchFoodCategories();
				if (Array.isArray(data)) {
					setCategories(data);
				} else {
					throw new Error('Invalid data format');
				}
			} catch (err) {
				console.error('Error fetching categories:', err);
				setError('Failed to fetch categories.');
			} finally {
				setLoading(false);
			}
		};

		loadCategories();
	}, []);

	const handleDelete = async (categoryId) => {
		try {
			await deleteFoodCategory(categoryId);
			setCategories((prev) =>
				prev.filter(
					(category) => category.foodCategoryId !== categoryId
				)
			);
		} catch (err) {
			console.error('Failed to delete category:', err);
			setError('Failed to delete category.');
		}
	};

	if (loading) {
		return (
			<div className="text-center">
				<Spinner animation="border" variant="primary" />
				<p>Loading categories...</p>
			</div>
		);
	}

	if (error) {
		return <Alert variant="danger">{error}</Alert>;
	}

	if (!categories.length) {
		return <div className="text-muted">No categories available.</div>;
	}

	return (
		<div>
			<h2>Food Categories</h2>
			<ul className="list-group">
				{categories.map((category) => (
					<li
						key={category.foodCategoryId}
						className="list-group-item"
					>
						<div className="d-flex justify-content-between align-items-center">
							<span>{category.name}</span>
							<div>
								<Button
									variant="warning"
									onClick={() => onEdit(category)} // Pass the full category object to the edit handler
								>
									Edit
								</Button>
								<Button
									variant="danger"
									onClick={() =>
										handleDelete(category.foodCategoryId)
									}
								>
									Delete
								</Button>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FoodCategoryList;
