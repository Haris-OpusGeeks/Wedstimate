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

export default function AppNotifications() {
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
    dispatch(getListOfMarketingNotifications({...activeFilters, type: 2}));
  };

  useEffect(() => {
    dispatch(getListOfMarketingNotifications({type: 2}));
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
    if (!window.confirm('Delete this app notification? This action cannot be undone.')) return;
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
          <Link className="btn" to={`/dashboard/app-notifications/edit/${row.id}`} state={{notification: row}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#023866" className="bi bi-pencil-square" viewBox="0 0 16 16">
             <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
             <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg>
          </Link>
          <button className="btn clearButton" type="button" disabled={isDeleting} onClick={() => handleDelete(row.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <g clipPath="url(#clip0_358_427)">
                    <path d="M13.6897 17.7599H4.06973C3.05001 17.7599 2.21973 16.9297 2.21973 15.9099V5.54993C2.21973 5.34569 2.38549 5.17993 2.58973 5.17993C2.79397 5.17993 2.95973 5.34569 2.95973 5.54993V15.9099C2.95973 16.5219 3.45775 17.0199 4.06973 17.0199H13.6897C14.3017 17.0199 14.7997 16.5219 14.7997 15.9099V5.54993C14.7997 5.34569 14.9655 5.17993 15.1697 5.17993C15.374 5.17993 15.5397 5.34569 15.5397 5.54993V15.9099C15.5397 16.9297 14.7094 17.7599 13.6897 17.7599Z" fill="#274C66"/>
                    <path d="M16.6502 5.91997H1.11023C0.905994 5.91997 0.740234 5.75421 0.740234 5.54997V4.06997C0.740234 3.05025 1.57051 2.21997 2.59023 2.21997H15.1702C16.19 2.21997 17.0202 3.05025 17.0202 4.06997V5.54997C17.0202 5.75421 16.8545 5.91997 16.6502 5.91997ZM1.48023 5.17997H16.2802V4.06997C16.2802 3.45799 15.7822 2.95997 15.1702 2.95997H2.59023C1.97825 2.95997 1.48023 3.45799 1.48023 4.06997V5.17997Z" fill="#274C66"/>
                    <path d="M12.2097 2.96C12.0054 2.96 11.8397 2.79424 11.8397 2.59V1.11C11.8397 0.90576 11.6739 0.74 11.4697 0.74H6.28969C6.08545 0.74 5.91969 0.90576 5.91969 1.11V2.59C5.91969 2.79424 5.75393 2.96 5.54969 2.96C5.34545 2.96 5.17969 2.79424 5.17969 2.59V1.11C5.17969 0.49802 5.67771 0 6.28969 0H11.4697C12.0817 0 12.5797 0.49802 12.5797 1.11V2.59C12.5797 2.79424 12.4139 2.96 12.2097 2.96Z" fill="#274C66"/>
                    <path d="M8.87977 14.7999C8.67553 14.7999 8.50977 14.6341 8.50977 14.4299V8.50989C8.50977 8.30565 8.67553 8.13989 8.87977 8.13989C9.08401 8.13989 9.24977 8.30565 9.24977 8.50989V14.4299C9.24977 14.6341 9.08401 14.7999 8.87977 14.7999Z" fill="#274C66"/>
                    <path d="M5.54969 14.7999C5.34545 14.7999 5.17969 14.6341 5.17969 14.4299V8.50989C5.17969 8.30565 5.34545 8.13989 5.54969 8.13989C5.75393 8.13989 5.91969 8.30565 5.91969 8.50989V14.4299C5.91969 14.6341 5.75393 14.7999 5.54969 14.7999Z" fill="#274C66"/>
                    <path d="M12.2098 14.7999C12.0056 14.7999 11.8398 14.6341 11.8398 14.4299V8.50989C11.8398 8.30565 12.0056 8.13989 12.2098 8.13989C12.4141 8.13989 12.5798 8.30565 12.5798 8.50989V14.4299C12.5798 14.6341 12.4141 14.7999 12.2098 14.7999Z" fill="#274C66"/>
                </g>
                <defs>
                    <clipPath id="clip0_358_427">
                        <rect width="18" height="18" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="marketingNotificationsPage">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5">
            <h2>App Notifications</h2>
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
              <Link className="btn" to="/dashboard/app-notifications/new">
                New App Notification
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
          {isError && <p className="errorMessage">{errorMessage || 'Unable to load app notifications.'}</p>}
        </div>
      </div>
    </div>
  );
}
