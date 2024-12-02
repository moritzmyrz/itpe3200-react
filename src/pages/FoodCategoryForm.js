import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createFoodCategory, updateFoodCategory } from '../api/foodRegApi';

const foodCategorySchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Name must be at least 3 characters' })
		.max(100, { message: 'Name cannot exceed 100 characters' }),
	description: z
		.string()
		.max(200, { message: 'Description must be under 200 characters' })
		.optional(),
});

const FoodCategoryForm = ({ category, onSuccess }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(foodCategorySchema),
		defaultValues: category || {
			name: '',
			description: '',
		},
	});

	React.useEffect(() => {
		if (category) reset(category); // Populate form with the category if editing
	}, [category, reset]);

	const onSubmit = async (data) => {
		try {
			if (category?.foodCategoryId) {
				// PUT request for updating the category
				await updateFoodCategory(category.foodCategoryId, {
					...data, // Only include relevant fields
				});
			} else {
				// POST request for creating a new category
				await createFoodCategory(data);
			}
			onSuccess();
		} catch (err) {
			console.error('Failed to save category:', err);
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
			<Form.Group className="mb-3">
				<Form.Label>Name</Form.Label>
				<Form.Control
					type="text"
					{...register('name')}
					isInvalid={!!errors.name}
				/>
				<Form.Control.Feedback type="invalid">
					{errors.name?.message}
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Description</Form.Label>
				<Form.Control
					as="textarea"
					{...register('description')}
					isInvalid={!!errors.description}
				/>
				<Form.Control.Feedback type="invalid">
					{errors.description?.message}
				</Form.Control.Feedback>
			</Form.Group>
			<Button type="submit" variant="primary" disabled={isSubmitting}>
				{category ? 'Update Category' : 'Create Category'}
			</Button>
		</Form>
	);
};

export default FoodCategoryForm;
