import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
	createFoodItem,
	fetchFoodCategories,
	updateFoodItem,
} from '../api/foodRegApi';

const foodItemSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters').max(100),
	description: z
		.string()
		.max(200, 'Description must be under 200 characters'),
	foodCategoryId: z.string().regex(/^\d+$/, 'Select a valid category'),
	calories: z.number().nonnegative('Calories cannot be negative').max(10000),
	protein: z.number().nonnegative('Protein cannot be negative').max(1000),
	fat: z.number().nonnegative('Fat cannot be negative').max(1000),
	carbohydrates: z
		.number()
		.nonnegative('Carbohydrates cannot be negative')
		.max(1000),
});

const FoodItemForm = ({ item, onSuccess }) => {
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(null);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(foodItemSchema),
		defaultValues: item
			? {
					...item,
					foodCategoryId: String(item.foodCategoryId), // Ensure foodCategoryId is a string
			  }
			: {
					name: '',
					description: '',
					foodCategoryId: '',
					calories: 0,
					protein: 0,
					fat: 0,
					carbohydrates: 0,
			  },
	});

	useEffect(() => {
		if (item)
			reset({ ...item, foodCategoryId: String(item.foodCategoryId) });
	}, [item, reset]);

	useEffect(() => {
		const loadCategories = async () => {
			try {
				const data = await fetchFoodCategories();
				setCategories(data);
			} catch (err) {
				console.error('Failed to fetch categories:', err);
				setError('Failed to load categories.');
			}
		};

		loadCategories();
	}, []);

	const onSubmit = async (data) => {
		try {
			if (item) {
				await updateFoodItem(item.foodItemId, {
					...data,
					foodCategoryId: parseInt(data.foodCategoryId, 10), // Convert back to number
				});
			} else {
				await createFoodItem({
					...data,
					foodCategoryId: parseInt(data.foodCategoryId, 10), // Convert back to number
				});
			}
			onSuccess();
		} catch (err) {
			console.error('Failed to save item:', err);
		}
	};

	if (error) {
		return <Alert variant="danger">{error}</Alert>;
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
			<Form.Group className="mb-3">
				<Form.Label>Name</Form.Label>
				<Form.Control type="text" {...register('name')} />
				{errors.name && (
					<Alert variant="danger">{errors.name.message}</Alert>
				)}
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Description</Form.Label>
				<Form.Control as="textarea" {...register('description')} />
				{errors.description && (
					<Alert variant="danger">{errors.description.message}</Alert>
				)}
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Category</Form.Label>
				<Form.Select {...register('foodCategoryId')}>
					<option value="">Select a Category</option>
					{categories.map((cat) => (
						<option
							key={cat.foodCategoryId}
							value={String(cat.foodCategoryId)}
						>
							{cat.name}
						</option>
					))}
				</Form.Select>
				{errors.foodCategoryId && (
					<Alert variant="danger">
						{errors.foodCategoryId.message}
					</Alert>
				)}
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Calories</Form.Label>
				<Form.Control
					type="number"
					{...register('calories', { valueAsNumber: true })}
				/>
				{errors.calories && (
					<Alert variant="danger">{errors.calories.message}</Alert>
				)}
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Protein (g)</Form.Label>
				<Form.Control
					type="number"
					{...register('protein', { valueAsNumber: true })}
				/>
				{errors.protein && (
					<Alert variant="danger">{errors.protein.message}</Alert>
				)}
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Fat (g)</Form.Label>
				<Form.Control
					type="number"
					{...register('fat', { valueAsNumber: true })}
				/>
				{errors.fat && (
					<Alert variant="danger">{errors.fat.message}</Alert>
				)}
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Carbohydrates (g)</Form.Label>
				<Form.Control
					type="number"
					{...register('carbohydrates', { valueAsNumber: true })}
				/>
				{errors.carbohydrates && (
					<Alert variant="danger">
						{errors.carbohydrates.message}
					</Alert>
				)}
			</Form.Group>
			<Button type="submit" variant="primary">
				{item ? 'Update Item' : 'Create Item'}
			</Button>
		</Form>
	);
};

export default FoodItemForm;
