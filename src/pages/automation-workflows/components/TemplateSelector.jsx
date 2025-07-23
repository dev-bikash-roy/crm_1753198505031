import React from 'react';
import Icon from 'components/AppIcon';

const TemplateSelector = ({ templates, onClose, onSelect }) => {
  const categoryIcons = {
    'Marketing': { icon: 'Mail', color: 'text-accent', bgColor: 'bg-accent-50' },
    'Sales': { icon: 'TrendingUp', color: 'text-success', bgColor: 'bg-success-50' },
    'Recovery': { icon: 'RotateCcw', color: 'text-warning-600', bgColor: 'bg-warning-50' }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-1300 flex items-center justify-center">
      <div className="bg-surface rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Choose Workflow Template</h2>
            <p className="text-text-secondary mt-1">
              Start with a pre-built template or create from scratch • Powered by 
              <a href="https://developerbikash.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-700 ml-1 font-medium">
                developerbikash.com
              </a>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <Icon name="X" size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates?.map(template => {
              const categoryStyle = categoryIcons[template.category] || categoryIcons['Marketing'];
              
              return (
                <div
                  key={template.id}
                  className="card p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                  onClick={() => onSelect(template)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${categoryStyle.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon name={categoryStyle.icon} size={24} className={categoryStyle.color} />
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${categoryStyle.bgColor} ${categoryStyle.color}`}>
                      {template.category}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {template.name}
                  </h3>
                  
                  <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-text-tertiary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{template.estimatedSetupTime}</span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icon name="ArrowRight" size={16} className="text-primary" />
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Custom Template Option */}
            <div
              className="card p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group border-2 border-dashed border-border hover:border-primary"
              onClick={() => onSelect({
                id: 'custom',
                name: 'Custom Workflow',
                description: 'Build your own automation from scratch',
                category: 'Custom',
                estimatedSetupTime: 'Variable'
              })}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-secondary-50 rounded-lg flex items-center justify-center">
                  <Icon name="Plus" size={24} className="text-secondary" />
                </div>
                <div className="px-2 py-1 rounded text-xs font-medium bg-secondary-50 text-secondary">
                  Custom
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                Start from Scratch
              </h3>
              
              <p className="text-text-secondary text-sm mb-4">
                Build a completely custom workflow tailored to your specific business needs and requirements.
              </p>
              
              <div className="flex items-center justify-between text-xs text-text-tertiary">
                <div className="flex items-center space-x-1">
                  <Icon name="Zap" size={12} />
                  <span>Full flexibility</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="ArrowRight" size={16} className="text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-6 py-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;