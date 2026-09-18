import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import Loader from '../../../components/Loader.jsx';
import {
  createMarketingNotification,
  getListOfMarketingNotifications,
  updateMarketingNotification,
} from '../../../Redux/Reducers/marketingNotificationSlice.js';
import useMarketingNotificationSelector from '../../../Redux/Selectors/useMarketingNotificationSelector.js';
import './MarketingNotifications.scss';

const audienceLabels = {
  0: 'All',
  1: 'Vendors',
  2: 'Couples',
  3: 'Custom',
};

const typeLabels = {
  1: 'Email',
  2: 'In-App Notification',
  3: 'Both',
};

const toLocalDateTime = value => {
  if (!value) return '';
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const parseCustomUserIds = value =>
  value
    .split(',')
    .map(id => id.trim())
    .filter(Boolean);

export default function MarketingNotificationForm() {
  const {id} = useParams();
  const isEditing = Boolean(id);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {notifications, isLoading, isSaving} = useMarketingNotificationSelector();
  const notification =
    location.state?.notification || notifications.find(item => item.id === id);

  useEffect(() => {
    if (isEditing && !location.state?.notification) {
      dispatch(getListOfMarketingNotifications({}));
    }
  }, [dispatch, isEditing, location.state]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: notification?.title || '',
      subject: notification?.subject || '',
      body: notification?.body || '',
      type: String(notification?.type || 1),
      targetAudience: String(notification?.targetAudience ?? 0),
      customUserIds: notification?.customUserIds?.join(', ') || '',
      scheduledFor: toLocalDateTime(notification?.scheduledFor),
      isDraft: notification ? notification.status === 1 : true,
    },
    validationSchema: Yup.object({
      title: Yup.string().trim().required('Title is required'),
      subject: Yup.string().trim().required('Subject is required'),
      body: Yup.string().trim().required('Message body is required'),
      type: Yup.string().oneOf(['1', '2', '3']).required('Type is required'),
      targetAudience: Yup.string()
        .oneOf(['0', '1', '2', '3'])
        .required('Audience is required'),
      customUserIds: Yup.string().when('targetAudience', {
        is: '3',
        then: schema => schema.required('At least one custom user ID is required'),
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
        customUserIds:
          values.targetAudience === '3'
            ? parseCustomUserIds(values.customUserIds)
            : [],
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
        navigate('/dashboard/marketing-notifications');
      } catch (error) {
        // The slice and shared error handler expose the API error to the user.
      }
    },
  });

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
            <h2>{isEditing ? 'Edit Marketing Notification' : 'New Marketing Notification'}</h2>
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
              <label htmlFor="subject">Email Subject</label>
              <input id="subject" name="subject" className="form-control" {...formik.getFieldProps('subject')} />
              {formik.touched.subject && formik.errors.subject && <div className="errorMessage">{formik.errors.subject}</div>}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="body">Message Body</label>
            <textarea id="body" name="body" className="form-control" rows="8" {...formik.getFieldProps('body')} />
            {formik.touched.body && formik.errors.body && <div className="errorMessage">{formik.errors.body}</div>}
          </div>
          <div className="row">
            <div className="col-lg-4 mb-3">
              <label htmlFor="type">Notification Type</label>
              <select id="type" name="type" className="form-control" {...formik.getFieldProps('type')}>
                {Object.entries(typeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </div>
            <div className="col-lg-4 mb-3">
              <label htmlFor="targetAudience">Target Audience</label>
              <select id="targetAudience" name="targetAudience" className="form-control" {...formik.getFieldProps('targetAudience')}>
                {Object.entries(audienceLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </div>
            <div className="col-lg-4 mb-3">
              <label htmlFor="scheduledFor">Schedule For</label>
              <input id="scheduledFor" name="scheduledFor" type="datetime-local" className="form-control" {...formik.getFieldProps('scheduledFor')} />
            </div>
          </div>
          {formik.values.targetAudience === '3' && (
            <div className="mb-3">
              <label htmlFor="customUserIds">Custom User IDs</label>
              <textarea id="customUserIds" name="customUserIds" className="form-control" rows="3" placeholder="Comma-separated user GUIDs" {...formik.getFieldProps('customUserIds')} />
              <small>Enter the user GUIDs supplied by your audience source, separated by commas.</small>
              {formik.touched.customUserIds && formik.errors.customUserIds && <div className="errorMessage">{formik.errors.customUserIds}</div>}
            </div>
          )}
          <div className="form-check mb-4">
            <input id="isDraft" name="isDraft" type="checkbox" className="form-check-input" checked={formik.values.isDraft} onChange={formik.handleChange} />
            <label className="form-check-label" htmlFor="isDraft">Save as draft</label>
          </div>
          <div className="formActions">
            <Link className="btn clearButton" to="/dashboard/marketing-notifications">Cancel</Link>
            <button className="btn" type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : isEditing ? 'Update Notification' : 'Create Notification'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
