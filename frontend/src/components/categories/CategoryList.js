import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';

// Import individual components
import Category from './Category';

// Import Bootstrap components
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';

// Import individual hooks
import useAuth from '../../hooks/useAuth';
import useFlash from '../../hooks/useFlash';

// Import services
import categoryService from '../../services/categoryService';

function CategoryList() {
    // Use state to store categories
    const [categories, setCategories] = useState([]);

    // Use hooks for authentication token
    const auth = useAuth();
    const flash = useFlash();
    const location = useLocation();

    // Fetch categories, using useCallback to memoize function copy of getCategories
    // rather than creating a new copy every time
    const getCategories = useCallback(async () => {
        const newCategories = await categoryService.getCategories(auth.token);
        setCategories([...newCategories]);
    }, [auth.token]);

    // "Lift state up" by handling delete in parent component,
    // using useCallback to memoize function copy rather than creating new copy
    const handleDelete = useCallback(async (categoryId) => {
        try {
            // Make the API call to delete.
            await categoryService.deleteCategory(auth.token, categoryId);
            flash.flashMessage('Successfully deleted category!', 'success');

            // Need to refresh set of categories
            getCategories();
        } catch (err) {
            flash.flashMessage(err.message, 'danger');
        }
    }, [auth.token, flash, getCategories]);

    // On mount, need to fetch categories
    useEffect(() => {
        getCategories();
    }, [getCategories]);

    return (
        <Stack gap={4} className="align-items-center justify-content-center">
            <ListGroup className="w-100">
                {categories.map(category => (
                    <Category category={category} key={category.id} onDelete={handleDelete} />
                ))}
            </ListGroup>
            <Link className="btn btn-primary rounded w-25 mx-auto" to="/categories/add" state={{ from: location }}>
                Add Category
            </Link>
        </Stack>
    );
}

export default CategoryList;
