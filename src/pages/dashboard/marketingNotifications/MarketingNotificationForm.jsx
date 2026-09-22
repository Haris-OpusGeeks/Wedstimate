import {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Loader from '../../../components/Loader.jsx';
import {
  createMarketingNotification,
  getListOfMarketingNotifications,
  updateMarketingNotification,
} from '../../../Redux/Reducers/marketingNotificationSlice.js';
import useMarketingNotificationSelector from '../../../Redux/Selectors/useMarketingNotificationSelector.js';
import {getListOfVendors} from '../../../Redux/Reducers/categorySlice.js';
import useCategorySelector from '../../../Redux/Selectors/useCategorySelector.js';
import {getCouples} from '../../../Redux/Reducers/profileSlice.js';
import useProfileSelector from '../../../Redux/Selectors/useProfileSelector.js';
import './MarketingNotifications.scss';

const audienceLabels = {
  0: 'All',
  1: 'Vendors',
  2: 'Couples',
  3: 'Custom',
};

const toLocalDateTime = value => {
  if (!value) return '';
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const hasMeaningfulHtml = value => {
  if (!/<[a-z][\s\S]*>/i.test(value || '')) return false;
  return value.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().length > 0;
};

export default function MarketingNotificationForm() {
  const {id} = useParams();
  const isEditing = Boolean(id);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {notifications, isLoading, isSaving} = useMarketingNotificationSelector();
  const {vendorItem} = useCategorySelector();
  const {couples} = useProfileSelector();
  const customAudienceLoaded = useRef(false);
  const notification =
    location.state?.notification || notifications.find(item => item.id === id);
  const notificationType = location.pathname.includes('/email-notifications/')
    ? 1
    : location.pathname.includes('/app-notifications/')
      ? 2
      : notification?.type || 1;
  const isEmailNotification = notificationType === 1;

  useEffect(() => {
    if (isEditing && !location.state?.notification) {
      dispatch(getListOfMarketingNotifications({}));
    }
  }, [dispatch, isEditing, location.state]);

  const vendorRecords = Array.isArray(vendorItem.vendors)
    ? vendorItem.vendors
    : vendorItem.vendors?.data || vendorItem.vendors?.items || [];
  const coupleRecords = Array.isArray(couples.coupleList)
    ? couples.coupleList
    : couples.coupleList?.data || couples.coupleList?.items || [];
  const audienceOptions = [
    {
      label: 'Vendors',
      options: vendorRecords
        .filter(vendor => vendor.vendorId || vendor.id)
        .map(vendor => ({
          value: vendor.vendorId || vendor.id,
          label: `Vendor — ${vendor.name || 'Unnamed'}${vendor.vendorEmail ? ` (${vendor.vendorEmail})` : ''}`,
        })),
    },
    {
      label: 'Couples',
      options: coupleRecords
        .filter(couple => couple.id)
        .map(couple => ({
          value: couple.id,
          label: `Couple — ${couple.fullName || 'Unnamed'}${couple.email ? ` (${couple.email})` : ''}`,
        })),
    },
  ];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: notification?.title || '',
      subject: notification?.subject || '',
      body: notification?.body || '',
      type: String(notificationType),
      targetAudience: String(notification?.targetAudience ?? 0),
      customUserIds: notification?.customUserIds || [],
      scheduledFor: toLocalDateTime(notification?.scheduledFor),
      isDraft: notification ? notification.status === 1 : true,
    },
    validationSchema: Yup.object({
      title: Yup.string().trim().required('Title is required'),
      subject: Yup.string().trim().required('Subject is required'),
      body: Yup.string()
        .trim()
        .required('Message body is required')
        .when('type', {
          is: type => type === '1',
          then: schema => schema.test(
            'valid-html',
            'Email notifications require HTML content. Use the rich-text editor.',
            hasMeaningfulHtml,
          ),
        }),
      type: Yup.string().oneOf(['1', '2']).required('Type is required'),
      targetAudience: Yup.string()
        .oneOf(['0', '1', '2', '3'])
        .required('Audience is required'),
      customUserIds: Yup.array().when('targetAudience', {
        is: '3',
        then: schema => schema.min(1, 'Select at least one user'),
      }),
      scheduledFor: Yup.string().nullable(),
    }),
    onSubmit: async values => {
      const requestData = {
        ...(isEditing ? {id} : {}),
        title: values.title.trim(),
        subject: values.subject.trim(),
        body: values.body.trim(),
        type: Number(values.type),
        targetAudience: Number(values.targetAudience),
        customUserIds: values.targetAudience === '3' ? values.customUserIds : [],
        scheduledFor: values.scheduledFor
          ? new Date(values.scheduledFor).toISOString()
          : null,
        isDraft: values.isDraft,
      };
      const actionLabel = values.isDraft
        ? 'save this notification as a draft'
        : values.scheduledFor
          ? 'schedule this notification'
          : 'send this notification immediately';

      if (!window.confirm(`Are you sure you want to ${actionLabel}?`)) return;

      try {
        if (isEditing) {
          await dispatch(updateMarketingNotification({id, requestData})).unwrap();
        } else {
          await dispatch(createMarketingNotification(requestData)).unwrap();
        }
        navigate(isEmailNotification ? '/dashboard/email-notifications' : '/dashboard/app-notifications');
      } catch (error) {
        // The slice and shared error handler expose the API error to the user.
      }
    },
  });

  useEffect(() => {
    if (formik.values.targetAudience === '3' && !customAudienceLoaded.current) {
      customAudienceLoaded.current = true;
      dispatch(getCouples());
      dispatch(getListOfVendors({pageSize: 1000, pageNumber: 1}));
    }
  }, [dispatch, formik.values.targetAudience]);

  if (isEditing && !notification) {
    return (
      <div className="marketingNotificationsPage">
        <div className="container-fluid">
          {isLoading ? <Loader /> : <p>Notification not found. Return to the list and try again.</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="marketingNotificationsPage">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8">
            <h2>
              {isEditing ? 'Edit' : 'New'} {isEmailNotification ? 'Email' : 'App'} Notification
            </h2>
          </div>
        </div>
        <form className="notificationForm" onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-lg-6 mb-3">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" className="form-control" {...formik.getFieldProps('title')} />
              {formik.touched.title && formik.errors.title && <div className="errorMessage">{formik.errors.title}</div>}
            </div>
            <div className="col-lg-6 mb-3">
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" className="form-control" {...formik.getFieldProps('subject')} />
              {formik.touched.subject && formik.errors.subject && <div className="errorMessage">{formik.errors.subject}</div>}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="body">Message Body</label>
            {isEmailNotification ? (
              <>
                <ReactQuill
                  theme="snow"
                  value={formik.values.body}
                  onChange={value => formik.setFieldValue('body', value)}
                  onBlur={() => formik.setFieldTouched('body', true)}
                />
                <small>Email content is sent as HTML. Use the editor to format it.</small>
              </>
            ) : (
              <textarea id="body" name="body" className="form-control" rows="8" {...formik.getFieldProps('body')} />
            )}
            {formik.touched.body && formik.errors.body && <div className="errorMessage">{formik.errors.body}</div>}
          </div>
          <div className="row">
            <div className="col-lg-6 mb-3">
              <label htmlFor="targetAudience">Target Audience</label>
              <select id="targetAudience" name="targetAudience" className="form-control" {...formik.getFieldProps('targetAudience')}>
                {Object.entries(audienceLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </div>
            <div className="col-lg-6 mb-3">
              <label htmlFor="scheduledFor">Schedule For</label>
              <input id="scheduledFor" name="scheduledFor" type="datetime-local" className="form-control" {...formik.getFieldProps('scheduledFor')} />
            </div>
          </div>
          {formik.values.targetAudience === '3' && (
            <div className="mb-3">
              <label htmlFor="customUserIds">Select Recipients</label>
              <Select
                inputId="customUserIds"
                isMulti
                isSearchable
                isLoading={vendorItem.isLoading || couples.isLoading}
                options={audienceOptions}
                placeholder="Search by name or email..."
                value={formik.values.customUserIds.map(id => {
                  const option = audienceOptions
                    .flatMap(group => group.options)
                    .find(item => item.value === id);
                  return option || {value: id, label: id};
                })}
                onChange={selectedOptions => {
                  formik.setFieldValue(
                    'customUserIds',
                    (selectedOptions || []).map(option => option.value),
                  );
                }}
                onBlur={() => formik.setFieldTouched('customUserIds', true)}
              />
              <small>Search and select any combination of couples and vendors.</small>
              {formik.touched.customUserIds && formik.errors.customUserIds && <div className="errorMessage">{formik.errors.customUserIds}</div>}
            </div>
          )}
          <div className="form-check mb-4">
            <input id="isDraft" name="isDraft" type="checkbox" className="form-check-input" checked={formik.values.isDraft} onChange={formik.handleChange} />
            <label className="form-check-label" htmlFor="isDraft">Save as draft</label>
          </div>
          <div className="formActions">
            <Link className="btn clearButton" to={isEmailNotification ? '/dashboard/email-notifications' : '/dashboard/app-notifications'}>Cancel</Link>
            <button className="btn" type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : isEditing ? 'Update Notification' : 'Create Notification'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
