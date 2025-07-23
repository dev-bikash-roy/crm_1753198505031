import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExecutionHistory = ({ workflowId }) => {
  const [selectedDateRange, setSelectedDateRange] = useState('last7days');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock execution history data
  const executionHistory = [
    {
      id: 'exec-1',
      timestamp: '2025-07-22T13:30:00Z',
      status: 'success',
      trigger: 'Deal moved to Proposal',
      duration: 1.2,
      stepsCompleted: 3,
      totalSteps: 3,
      details: {
        contact: 'John Smith - Acme Corp',
        dealValue: '$75,000',
        actionsPerformed: ['Email sent to manager', 'Task created', 'Deal updated']
      }
    },
    {
      id: 'exec-2',
      timestamp: '2025-07-22T11:15:00Z',
      status: 'success',
      trigger: 'Deal moved to Proposal',
      duration: 0.8,
      stepsCompleted: 3,
      totalSteps: 3,
      details: {
        contact: 'Sarah Johnson - TechStart Inc',
        dealValue: '$28,000',
        actionsPerformed: ['Email sent to manager', 'Task created', 'Deal updated']
      }
    },
    {
      id: 'exec-3',
      timestamp: '2025-07-22T09:45:00Z',
      status: 'failed',
      trigger: 'Deal moved to Proposal',
      duration: 0.3,
      stepsCompleted: 1,
      totalSteps: 3,
      error: 'Email delivery failed - invalid email address',
      details: {
        contact: 'Mike Wilson - DataCorp',
        dealValue: '$120,000',
        actionsPerformed: ['Task created']
      }
    },
    {
      id: 'exec-4',
      timestamp: '2025-07-21T16:20:00Z',
      status: 'partial',
      trigger: 'Deal moved to Proposal',
      duration: 2.1,
      stepsCompleted: 2,
      totalSteps: 3,
      warning: 'Third-party integration timeout',
      details: {
        contact: 'Emma Davis - StartupXYZ',
        dealValue: '$45,000',
        actionsPerformed: ['Email sent to manager', 'Task created']
      }
    }
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'success':
        return { 
          icon: 'CheckCircle', 
          color: 'text-success', 
          bgColor: 'bg-success-50',
          label: 'Success'
        };
      case 'failed':
        return { 
          icon: 'XCircle', 
          color: 'text-error', 
          bgColor: 'bg-error-50',
          label: 'Failed'
        };
      case 'partial':
        return { 
          icon: 'AlertCircle', 
          color: 'text-warning-600', 
          bgColor: 'bg-warning-50',
          label: 'Partial'
        };
      default:
        return { 
          icon: 'Clock', 
          color: 'text-text-secondary', 
          bgColor: 'bg-gray-50',
          label: 'Running'
        };
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp));
  };

  const filteredHistory = executionHistory.filter(execution => {
    if (selectedStatus !== 'all' && execution.status !== selectedStatus) {
      return false;
    }
    
    const executionDate = new Date(execution.timestamp);
    const now = new Date();
    const daysDiff = (now - executionDate) / (1000 * 60 * 60 * 24);
    
    switch (selectedDateRange) {
      case 'today':
        return daysDiff < 1;
      case 'last7days':
        return daysDiff <= 7;
      case 'last30days':
        return daysDiff <= 30;
      default:
        return true;
    }
  });

  const successRate = executionHistory.length > 0 
    ? (executionHistory.filter(e => e.status === 'success').length / executionHistory.length * 100).toFixed(1)
    : 0;

  const avgDuration = executionHistory.length > 0
    ? (executionHistory.reduce((sum, e) => sum + e.duration, 0) / executionHistory.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Executions</p>
              <p className="text-2xl font-semibold text-text-primary">{executionHistory.length}</p>
            </div>
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <Icon name="Play" size={20} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Success Rate</p>
              <p className="text-2xl font-semibold text-text-primary">{successRate}%</p>
            </div>
            <div className="w-10 h-10 bg-success-50 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Avg Duration</p>
              <p className="text-2xl font-semibold text-text-primary">{avgDuration}s</p>
            </div>
            <div className="w-10 h-10 bg-accent-50 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-accent" />
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Failed</p>
              <p className="text-2xl font-semibold text-text-primary">
                {executionHistory.filter(e => e.status === 'failed').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-error-50 rounded-lg flex items-center justify-center">
              <Icon name="XCircle" size={20} className="text-error" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
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

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="input-field"
        >
          <option value="all">All statuses</option>
          <option value="success">Success only</option>
          <option value="failed">Failed only</option>
          <option value="partial">Partial only</option>
        </select>
      </div>

      {/* Execution History List */}
      <div className="space-y-4">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Clock" size={32} className="mx-auto text-text-tertiary mb-2" />
            <p className="text-text-secondary">No execution history found</p>
            <p className="text-text-tertiary text-sm mt-1">Try adjusting your filters or wait for the workflow to run</p>
          </div>
        ) : (
          filteredHistory.map(execution => {
            const statusConfig = getStatusConfig(execution.status);
            
            return (
              <div key={execution.id} className="card p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${statusConfig.bgColor} rounded-full flex items-center justify-center`}>
                      <Icon name={statusConfig.icon} size={16} className={statusConfig.color} />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{execution.trigger}</p>
                      <p className="text-sm text-text-secondary">{formatTimestamp(execution.timestamp)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{execution.duration}s</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="List" size={14} />
                      <span>{execution.stepsCompleted}/{execution.totalSteps}</span>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
                      {statusConfig.label}
                    </div>
                  </div>
                </div>

                <div className="ml-11 space-y-2">
                  <p className="text-sm text-text-secondary">
                    <span className="font-medium">Contact:</span> {execution.details.contact}
                  </p>
                  <p className="text-sm text-text-secondary">
                    <span className="font-medium">Deal Value:</span> {execution.details.dealValue}
                  </p>
                  
                  {execution.error && (
                    <div className="flex items-start space-x-2 p-2 bg-error-50 rounded text-sm text-error">
                      <Icon name="AlertTriangle" size={14} className="mt-0.5" />
                      <span>{execution.error}</span>
                    </div>
                  )}
                  
                  {execution.warning && (
                    <div className="flex items-start space-x-2 p-2 bg-warning-50 rounded text-sm text-warning-600">
                      <Icon name="AlertTriangle" size={14} className="mt-0.5" />
                      <span>{execution.warning}</span>
                    </div>
                  )}

                  <details className="text-sm">
                    <summary className="cursor-pointer text-primary hover:text-primary-700">
                      View Details
                    </summary>
                    <div className="mt-2 space-y-1">
                      <p className="font-medium text-text-primary">Actions Performed:</p>
                      <ul className="list-disc list-inside space-y-1 text-text-secondary">
                        {execution.details.actionsPerformed.map((action, index) => (
                          <li key={index}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  </details>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ExecutionHistory;