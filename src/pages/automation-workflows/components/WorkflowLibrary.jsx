import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const WorkflowLibrary = ({ 
  workflows, 
  selectedWorkflow, 
  onWorkflowSelect, 
  onToggleWorkflow 
}) => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Workflows', count: workflows?.length || 0 },
    { id: 'deal-stage', label: 'Deal Stage Changes', count: workflows?.filter(w => w.category === 'deal-stage').length || 0 },
    { id: 'contact-activity', label: 'Contact Activities', count: workflows?.filter(w => w.category === 'contact-activity').length || 0 },
    { id: 'time-based', label: 'Time-based Events', count: workflows?.filter(w => w.category === 'time-based').length || 0 },
    { id: 'custom', label: 'Custom Fields', count: workflows?.filter(w => w.category === 'custom').length || 0 }
  ];

  const filteredWorkflows = workflows?.filter(workflow => {
    const matchesCategory = filterCategory === 'all' || workflow.category === filterCategory;
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return { icon: 'Play', color: 'text-success' };
      case 'inactive': return { icon: 'Pause', color: 'text-text-secondary' };
      case 'draft': return { icon: 'Edit', color: 'text-warning-600' };
      default: return { icon: 'AlertCircle', color: 'text-error' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" />
        <input
          type="text"
          placeholder="Search workflows..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 input-field"
        />
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-text-primary mb-3">Categories</h3>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setFilterCategory(category.id)}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
              filterCategory === category.id
                ? 'bg-primary-50 text-primary border border-primary-100' :'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
            }`}
          >
            <span>{category.label}</span>
            <span className="text-xs bg-border px-2 py-0.5 rounded-full">
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Workflow List */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-text-primary">
          Workflows ({filteredWorkflows.length})
        </h3>
        
        {filteredWorkflows.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            <Icon name="Workflow" size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No workflows found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredWorkflows.map(workflow => {
              const statusConfig = getStatusIcon(workflow.status);
              const isSelected = selectedWorkflow?.id === workflow.id;

              return (
                <div
                  key={workflow.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-primary-50 border-primary-200' :'bg-surface border-border hover:border-border-dark'
                  }`}
                  onClick={() => onWorkflowSelect(workflow)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-text-primary truncate">
                        {workflow.name}
                      </h4>
                      <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                        {workflow.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-1 ml-2">
                      <Icon 
                        name={statusConfig.icon} 
                        size={14} 
                        className={statusConfig.color} 
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWorkflow(workflow.id, workflow.status !== 'active');
                        }}
                        className={`w-6 h-3 rounded-full transition-colors ${
                          workflow.status === 'active' ?'bg-success' :'bg-border'
                        }`}
                      >
                        <div className={`w-2.5 h-2.5 bg-white rounded-full transition-transform ${
                          workflow.status === 'active' ?'transform translate-x-3' :'transform translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-text-tertiary">
                    <span>{workflow.triggerType}</span>
                    <span>{workflow.triggers} triggers</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-text-tertiary mt-1">
                    <span>Last run: {workflow.lastExecution}</span>
                    {workflow.successRate > 0 && (
                      <span className="text-success">{workflow.successRate}% success</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowLibrary;