import React, { useState } from 'react';
import FoodItemForm from './FoodItemForm';
import FoodItemList from './FoodItemList';

const FoodItemPage = () => {
	const [editingItem, setEditingItem] = useState(null);
	const [refresh, setRefresh] = useState(false);

	const handleEdit = (item) => {
		setEditingItem(item);
	};

	const handleSuccess = () => {
		setEditingItem(null);
		setRefresh((prev) => !prev); // Trigger refresh
	};

	return (
		<div className="mt-4">
			<h1>Food Items</h1>
			<FoodItemList key={refresh} onEdit={handleEdit} />
			<hr />
			<FoodItemForm item={editingItem} onSuccess={handleSuccess} />
		</div>
	);
};

export default FoodItemPage;
