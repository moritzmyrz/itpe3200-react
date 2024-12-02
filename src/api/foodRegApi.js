import axios from 'axios';

const BASE_URL = 'http://localhost:5222/api'; // Replace with your API URL

// FoodCategory API
export const getAllFoodCategories = async () => {
	return await axios.get(`${BASE_URL}/FoodCategories`);
};

export const getFoodCategoryById = async (id) => {
	return await axios.get(`${BASE_URL}/FoodCategories/${id}`);
};

export const createFoodCategory = async (category) => {
	return await axios.post(`${BASE_URL}/FoodCategories`, category);
};

export const updateFoodCategory = async (id, categoryData) => {
	return await axios.put(`${BASE_URL}/FoodCategories/${id}`, categoryData);
};

export const deleteFoodCategory = async (id) => {
	return await axios.delete(`${BASE_URL}/FoodCategories/${id}`);
};

// FoodItem API
export const getAllFoodItems = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/FoodItems`);
		console.log('Food Items API Response:', response.data);
		return response.data; // Ensure you're returning `response.data`
	} catch (error) {
		console.error('Error fetching food items:', error);
		throw error; // Throw the error so it can be handled by the calling function
	}
};

export const getFoodItemById = async (id) => {
	return await axios.get(`${BASE_URL}/FoodItems/${id}`);
};

export const createFoodItem = async (item) => {
	return await axios.post(`${BASE_URL}/FoodItems`, item);
};

export const updateFoodItem = async (id, item) => {
	return await axios.put(`${BASE_URL}/FoodItems/${id}`, item);
};

export const deleteFoodItem = async (id) => {
	return await axios.delete(`${BASE_URL}/FoodItems/${id}`);
};

export const fetchFoodCategories = async () => {
	const response = await fetch('http://localhost:5222/api/FoodCategories');
	if (!response.ok) {
		throw new Error(`Failed to fetch categories: ${response.statusText}`);
	}
	return response.json();
};
