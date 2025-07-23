import React from 'react';
import Icon from 'components/AppIcon';

const WorkflowNode = ({ node, onClick, onDelete }) => {
  const getNodeStyle = (type) => {
    switch (type) {
      case 'trigger':
        return {
          bgColor: 'bg-accent-50',
          borderColor: 'border-accent-200',
          iconColor: 'text-accent',
          icon: 'Zap'
        };
      case 'condition':
        return {
          bgColor: 'bg-primary-50',
          borderColor: 'border-primary-200',
          iconColor: 'text-primary',
          icon: 'GitBranch'
        };
      case 'action':
        return {
          bgColor: 'bg-success-50',
          borderColor: 'border-success-200',
          iconColor: 'text-success',
          icon: 'Play'
        };
      default:
        return {
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          iconColor: 'text-gray-500',
          icon: 'Circle'
        };
    }
  };

  const style = getNodeStyle(node.type);

  return (
    <div
      onClick={onClick}
      className={`relative flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer hover:shadow-md transition-all ${
        style.bgColor
      } ${
        style.borderColor
      } ${
        node.configured ? 'opacity-100' : 'opacity-75'
      }`}
    >
      <div className={`w-10 h-10 rounded-full bg-white border-2 ${style.borderColor} flex items-center justify-center`}>
        <Icon name={style.icon} size={20} className={style.iconColor} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h4 className="font-medium text-text-primary truncate">{node.title}</h4>
          {!node.configured && (
            <div className="w-2 h-2 bg-warning rounded-full" title="Not configured" />
          )}
        </div>
        <p className="text-sm text-text-secondary capitalize">{node.type}</p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick(node);
          }}
          className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-white rounded transition-colors"
          title="Configure"
        >
          <Icon name="Settings" size={16} />
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(node.id);
          }}
          className="p-1.5 text-text-secondary hover:text-error hover:bg-error-50 rounded transition-colors"
          title="Delete"
        >
          <Icon name="Trash2" size={16} />
        </button>
      </div>
    </div>
  );
};

export default WorkflowNode;