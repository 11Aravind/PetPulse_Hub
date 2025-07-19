import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { httpRequest } from '../../../API/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import FormField from '../../ui/FormField';

const CategoryForm = ({ isEdit = false }) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    mainCategory: '',
    category: '',
    subCategory: '',
    image: null,
    imagePreview: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available main categories
  const mainCategories = [
    { value: 'Pet', label: 'Pet' },
    { value: 'Food', label: 'Pet Food' },
    { value: 'Accessory', label: 'Accessories' },
    { value: 'Medicine', label: 'Medicine' },
    { value: 'Grooming', label: 'Grooming' },
    { value: 'Toys', label: 'Toys' },
    { value: 'Supplies', label: 'Supplies' },
  ];

  // Fetch category details for editing
  useEffect(() => {
    if (!isEdit || !categoryId) return;

    const fetchCategory = async () => {
      setIsLoading(true);
      try {
        const data = await httpRequest('get', `api/category/${categoryId}`);
        if (data?.category) {
          const { mainCategory, category, subCategory, imageUrl } = data.category;
          setFormData(prev => ({
            ...prev,
            mainCategory,
            category,
            subCategory,
            imagePreview: imageUrl || ''
          }));
        }
      } catch (error) {
        console.error('Error fetching category:', error);
        toast.error('Failed to load category details');
        navigate('/category');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId, isEdit, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.mainCategory || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('mainCategory', formData.mainCategory);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('subCategory', formData.subCategory || '');
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      
      if (isEdit && categoryId) {
        formDataToSend.append('categoryId', categoryId);
        const response = await httpRequest('post', 'api/category/updateCategory', formDataToSend);
        if (response.status === 'success') {
          toast.success('Category updated successfully!');
        } else {
          const response = await httpRequest('post', 'api/category/add', formDataToSend);
          if (response.status === 'success') {
            toast.success('Category created successfully!');
          }
        }
      }
      
      navigate('/category');
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error(error.response?.data?.message || 'An error occurred while saving the category');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/category');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Card 
      title={isEdit ? 'Update Category' : 'Add New Category'}
      subtitle={isEdit ? 'Update the category details below' : 'Enter the category details below'}
      className="max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <FormField
            label="Main Category"
            name="mainCategory"
            value={formData.mainCategory}
            onChange={handleInputChange}
            select
            required
          >
            <option value="">Select a category</option>
            {mainCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </FormField>

          <FormField
            label="Category Name"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="e.g., Dog Food, Cat Toys"
            required
          />

          <FormField
            label="Subcategory (Optional)"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleInputChange}
            placeholder="e.g., Dry Food, Interactive Toys"
          />

          <div className="sm:col-span-2">
            <FormField
              label="Category Image"
              name="image"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              placeholder="Upload an image"
            />
            {formData.imagePreview && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Preview:</p>
                <div className="w-32 h-32 border border-gray-200 rounded-md overflow-hidden">
                  <img
                    src={formData.imagePreview}
                    alt="Category preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isEdit ? 'Update Category' : 'Create Category'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CategoryForm;
