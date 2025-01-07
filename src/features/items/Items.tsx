// src/features/items/ItemsPage.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, deleteItem as deleteItemAction } from './itemsSlice';
import { RootState, AppDispatch } from '../../store';
import { useFetchItems, useAddItem, useUpdateItem, useDeleteItem } from './itemsApi';
import { useQueryClient } from '@tanstack/react-query';
import styles from './ItemsPage.module.css';

const ItemsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.items);

  const queryClient = useQueryClient();
  const { data: queryItems } = useFetchItems();
  // useFetchItems(); // Trigger the polling mechanism

  const addItemMutation = useAddItem();
  const updateItemMutation = useUpdateItem();
  const deleteItemMutation = useDeleteItem();

  const [editingItem, setEditingItem] = useState<{ id: number; title: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleAddItem = () => {
    setIsLoading(true);
    setLoadingButton('add');
    const newItem = { title: 'New Item' };
    addItemMutation.mutate(newItem, {
      onSettled: () => {
        // onSettled is called regardless of whether the query or mutation was successful or resulted in an error. 
        // It is always called after the request has completed.
        setIsLoading(false);
        setLoadingButton(null);
      },
    });
  };

  const handleUpdateItem = (id: number, title: string) => {
    setIsLoading(true);
    setLoadingButton(`update-${id}`);
    updateItemMutation.mutate({ id, title }, {
      onSettled: () => {
        setIsLoading(false);
        setLoadingButton(null);
        setEditingItem(null);
      },
    });
  };

  const handleDeleteItem = async (id: number) => {
    setIsLoading(true);
    setLoadingButton(`delete-${id}`);

    // Optimistically update the UI
    const previousItems = items;
    dispatch(deleteItemAction(id));
    await queryClient.cancelQueries(['items']);
    queryClient.setQueryData<Item[]>('items', (old) => old?.filter((item) => item.id !== id));

    deleteItemMutation.mutate(id, {
      onSettled: () => {
        setIsLoading(false);
        setLoadingButton(null);
      },
      onError: () => {
        // Revert the change if the mutation fails
        dispatch(fetchItems());
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Items</h1>
      <button onClick={handleAddItem} className={styles.button} disabled={isLoading}>
        Add Item
        {loadingButton === 'add' && <div className={styles.spinner}></div>}
      </button>
      <ul className={styles.list}>
        {(queryItems || items)?.map((item) => (
          <li key={item.id} className={styles.listItem}>
            {editingItem && editingItem.id === item.id ? (
              <>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className={styles.input}
                />
                <div className={styles.buttonGroup}>
                  <button onClick={() => handleUpdateItem(item.id, editingItem.title)} className={styles.saveButton} disabled={isLoading}>
                    Save
                    {loadingButton === `update-${item.id}` && <div className={styles.spinner}></div>}
                  </button>
                  <button onClick={() => setEditingItem(null)} className={styles.cancelButton} disabled={isLoading}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {item.title}
                <div className={styles.buttonGroup}>
                  <button onClick={() => setEditingItem(item)} className={styles.editButton} disabled={isLoading}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteItem(item.id)} className={styles.deleteButton} disabled={isLoading}>
                    Delete
                    {loadingButton === `delete-${item.id}` && <div className={styles.spinner}></div>}
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsPage;
