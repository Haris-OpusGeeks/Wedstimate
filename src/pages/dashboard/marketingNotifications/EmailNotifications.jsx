import DataTable from 'react-data-table-component';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import Loader from '../../../components/Loader.jsx';
import {
  getListOfMarketingNotifications,
  deleteMarketingNotification,
} from '../../../Redux/Reducers/marketingNotificationSlice.js';
import useMarketingNotificationSelector from '../../../Redux/Selectors/useMarketingNotificationSelector.js';
import './MarketingNotifications.scss';

const statusLabels = {
  1: 'Draft',
  2: 'Scheduled',
  3: 'Sending',
  4: 'Sent',
  5: 'Failed',
};

const audienceLabels = {
  0: 'All',
  1: 'Vendors',
  2: 'Couples',
  3: 'Custom',
};

const formatDate = value =>
  value ? new Date(value).toLocaleString() : '—';

const customStyles = {
  table: {style: {minWidth: '1050px'}},
  rows: {style: {minHeight: '60px'}},
  headRow: {style: {borderBottom: '1px solid #0238669E'}},
  headCells: {
    style: {fontSize: '16px', color: '#023866', fontWeight: 700},
  },
  cells: {style: {fontSize: '15px', color: '#023866'}},
};

export default function EmailNotifications() {
  const dispatch = useDispatch();
  const {notifications, isLoading, isError, isDeleting, errorMessage} =
    useMarketingNotificationSelector();
  const [filters, setFilters] = useState({
    status: '',
    targetAudience: '',
  });

  const loadNotifications = params => {
    const activeFilters = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== ''),
    );
    dispatch(getListOfMarketingNotifications({...activeFilters, type: 1}));
  };

  useEffect(() => {
    dispatch(getListOfMarketingNotifications({type: 1}));
  }, [dispatch]);

  const handleSubmit = event => {
    event.preventDefault();
    loadNotifications(filters);
  };

  const clearFilters = () => {
    const emptyFilters = {status: '', targetAudience: ''};
    setFilters(emptyFilters);
    loadNotifications(emptyFilters);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this email notification? This action cannot be undone.')) return;
    try {
      await dispatch(deleteMarketingNotification(id)).unwrap();
      loadNotifications(filters);
    } catch (error) {
      // The slice and shared error handler expose the API error to the user.
    }
  };

  const columns = [
    {name: 'Title', selector: row => row.title || '—', sortable: true, grow: 1.25},
    {name: 'Subject', selector: row => row.subject || '—', sortable: true, grow: 1.25},
    {name: 'Audience', selector: row => audienceLabels[row.targetAudience] || '—'},
    {name: 'Status', selector: row => statusLabels[row.status] || '—'},
    {name: 'Scheduled For', selector: row => formatDate(row.scheduledFor), grow: 1.2},
    {name: 'Sent On', selector: row => formatDate(row.sentOn), grow: 1.2},
    {name: 'Created On', selector: row => formatDate(row.createdOn), grow: 1.2},
    {
      name: 'Action',
      cell: row => (
        <div className="notificationActions">
          <Link className="btn" to={`/dashboard/email-notifications/edit/${row.id}`} state={{notification: row}}>Edit</Link>
          <button className="btn clearButton" type="button" disabled={isDeleting} onClick={() => handleDelete(row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="marketingNotificationsPage">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5">
            <h2>Email Notifications</h2>
          </div>
          <div className="col-lg-7">
            <form className="notificationFilters" onSubmit={handleSubmit}>
              <select
                value={filters.status}
                onChange={event => setFilters({...filters, status: event.target.value})}
              >
                <option value="">All statuses</option>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <select
                value={filters.targetAudience}
                onChange={event => setFilters({...filters, targetAudience: event.target.value})}
              >
                <option value="">All audiences</option>
                {Object.entries(audienceLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <button className="btn" type="submit">Filter</button>
              <button className="btn clearButton" type="button" onClick={clearFilters}>Clear</button>
              <Link className="btn" to="/dashboard/email-notifications/new">
                New Email Notification
              </Link>
            </form>
          </div>
        </div>
        <div className="listingArea">
          {isLoading ? <Loader /> : (
            <DataTable
              columns={columns}
              data={notifications || []}
              customStyles={customStyles}
              pagination
              responsive
            />
          )}
          {isError && <p className="errorMessage">{errorMessage || 'Unable to load email notifications.'}</p>}
        </div>
      </div>
    </div>
  );
}
