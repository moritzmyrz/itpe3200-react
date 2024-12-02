import React, { useState } from 'react';
import FoodCategoryForm from './FoodCategoryForm';
import FoodCategoryList from './FoodCategoryList';

const FoodCategoryPage = () => {
	const [editingCategory, setEditingCategory] = useState(null);
	const [refresh, setRefresh] = useState(false);

	const handleEdit = (category) => {
		setEditingCategory(category);
	};

	const handleSuccess = () => {
		setEditingCategory(null);
		setRefresh((prev) => !prev); // Trigger refresh
	};

	return (
		<div className="mt-4">
			<h1>Food Categories</h1>
			<FoodCategoryList key={refresh} onEdit={handleEdit} />
			<hr />
			<FoodCategoryForm
				category={editingCategory}
				onSuccess={handleSuccess}
			/>
		</div>
	);
};

export default FoodCategoryPage;
