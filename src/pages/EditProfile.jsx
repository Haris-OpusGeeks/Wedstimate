import React, {useState, useEffect, useRef} from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { changePasssword, updateUserProfile, getUserProfile } from '../Redux/Reducers/profileSlice';
import { base_url } from '../Redux/Utils/helper';
import DynamicToast from '../components/DynamicToast';
import AvatarEditor from 'react-avatar-editor';

export default function EditProfile() {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  // const [imagePreview, setImagePreview] = useState('');
  const dispatch = useDispatch();
  const userObject = JSON.parse(localStorage.getItem('user'));
  const [imagePreview, setImagePreview] = useState(null); // Use null to manage preview for AvatarEditor
  const [image, setImage] = useState(null); // Manage the raw image file for AvatarEditor
  const [zoom, setZoom] = useState(1);
  const [editedImage, setEditedImage] = useState(null); // Zoomed and edited image
  const [save, setSave] = useState(true);

  useEffect(() => {
    if (editedImage) {
      console.log('Edited image file:', editedImage);
    }
  }, [editedImage]);

  const handleShowToast = (message) => {
    setMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000); // Hide toast after 5 seconds
  };

  const onDone = (message) => {
    handleShowToast(message);
  };

  const formikProfile = useFormik({
    initialValues: {
      firstName: userObject.firstName || '',
      lastName: userObject.lastName || '',
      image: null, // Initial value for image
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      image: Yup.mixed()
        .test('fileSize', 'File too large', value => !value || (value.size <= 5 * 1024 * 1024))
        .test('fileType', 'Unsupported File Format', value => !value || ['image/jpeg', 'image/png'].includes(value.type)),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData();
      formData.append('FirstName', values.firstName);
      formData.append('LastName', values.lastName);
      formData.append('DeleteCurrentImage', true);
      // if (editedImage) {
        console.log("edited image file:", editedImage);
        formData.append('ProfileImage', editedImage); // Use the zoomed/edited image for submission
      // }

      try {
        await dispatch(updateUserProfile({ formData, onDone }));
        await dispatch(getUserProfile());
        window.location.reload();
      } catch (error) {
        console.error(error);
        onDone('Failed to update profile');
      } finally {
        setSubmitting(false);
      }
    },
  });


  const formikPassword = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Current password is required'),
      newPassword: Yup.string().required('New password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const requestData = {
        password: values.currentPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmPassword
      };

      try {
        await dispatch(changePasssword(requestData));
        onDone('Password changed successfully');
        values.confirmPassword = '';
        values.currentPassword = '';
        values.newPassword = '';
      } catch (error) {
        console.error(error);
        onDone('Failed to change password');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Set preview for AvatarEditor
      // formikProfile.setFieldValue('ProfileImage', file); // Update Formik field value
    }
  };

  const handleZoomChange = (event) => {
    setZoom(parseFloat(event.target.value)); // Update zoom state from range input
  };

  const handleSaveZoomedImage = () => {
    if (editorRef.current) {
      // Get the binary data from the canvas as a Blob
      editorRef.current.getImage().toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "editedImage.jpg", { type: blob.type });
          setEditedImage(file); // Set the File object in the state
          formikProfile.values.image = file;
          setSave(false); // Update state to hide the Save button
        }
      }, 'image/jpeg'); // Optionally, specify the image format (JPEG in this case)
    }
  };


  const editorRef = useRef(null);

  return (
    <div className="container-fluid mt-5 editProfilePage">
      <DynamicToast show={showToast} message={message} />
      <div className="user">
        {/* AvatarEditor for Image Editing */}
        {imagePreview ? (
            <>
              <AvatarEditor
                  ref={editorRef}
                  image={imagePreview}
                  width={150}
                  height={150}
                  border={50}
                  scale={zoom} // Control the zoom level
                  className="img-thumbnail"
              />
              <div className="zoom-slider">
                <label htmlFor="zoom" className="form-label">Zoom</label>
                <input
                    type="range"
                    id="zoom"
                    name="zoom"
                    min="1"
                    max="5"
                    step="0.1"
                    value={zoom}
                    onChange={handleZoomChange}
                />
              </div>
              <button onClick={handleSaveZoomedImage} className={`btn btn-primary mt-2 ${save ? `d-flex` : `d-none`}`}>
                Save Image
              </button>
            </>
        ) : (
            <img
                src={`${base_url}/${userObject.imageUrl}`}
                alt="Profile"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
        )}
        <h3>{userObject.fullName}</h3>
      </div>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Edit Profile
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <form onSubmit={formikProfile.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    onChange={formikProfile.handleChange}
                    value={formikProfile.values.firstName}
                  />
                  {formikProfile.touched.firstName && formikProfile.errors.firstName ? (
                    <div className="text-danger">{formikProfile.errors.firstName}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    onChange={formikProfile.handleChange}
                    value={formikProfile.values.lastName}
                  />
                  {formikProfile.touched.lastName && formikProfile.errors.lastName ? (
                    <div className="text-danger">{formikProfile.errors.lastName}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Profile Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                  {formikProfile.touched.image && formikProfile.errors.image ? (
                    <div className="text-danger">{formikProfile.errors.image}</div>
                  ) : null}
                </div>
                <button type="submit" className="btn btn-primary" disabled={formikProfile.isSubmitting}>Save</button>
              </form>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Change Password
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <form onSubmit={formikPassword.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="currentPassword" className="form-label">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    className="form-control"
                    onChange={formikPassword.handleChange}
                    value={formikPassword.values.currentPassword}
                  />
                  {formikPassword.touched.currentPassword && formikPassword.errors.currentPassword ? (
                    <div className="text-danger">{formikPassword.errors.currentPassword}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    onChange={formikPassword.handleChange}
                    value={formikPassword.values.newPassword}
                  />
                  {formikPassword.touched.newPassword && formikPassword.errors.newPassword ? (
                    <div className="text-danger">{formikPassword.errors.newPassword}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    onChange={formikPassword.handleChange}
                    value={formikPassword.values.confirmPassword}
                  />
                  {formikPassword.touched.confirmPassword && formikPassword.errors.confirmPassword ? (
                    <div className="text-danger">{formikPassword.errors.confirmPassword}</div>
                  ) : null}
                </div>
                <button type="submit" className="btn btn-primary" disabled={formikPassword.isSubmitting}>Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* {showToast && <div className="toast show">{message}</div>} */}
    </div>
  );
}
