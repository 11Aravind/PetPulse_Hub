import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { httpRequest } from '../API/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await httpRequest('get', 'api/category');
      if (data?.categoryDetails) {
        setCategories(data.categoryDetails);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      setDeleteLoading(true);
      await httpRequest('delete', `api/category/${id}`);
      toast.success('Category deleted successfully');
      fetchCategories(); // Refresh the list
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error(error.response?.data?.message || 'Failed to delete category');
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      key: 'mainCategory',
      title: 'Main Category',
    },
    {
      key: 'category',
      title: 'Category',
    },
    {
      key: 'subCategory',
      title: 'Subcategory',
      render: (value) => value || '—',
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate(`/update-category/${row._id}`)}
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <FiEdit className="mr-1" /> Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDelete(row._id)}
            loading={deleteLoading}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <FiTrash2 className="mr-1" /> Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <Button
          onClick={() => navigate('/add-category')}
          startIcon={<FiPlus />}
        >
          Add New Category
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          data={categories}
          loading={loading}
          emptyMessage="No categories found. Add your first category to get started."
          onRowClick={(row, e) => {
            // Only navigate if the click wasn't on a button or anchor
            if (!e.target.closest('button, a')) {
              navigate(`/update-category/${row._id}`);
            }
          }}
          rowClassName="hover:bg-gray-50 cursor-pointer"
        />
      </Card>
    </div>
  );
};

export default CategoryList;
