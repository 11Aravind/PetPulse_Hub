import React from 'react';
import PropTypes from 'prop-types';

const CategoryFormFields = ({ formData, mainCategories, onInputChange, onImageChange }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        {/* Main Category */}
        <div className="sm:col-span-3">
          <label htmlFor="mainCategory" className="block text-sm font-medium text-gray-700">
            Main Category <span className="text-red-500">*</span>
          </label>
          <select
            id="mainCategory"
            name="mainCategory"
            value={formData.mainCategory}
            onChange={onInputChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            required
          >
            <option value="">Select a category</option>
            {mainCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Category Name */}
        <div className="sm:col-span-3">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={onInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., Dog Food, Cat Toys"
            required
          />
        </div>
        
        {/* Subcategory */}
        <div className="sm:col-span-3">
          <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
            Subcategory (Optional)
          </label>
          <input
            type="text"
            id="subCategory"
            name="subCategory"
            value={formData.subCategory}
            onChange={onInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., Dry Food, Interactive Toys"
          />
        </div>
        
        {/* Image Upload */}
        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">
            Category Image
          </label>
          <div className="mt-1 flex items-center">
            <label className="cursor-pointer">
              <span className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formData.image ? 'Change Image' : 'Upload Image'}
              </span>
              <input
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={onImageChange}
              />
            </label>
            {!formData.image && !formData.imagePreview && (
              <span className="ml-4 text-sm text-gray-500">
                No file chosen
              </span>
            )}
            {(formData.image || formData.imagePreview) && (
              <span className="ml-4 text-sm text-gray-700">
                {formData.image?.name || 'Current image selected'}
              </span>
            )}
          </div>
          
          {/* Image Preview */}
          {(formData.imagePreview) && (
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
    </div>
  );
};

CategoryFormFields.propTypes = {
  formData: PropTypes.shape({
    mainCategory: PropTypes.string,
    category: PropTypes.string,
    subCategory: PropTypes.string,
    image: PropTypes.object,
    imagePreview: PropTypes.string
  }).isRequired,
  mainCategories: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired
};

export default CategoryFormFields;
