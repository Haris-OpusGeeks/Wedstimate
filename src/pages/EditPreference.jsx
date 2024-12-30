import { useDispatch } from "react-redux";
import { getMyPreference, updateMyPreference } from "../Redux/Reducers/preferenceSlice";
import usePreferenceSelector from "../Redux/Selectors/usePreferenceSelector";
import { useCallback, useEffect, useState } from "react";
import { getCategoryPreferencesList } from "../Redux/Reducers/categorySlice";
import useCategorySelector from "../Redux/Selectors/useCategorySelector";
import { useFormik } from "formik";
import * as Yup from 'yup';
import DynamicToast from '../components/DynamicToast';
import {base_url} from "../Redux/Utils/helper.js";
import Autocomplete from "react-google-autocomplete";
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import defaultImg from "../assets/default.jpg";
import L from "leaflet";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
// import {Autocomplete, useLoadScript} from "@react-google-maps/api";



const ImageSlider = ({ images }) => (
    images.length > 1 ? (
        <Swiper spaceBetween={0} slidesPerView={1} modules={[Navigation]} navigation>
          {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                    src={image !== defaultImg ? `${base_url}/${image}` : defaultImg}
                    alt={`Image ${index + 1}`}
                    style={{ width: '100%', height: 'auto' }}
                />
              </SwiperSlide>
          ))}
        </Swiper>
    ) : (
        <img
            src={images[0] !== defaultImg ? `${base_url}/${images[0]}` : defaultImg}
            alt="Vendor"
            style={{ width: '100%', height: 'auto' }}
        />
    )
);

const MapDisplay = ({ position }) => {
  if (!position || position.length !== 2 || position.includes(null) || position.includes(undefined)) {
    return null; // Do not render the map if position is invalid
  }

  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  return (
      <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={DefaultIcon} />
      </MapContainer>
  );
};
export default function EditPreference() {
  const dispatch = useDispatch();
  const { preferenceItem: { preference, isLoading } } = usePreferenceSelector();
  const { categoryPreferencesItem: { categoryPreferences } } = useCategorySelector();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');

  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  const handleAddressChange = (place) => {
    if (place && place.geometry) {
      const location = place.geometry.location;
      console.log(place);
      setLat(location.lat());
      setLon(location.lng());
      formik.setFieldValue('address', place.formatted_address);
      formik.setFieldValue('Lat', location.lat());
      formik.setFieldValue('Lon', location.lng());
    }
  };

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

  useEffect(() => {
    const fetchPreference = async () => {
      await dispatch(getMyPreference());
    };
    
    fetchPreference();
    console.log(preference);
  }, [dispatch]);

  useEffect(() => {
    if (preference) {
      localStorage.setItem('preference', JSON.stringify(preference));
      dispatch(getCategoryPreferencesList(preference.categoryId));

      // Set selected preferences and images
      setSelectedPreferences(preference.selectedPreferences || []);
      const vendorImages = (preference.imageUrls || []).map((url) => ({
        src: `${base_url}/${url}`,
        isVendorImage: true,
      }));
      setSelectedImages(vendorImages);
    }
  }, [preference, dispatch]);


  const handlePillClick = (preferenceId) => {
    setSelectedPreferences((prev) => {
      if (prev.includes(preferenceId)) {
        return prev.filter(id => id !== preferenceId);
      } else {
        return [...prev, preferenceId];
      }
    });
  };

  const handleImageRemove = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    // Optionally, update formik values for uploaded files
    formik.setFieldValue(
        'files',
        selectedImages.filter((img, i) => !img.isVendorImage && i !== index).map((img) => img.file)
    );
  };


  const handleImageAdd = (event) => {
    const filesArray = Array.from(event.currentTarget.files);
    const userUploadedImages = filesArray.map((file) => ({
      src: URL.createObjectURL(file),
      file, // Keep the file object for submission
      isVendorImage: false,
    }));
    setSelectedImages((prevImages) => [...prevImages, ...userUploadedImages]);
    formik.setFieldValue('files', [...formik.values.files, ...filesArray]);
  };


  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    // address: Yup.string().required('Address is required'),
    price: Yup.number().required('Price is required').positive('Price must be a positive number'),
    websiteUrl: Yup.string().required('Website URL is required'),
    description: Yup.string().required('Description is required'),
    zipCode: Yup.string().required('zipcode is required'),
    files: Yup.array().of(
        Yup.mixed()
            .test('fileSize', 'File too large', value => !value || (value.size <= 5 * 1024 * 1024))
            .test('fileType', 'Unsupported File Format', value => !value || ['image/jpeg', 'image/png'].includes(value.type))
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: preference?.name || '',
      address: preference?.address || '',
      price: preference?.price || '',
      websiteUrl: preference?.websiteUrl || '',
      description: preference?.description || '',
      zipCode: preference?.ZipCode || '',
      files: [], // Use an array to store multiple files
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('Price', values.price);
      formData.append('Name', values.name);
      formData.append('WebsiteUrl', values.websiteUrl);
      values.files.forEach(file => formData.append("Images", file));
      formData.append('Description', values.description);
      formData.append('ZipCode', values.zipCode);
      formData.append('SelectedPreferences', selectedPreferences.join(','));
      formData.append("Address", values.address);
      // formData.append("Lat", lat);
      // formData.append("Lon", lon);

      try {
        await dispatch(updateMyPreference(formData)).unwrap(); // Use unwrap() to get the actual result
        onDone('Preferences updated successfully!');
        window.location.reload();
      } catch (error) {
        console.error('Error updating preferences:', error);
        onDone('Failed to update preferences. Please try again.');
      }
    },
    enableReinitialize: true,
  });
  

  const renderCategorySection = useCallback((category, index) => (
    <div className="categorySec mb-3" key={index}>
      <h4>{category.title}</h4>
      <div className="pillsContainer d-flex column-gap-4">
        {category.data.map((item) => (
          <div
            key={`pill-${item.preferenceId}`}
            className={`pill border border-primary p-2 rounded-pill ps-3 pe-3 ${selectedPreferences.includes(item.preferenceId) ? 'selected bg-primary' : ''}`}
            onClick={() => handlePillClick(item.preferenceId)}
          >
            {item.preferenceName}
          </div>
        ))}
      </div>
    </div>
  ), [selectedPreferences]);

  const renderCategories = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    } else if (!categoryPreferences || !Array.isArray(categoryPreferences) || categoryPreferences.length === 0) {
      return <p>No categories found</p>;
    } else {
      return categoryPreferences.map((category) => renderCategorySection(category));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  if (!preference) {
    return <div>No preference data available.</div>; // Handle the case where preference is null or undefined
  }

  return (
    <div className="editPreferncePage">
      <DynamicToast show={showToast} message={message} />
      <div className="container-fluid">
        <div className="blueBanner">
          <div className="textBox">
            <h2>Update Your Preference</h2>
          </div>
        </div>
        <div className="editPreference">
          <form onSubmit={formik.handleSubmit}>
            {/* Existing fields */}
            <div className="mb-3 d-flex column-gap-4">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && formik.touched.name && (
                  <div className="text-danger">{formik.errors.name}</div>
                )}
              </div>
              <div className="form-group flex-auto">
                <label htmlFor="address">Address</label>
                <Autocomplete
                    apiKey={"AIzaSyDmKL3Ceh_HNgsYhuBGvQn0Kngc2EDAlFc"}
                    onPlaceSelected={handleAddressChange}
                    className="form-control"
                    defaultValue={formik.values.address}
                    options={{
                      componentRestrictions : {country : "US"},
                      types:['geocode', 'establishment']
                    }}
                    libraries={["places"]}
                />
                {formik.errors.address && formik.touched.address && (
                    <div className="text-danger">{formik.errors.address}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  name="price"
                  id="price"
                  className="form-control"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
                {formik.errors.price && formik.touched.price && (
                  <div className="text-danger">{formik.errors.price}</div>
                )}
              </div>
            </div>
            <div className="mb-3 d-flex column-gap-4">
              <div className="form-group">
                {selectedImages.length > 0 ? (
                    <div className="image-grid">
                      {selectedImages.map((image, index) => (
                          <div key={index} className="image-container">
                            <img
                                src={image.src}
                                alt={`Image ${index + 1}`}
                                className="img-fluid"
                            />
                            <button
                                type="button"
                                className="remove-image-btn btn btn-danger"
                                onClick={() => handleImageRemove(index)}
                            >
                              &times;
                            </button>
                          </div>
                      ))}
                      <div className="image-upload-box">
                        <label htmlFor="file" className="plus-icon">+</label>
                        <input
                            type="file"
                            id="file"
                            className="form-control"
                            multiple
                            onChange={handleImageAdd}
                            style={{display: 'none'}}
                        />
                      </div>
                    </div>
                ) : (
                    <div className="image-upload-box">
                      <label htmlFor="file" className="plus-icon">+</label>
                      <input
                          type="file"
                          id="file"
                          className="form-control"
                          multiple
                          onChange={handleImageAdd}
                          style={{display: 'none'}}
                      />
                    </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    id="description"
                    className="form-control"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                ></textarea>
                {formik.errors.description && formik.touched.description && (
                    <div className="text-danger">{formik.errors.description}</div>
                )}
              </div>
            </div>
            <div className="mb-3 d-flex column-gap-4">
              <div className="form-group">
                <label htmlFor="websiteUrl">Website URL</label>
                <input
                    name="websiteUrl"
                    id="websiteUrl"
                    className="form-control"
                    value={formik.values.websiteUrl}
                    onChange={formik.handleChange}
                />
                {formik.errors.websiteUrl && formik.touched.websiteUrl && (
                    <div className="text-danger">{formik.errors.websiteUrl}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <input
                    name="zipCode"
                    id="zipCode"
                    className="form-control"
                    value={formik.values.zipCode}
                    onChange={formik.handleChange}
                />
                {formik.errors.zipCode && formik.touched.zipCode && (
                    <div className="text-danger">{formik.errors.zipCode}</div>
                )}
              </div>

            </div>

            {/* Render categories */}
            {renderCategories()}

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            {selectedImages.length > 0 && (
                <Link to={"/categories/vendor/dashboard"} className={"btn btn-primary"}>
                  Go To Dashboard
                </Link>
            )}
          </form>
        </div>
        {preference && preference.name && preference.address && preference.price && selectedImages.length > 0 && (
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse"
                          data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    View Your Profile
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <div className={"d-flex flex-column"}>
                      <div className={"vendorView"}>
                        <ImageSlider images={preference.imageUrls} />
                        <h3>{preference.name}</h3>
                        <h4>${preference.price}</h4>
                        <p>{preference.description}</p>
                        <MapDisplay position={[preference.lat, preference.lon]} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
    </div>
  );
}
