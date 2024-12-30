import {base_url} from "../../../Redux/Utils/helper.js";
import {useEffect, useState} from "react";
import {getCategoryList} from "../../../Redux/Reducers/categorySlice.js";
import {useDispatch} from "react-redux";
import useCategorySelector from "../../../Redux/Selectors/useCategorySelector.js";
import {useFormik} from "formik";
import * as Yup from "yup";
import {updateBlog} from "../../../Redux/Reducers/blogSlice.js";
import DynamicToast from "../../../components/DynamicToast.jsx";
import {useNavigate} from "react-router-dom";

export default function BlogEdit() {
  const blog = JSON.parse(localStorage.getItem("singleBlogEdit"));
  const dispatch = useDispatch();
  const {categoryItem} = useCategorySelector();
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(`${base_url}/${blog.imageUrl}`);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');

  const handleShowToast = (message) => {
    setMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
    navigate('/dashboard/blog');
  };

  useEffect(() => {
    dispatch(getCategoryList());
  }, []);

  const handleCategorySelect = (categoryId) => {
    formik.setFieldValue("categoryId", categoryId);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("image", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: blog.title || "",
      content: blog.description || "",
      image: null,
      categoryId: blog.categoryId || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
      image: Yup.mixed().nullable(),
      categoryId: Yup.string().required("Category is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("Id", blog.id);
      formData.append("Title", values.title);
      formData.append("Description", values.content);
      if (values.image) formData.append("Image", values.image); // Add image if changed
      formData.append("CategoryId", values.categoryId);

      dispatch(updateBlog({ formData }))
          .unwrap()
          .then(() => {
            resetForm();
            setImagePreview(null);
            handleShowToast("Blog Has Been Updated");
          })
          .catch((error) => {
            console.error("Failed to update blog:", error);
            handleShowToast("Failed to update blog");
          });
    },
  });

  const renderBlog = () => {
    return (
        <div className="innerBlog">
          <DynamicToast show={showToast} message={message} />
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8">
                <h2>Edit Blog</h2>
              </div>
            </div>
            <div className="blogContext">
              <div className="row">
                <form onSubmit={formik.handleSubmit}>
                  <div className="col-lg-8">
                    <div className="mb-3">
                      <input
                          type="text"
                          className="form-control"
                          name="title"
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
                          className="form-control"
                          name="content"
                          value={formik.values.content}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                      />
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
                            <img src={imagePreview} alt="Preview" />
                        ) : (
                            <p>No image selected</p>
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
                    </div>
                    <div className="categoryBox">
                      <h5>Select Category:</h5>
                      <hr />
                      <div className="categoryDiv">
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
                      <hr />
                      <button className="btn" type="submit">Publish</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  };

  return (
      <>
        {renderBlog()}
      </>
  );
}
