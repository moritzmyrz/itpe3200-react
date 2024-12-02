import { z } from 'zod';

export const foodItemSchema = z.object({
	name: z
		.string()
		.min(3, 'Name must be at least 3 characters')
		.max(100, 'Name must not exceed 100 characters'),
	description: z
		.string()
		.min(5, 'Description must be at least 5 characters')
		.max(200, 'Description must not exceed 200 characters'),
	foodCategoryId: z.number().min(1, 'Please select a valid category'),
	calories: z
		.number()
		.min(0, 'Calories must be 0 or more')
		.max(10000, 'Calories must be less than 10,000'),
	protein: z
		.number()
		.min(0, 'Protein must be 0 or more')
		.max(1000, 'Protein must be less than 1,000 grams'),
	fat: z
		.number()
		.min(0, 'Fat must be 0 or more')
		.max(1000, 'Fat must be less than 1,000 grams'),
	carbohydrates: z
		.number()
		.min(0, 'Carbohydrates must be 0 or more')
		.max(1000, 'Carbohydrates must be less than 1,000 grams'),
});
