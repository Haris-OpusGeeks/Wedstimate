import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createBlog } from "../../../Redux/Reducers/blogSlice.js";
import {getCategoryList} from "../../../Redux/Reducers/categorySlice.js";
import useCategorySelector from "../../../Redux/Selectors/useCategorySelector.js";
import DynamicToast from "../../../components/DynamicToast.jsx";

export default function BlogNew() {
  const dispatch = useDispatch();
  const {categoryItem} = useCategorySelector();
  // State to store image preview URL
  const [imagePreview, setImagePreview] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');

  const handleShowToast = (message) => {
    setMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000); // Hide toast after 5 seconds
  };

  useEffect(() => {
    dispatch(getCategoryList());
    console.log(categoryItem);
  }, []);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      image: null,
      categoryId: "", // New field for category
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
      image: Yup.mixed().required("Featured image is required"),
      categoryId: Yup.string().required("Category is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("Title", values.title);
      formData.append("Description", values.content);
      formData.append("Image", values.image);
      formData.append("CategoryId", values.categoryId); // Include category ID in form data

      // Log form data
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Dispatch the action to create the blog
      dispatch(createBlog({ formData }))
          .unwrap()
          .then(() => {
            // Clear the form and image preview after successful submission
            resetForm();  // Reset form fields
            setImagePreview(null);  // Clear image preview
            handleShowToast("Blog Has Been Created");
          })
          .catch((error) => {
            console.error("Failed to create blog:", error);
            handleShowToast("Failed to create blog");
          });
    },
  });

  // Handle category selection (only one can be selected)
  const handleCategorySelect = (categoryId) => {
    formik.setFieldValue("categoryId", categoryId); // Set selected category ID
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("image", file);

    // Generate image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);  // Set image preview URL
      };
      reader.readAsDataURL(file);  // Read file as Data URL
    }
  };

  return (
      <div className="innerBlog">
        <DynamicToast show={showToast} message={message} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <h2>Add New Blog</h2>
            </div>
          </div>
          <div className="blogContext">
            <div className="row">
              <form onSubmit={formik.handleSubmit}>
                <div className="col-lg-8">
                  <div className="mb-3">
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Enter Title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="error">{formik.errors.title}</div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea
                        name="content"
                        className="form-control"
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.content && formik.errors.content ? (
                        <div className="error">{formik.errors.content}</div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="imageUploadBox">
                    <h5>Featured Image</h5>
                    <div className="preview">
                      {imagePreview ? (
                          <img src={imagePreview} alt="Preview" className="img-fluid" />
                      ) : (
                          <p>No image uploaded</p>
                      )}
                    </div>
                    <input
                        className="d-none"
                        type="file"
                        name="image"
                        id="uploadImage"
                        accept="image/jpeg, image/png"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="uploadImage" className="btn">Upload</label>
                    {formik.touched.image && formik.errors.image ? (
                        <div className="error">{formik.errors.image}</div>
                    ) : null}
                  </div>
                  <div className="categoryBox">
                    <h5>Select Category:</h5>
                    <hr/>
                    <div className={"categoryDiv"}>
                      {categoryItem.categories.map((category) => (
                          <div key={category.id} className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="category"
                                value={category.id}
                                checked={formik.values.categoryId === category.id}
                                onChange={() => handleCategorySelect(category.id)}
                                id={`category-${category.id}`}
                            />
                            <label className="form-check-label" htmlFor={`category-${category.id}`}>
                              {category.name}
                            </label>
                          </div>
                      ))}
                      {formik.touched.categoryId && formik.errors.categoryId ? (
                          <div className="error">{formik.errors.categoryId}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="publishBox">
                    <h5>Publish:</h5>
                    <hr/>
                    <button className="btn" type="submit">Publish</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}
