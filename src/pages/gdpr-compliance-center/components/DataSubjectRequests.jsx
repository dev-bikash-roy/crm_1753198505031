import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const DataSubjectRequests = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Mock request data
  const requests = [
    {
      id: 'req-001',
      type: 'access',
      subject: 'john.smith@acme.com',
      name: 'John Smith',
      submittedAt: '2025-07-20T10:30:00Z',
      status: 'pending',
      priority: 'normal',
      daysRemaining: 28,
      description: 'Request for all personal data held about the subject',
      attachments: 2,
      assignee: 'Sarah Wilson'
    },
    {
      id: 'req-002',
      type: 'rectification',
      subject: 'mike.johnson@techcorp.com',
      name: 'Mike Johnson',
      submittedAt: '2025-07-18T14:15:00Z',
      status: 'in_progress',
      priority: 'high',
      daysRemaining: 26,
      description: 'Request to correct phone number and address information',
      attachments: 1,
      assignee: 'David Brown'
    },
    {
      id: 'req-003',
      type: 'erasure',
      subject: 'emma.davis@startup.io',
      name: 'Emma Davis',
      submittedAt: '2025-07-15T09:45:00Z',
      status: 'overdue',
      priority: 'urgent',
      daysRemaining: -2,
      description: 'Request to delete all personal data (right to be forgotten)',
      attachments: 0,
      assignee: 'Lisa Thompson'
    },
    {
      id: 'req-004',
      type: 'portability',
      subject: 'alex.martin@global.com',
      name: 'Alex Martin',
      submittedAt: '2025-07-22T11:20:00Z',
      status: 'completed',
      priority: 'normal',
      daysRemaining: null,
      description: 'Request for data export in machine-readable format',
      attachments: 3,
      assignee: 'Maria Garcia',
      completedAt: '2025-07-22T16:45:00Z'
    }
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return { color: 'text-warning-600', bgColor: 'bg-warning-50', label: 'Pending' };
      case 'in_progress':
        return { color: 'text-primary', bgColor: 'bg-primary-50', label: 'In Progress' };
      case 'completed':
        return { color: 'text-success', bgColor: 'bg-success-50', label: 'Completed' };
      case 'overdue':
        return { color: 'text-error', bgColor: 'bg-error-50', label: 'Overdue' };
      default:
        return { color: 'text-text-secondary', bgColor: 'bg-gray-50', label: 'Unknown' };
    }
  };

  const getTypeConfig = (type) => {
    switch (type) {
      case 'access':
        return { icon: 'Eye', label: 'Data Access' };
      case 'rectification':
        return { icon: 'Edit', label: 'Rectification' };
      case 'erasure':
        return { icon: 'Trash2', label: 'Data Erasure' };
      case 'portability':
        return { icon: 'Download', label: 'Data Portability' };
      default:
        return { icon: 'FileText', label: 'Other' };
    }
  };

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'urgent':
        return { color: 'text-error', label: 'Urgent' };
      case 'high':
        return { color: 'text-warning-600', label: 'High' };
      case 'normal':
        return { color: 'text-text-secondary', label: 'Normal' };
      default:
        return { color: 'text-text-secondary', label: 'Low' };
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    const matchesType = selectedType === 'all' || request.type === selectedType;
    const matchesSearch = request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const formatTimeRemaining = (daysRemaining) => {
    if (daysRemaining === null) return 'Completed';
    if (daysRemaining < 0) return `${Math.abs(daysRemaining)} days overdue`;
    return `${daysRemaining} days remaining`;
  };

  const handleProcessRequest = (request) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
  };

  const handleQuickAction = (requestId, action) => {
    console.log(`Performing ${action} on request ${requestId}`);
    // Here you would typically call an API
    alert(`${action} action initiated for request ${requestId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 input-field"
            />
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="input-field"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="overdue">Overdue</option>
            <option value="completed">Completed</option>
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="input-field"
          >
            <option value="all">All Types</option>
            <option value="access">Data Access</option>
            <option value="rectification">Rectification</option>
            <option value="erasure">Data Erasure</option>
            <option value="portability">Data Portability</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Icon name="FileText" size={16} />
            <span>Export Report</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Icon name="Plus" size={16} />
            <span>New Request</span>
          </button>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="FileText" size={48} className="mx-auto text-text-tertiary mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No requests found</h3>
            <p className="text-text-secondary">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          filteredRequests.map(request => {
            const statusConfig = getStatusConfig(request.status);
            const typeConfig = getTypeConfig(request.type);
            const priorityConfig = getPriorityConfig(request.priority);

            return (
              <div key={request.id} className="card p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                      <Icon name={typeConfig.icon} size={20} className="text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-text-primary">{request.name}</h3>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
                          {statusConfig.label}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium border ${priorityConfig.color} border-current`}>
                          {priorityConfig.label}
                        </div>
                      </div>
                      
                      <p className="text-text-secondary mb-2">
                        <span className="font-medium">Subject:</span> {request.subject}
                      </p>
                      
                      <p className="text-text-secondary mb-3">{request.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-text-tertiary">
                        <div className="flex items-center space-x-1">
                          <Icon name="Calendar" size={14} />
                          <span>Submitted {new Date(request.submittedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="User" size={14} />
                          <span>Assigned to {request.assignee}</span>
                        </div>
                        {request.attachments > 0 && (
                          <div className="flex items-center space-x-1">
                            <Icon name="Paperclip" size={14} />
                            <span>{request.attachments} attachment(s)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <div className={`text-sm font-medium ${
                      request.daysRemaining !== null && request.daysRemaining < 0 
                        ? 'text-error' 
                        : request.daysRemaining !== null && request.daysRemaining <= 7
                        ? 'text-warning-600' :'text-text-secondary'
                    }`}>
                      {formatTimeRemaining(request.daysRemaining)}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {request.status !== 'completed' && (
                        <>
                          <button
                            onClick={() => handleProcessRequest(request)}
                            className="p-2 text-primary hover:bg-primary-50 rounded transition-colors"
                            title="Process Request"
                          >
                            <Icon name="Play" size={16} />
                          </button>
                          
                          <button
                            onClick={() => handleQuickAction(request.id, 'assign')}
                            className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded transition-colors"
                            title="Reassign"
                          >
                            <Icon name="UserCheck" size={16} />
                          </button>
                        </>
                      )}
                      
                      <button
                        onClick={() => handleQuickAction(request.id, 'view')}
                        className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded transition-colors"
                        title="View Details"
                      >
                        <Icon name="Eye" size={16} />
                      </button>
                      
                      <button
                        onClick={() => handleQuickAction(request.id, 'download')}
                        className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded transition-colors"
                        title="Download Response"
                      >
                        <Icon name="Download" size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {request.status === 'completed' && request.completedAt && (
                  <div className="mt-4 p-3 bg-success-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <span className="text-sm text-success">
                        Completed on {new Date(request.completedAt).toLocaleDateString()} at {new Date(request.completedAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Process Request Modal */}
      {showRequestModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-1300 flex items-center justify-center">
          <div className="bg-surface rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-text-primary">Process Request</h2>
              <button
                onClick={() => setShowRequestModal(false)}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-medium text-text-primary mb-2">Request Details</h3>
                <p className="text-text-secondary">{selectedRequest.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Status</label>
                  <select className="input-field">
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Priority</label>
                  <select className="input-field">
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Response Notes</label>
                <textarea 
                  className="input-field" 
                  rows={4}
                  placeholder="Add notes about the processing of this request..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-border">
              <button
                onClick={() => setShowRequestModal(false)}
                className="px-6 py-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRequestModal(false);
                  alert('Request updated successfully');
                }}
                className="btn-primary"
              >
                Update Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSubjectRequests;