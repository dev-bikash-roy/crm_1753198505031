import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const DataAuditTrail = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('last7days');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock audit trail data
  const auditRecords = [
    {
      id: 'audit-001',
      timestamp: '2025-07-22T14:30:15Z',
      user: 'sarah.wilson@company.com',
      userName: 'Sarah Wilson',
      action: 'data_access',
      resource: 'Contact Record',
      resourceId: 'contact-12345',
      details: 'Viewed contact details for John Smith',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/119.0.0.0',
      changes: null,
      riskLevel: 'low'
    },
    {
      id: 'audit-002',
      timestamp: '2025-07-22T13:45:22Z',
      user: 'admin@company.com',
      userName: 'System Administrator',
      action: 'data_modification',
      resource: 'Contact Record',
      resourceId: 'contact-67890',
      details: 'Updated phone number for Mike Johnson',
      ipAddress: '10.0.0.1',
      userAgent: 'Firefox/118.0.0.0',
      changes: {
        field: 'phone',
        oldValue: '+1-555-0123',
        newValue: '+1-555-0456'
      },
      riskLevel: 'medium'
    },
    {
      id: 'audit-003',
      timestamp: '2025-07-22T12:15:33Z',
      user: 'maria.garcia@company.com',
      userName: 'Maria Garcia',
      action: 'data_deletion',
      resource: 'Contact Record',
      resourceId: 'contact-54321',
      details: 'Processed GDPR erasure request for Emma Davis',
      ipAddress: '172.16.0.50',
      userAgent: 'Chrome/119.0.0.0',
      changes: {
        deletedFields: ['email', 'phone', 'address', 'notes'],
        reason: 'GDPR Art. 17 - Right to erasure'
      },
      riskLevel: 'high'
    },
    {
      id: 'audit-004',
      timestamp: '2025-07-22T11:30:44Z',
      user: 'api-service@company.com',
      userName: 'API Service',
      action: 'data_export',
      resource: 'Multiple Records',
      resourceId: 'export-batch-789',
      details: 'Exported contact data for GDPR portability request',
      ipAddress: '127.0.0.1',
      userAgent: 'Internal API v2.1',
      changes: {
        exportedRecords: 1,
        exportFormat: 'JSON',
        requestId: 'req-004'
      },
      riskLevel: 'medium'
    },
    {
      id: 'audit-005',
      timestamp: '2025-07-22T10:45:17Z',
      user: 'john.doe@company.com',
      userName: 'John Doe',
      action: 'failed_access',
      resource: 'Contact Record',
      resourceId: 'contact-99999',
      details: 'Attempted to access restricted contact record',
      ipAddress: '192.168.1.150',
      userAgent: 'Chrome/119.0.0.0',
      changes: null,
      riskLevel: 'high'
    }
  ];

  const getActionConfig = (action) => {
    switch (action) {
      case 'data_access':
        return { 
          icon: 'Eye', 
          color: 'text-primary', 
          bgColor: 'bg-primary-50',
          label: 'Data Access' 
        };
      case 'data_modification':
        return { 
          icon: 'Edit', 
          color: 'text-warning-600', 
          bgColor: 'bg-warning-50',
          label: 'Data Modified' 
        };
      case 'data_deletion':
        return { 
          icon: 'Trash2', 
          color: 'text-error', 
          bgColor: 'bg-error-50',
          label: 'Data Deleted' 
        };
      case 'data_export':
        return { 
          icon: 'Download', 
          color: 'text-success', 
          bgColor: 'bg-success-50',
          label: 'Data Exported' 
        };
      case 'failed_access':
        return { 
          icon: 'AlertTriangle', 
          color: 'text-error', 
          bgColor: 'bg-error-50',
          label: 'Access Denied' 
        };
      default:
        return { 
          icon: 'FileText', 
          color: 'text-text-secondary', 
          bgColor: 'bg-gray-50',
          label: 'Other' 
        };
    }
  };

  const getRiskLevelConfig = (riskLevel) => {
    switch (riskLevel) {
      case 'low':
        return { color: 'text-success', bgColor: 'bg-success-50', label: 'Low' };
      case 'medium':
        return { color: 'text-warning-600', bgColor: 'bg-warning-50', label: 'Medium' };
      case 'high':
        return { color: 'text-error', bgColor: 'bg-error-50', label: 'High' };
      default:
        return { color: 'text-text-secondary', bgColor: 'bg-gray-50', label: 'Unknown' };
    }
  };

  const filteredRecords = auditRecords.filter(record => {
    // Date filter
    const recordDate = new Date(record.timestamp);
    const now = new Date();
    const daysDiff = (now - recordDate) / (1000 * 60 * 60 * 24);
    
    let matchesDate = true;
    switch (selectedDateRange) {
      case 'today':
        matchesDate = daysDiff < 1;
        break;
      case 'last7days':
        matchesDate = daysDiff <= 7;
        break;
      case 'last30days':
        matchesDate = daysDiff <= 30;
        break;
      default:
        matchesDate = true;
    }

    // Action filter
    const matchesAction = selectedAction === 'all' || record.action === selectedAction;

    // User filter
    const matchesUser = selectedUser === 'all' || record.user === selectedUser;

    // Search filter
    const matchesSearch = searchQuery === '' || 
      record.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.resource.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDate && matchesAction && matchesUser && matchesSearch;
  });

  const uniqueUsers = [...new Set(auditRecords.map(record => record.user))];

  const getActionStats = () => {
    const stats = {};
    const actions = ['data_access', 'data_modification', 'data_deletion', 'data_export', 'failed_access'];
    
    actions.forEach(action => {
      stats[action] = auditRecords.filter(record => record.action === action).length;
    });
    
    return stats;
  };

  const actionStats = getActionStats();

  return (
    <div className="space-y-6">
      {/* Action Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.entries(actionStats).map(([action, count]) => {
          const config = getActionConfig(action);
          return (
            <div key={action} className="card p-4">
              <div className="flex items-center justify-between">
                <div className={`w-8 h-8 ${config.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon name={config.icon} size={16} className={config.color} />
                </div>
                <div className="text-xl font-semibold text-text-primary">{count}</div>
              </div>
              <p className="text-sm font-medium text-text-primary mt-2">{config.label}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search audit logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 input-field"
            />
          </div>

          {/* Date Range Filter */}
          <select
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="input-field"
          >
            <option value="today">Today</option>
            <option value="last7days">Last 7 days</option>
            <option value="last30days">Last 30 days</option>
            <option value="all">All time</option>
          </select>

          {/* Action Filter */}
          <select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            className="input-field"
          >
            <option value="all">All Actions</option>
            <option value="data_access">Data Access</option>
            <option value="data_modification">Data Modified</option>
            <option value="data_deletion">Data Deleted</option>
            <option value="data_export">Data Exported</option>
            <option value="failed_access">Failed Access</option>
          </select>

          {/* User Filter */}
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="input-field"
          >
            <option value="all">All Users</option>
            {uniqueUsers.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Icon name="Filter" size={16} />
            <span>Advanced Filters</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Icon name="Download" size={16} />
            <span>Export Audit Log</span>
          </button>
        </div>
      </div>

      {/* Audit Trail */}
      <div className="space-y-3">
        {filteredRecords.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="FileSearch" size={48} className="mx-auto text-text-tertiary mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No audit records found</h3>
            <p className="text-text-secondary">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          filteredRecords.map(record => {
            const actionConfig = getActionConfig(record.action);
            const riskConfig = getRiskLevelConfig(record.riskLevel);

            return (
              <div key={record.id} className="card p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 ${actionConfig.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon name={actionConfig.icon} size={20} className={actionConfig.color} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-text-primary">{actionConfig.label}</h3>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${riskConfig.bgColor} ${riskConfig.color}`}>
                          {riskConfig.label} Risk
                        </div>
                      </div>
                      
                      <p className="text-text-secondary mb-3">{record.details}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-text-tertiary">
                        <div className="flex items-center space-x-1">
                          <Icon name="User" size={14} />
                          <span>{record.userName}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Globe" size={14} />
                          <span className="font-data">{record.ipAddress}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Database" size={14} />
                          <span>{record.resource}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={14} />
                          <span>{new Date(record.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      {record.changes && (
                        <details className="mt-4">
                          <summary className="cursor-pointer text-primary hover:text-primary-700 text-sm font-medium">
                            View Change Details
                          </summary>
                          <div className="mt-2 p-3 bg-background rounded-lg">
                            <pre className="text-xs text-text-secondary whitespace-pre-wrap font-data">
                              {JSON.stringify(record.changes, null, 2)}
                            </pre>
                          </div>
                        </details>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded transition-colors"
                      title="View Full Details"
                    >
                      <Icon name="Eye" size={16} />
                    </button>
                    <button
                      className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded transition-colors"
                      title="Export Record"
                    >
                      <Icon name="Download" size={16} />
                    </button>
                    {record.riskLevel === 'high' && (
                      <button
                        className="p-2 text-error hover:bg-error-50 rounded transition-colors"
                        title="Flag for Review"
                      >
                        <Icon name="Flag" size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination would go here in a real application */}
      {filteredRecords.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">
            Showing {filteredRecords.length} of {auditRecords.length} records
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm text-text-secondary hover:text-text-primary border border-border rounded hover:bg-surface-hover transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 text-sm text-text-secondary hover:text-text-primary border border-border rounded hover:bg-surface-hover transition-colors">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataAuditTrail;