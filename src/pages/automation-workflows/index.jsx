import React, { useState, useEffect } from 'react';

import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';

import WorkflowLibrary from './components/WorkflowLibrary';
import WorkflowBuilder from './components/WorkflowBuilder';

import TemplateSelector from './components/TemplateSelector';
import ExecutionHistory from './components/ExecutionHistory';

const AutomationWorkflows = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [workflows, setWorkflows] = useState([]);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [activeTab, setActiveTab] = useState('builder');
  const [isTestMode, setIsTestMode] = useState(false);

  // Mock workflow data
  const mockWorkflows = [
    {
      id: 'wf-1',
      name: 'Deal Stage Automation',
      description: 'Automatically progress deals and notify team members',
      status: 'active',
      triggerType: 'Deal Stage Change',
      triggers: 12,
      lastExecution: '2 hours ago',
      successRate: 95.2,
      category: 'deal-stage',
      nodes: [
        { id: 'trigger-1', type: 'trigger', title: 'Deal Stage Changed to Proposal', position: { x: 100, y: 100 } },
        { id: 'condition-1', type: 'condition', title: 'Deal Value > $50,000', position: { x: 300, y: 100 } },
        { id: 'action-1', type: 'action', title: 'Send Email to Manager', position: { x: 500, y: 100 } }
      ]
    },
    {
      id: 'wf-2',
      name: 'Contact Follow-up Sequence',
      description: 'Automated email sequence for new contacts',
      status: 'active',
      triggerType: 'Contact Activity',
      triggers: 8,
      lastExecution: '1 day ago',
      successRate: 88.7,
      category: 'contact-activity',
      nodes: []
    },
    {
      id: 'wf-3',
      name: 'Monthly Deal Review',
      description: 'Generate monthly deal reports automatically',
      status: 'inactive',
      triggerType: 'Time-based Event',
      triggers: 0,
      lastExecution: 'Never',
      successRate: 0,
      category: 'time-based',
      nodes: []
    }
  ];

  const [workflowData, setWorkflowData] = useState(mockWorkflows);

  // Available workflow templates
  const workflowTemplates = [
    {
      id: 'template-1',
      name: 'Lead Nurturing Campaign',
      description: 'Multi-step email sequence for lead conversion',
      category: 'Marketing',
      estimatedSetupTime: '15 minutes'
    },
    {
      id: 'template-2',
      name: 'Deal Won Celebration',
      description: 'Celebrate closed deals with team notifications',
      category: 'Sales',
      estimatedSetupTime: '10 minutes'
    },
    {
      id: 'template-3',
      name: 'Abandoned Cart Recovery',
      description: 'Re-engage prospects who abandoned the process',
      category: 'Recovery',
      estimatedSetupTime: '20 minutes'
    }
  ];

  useEffect(() => {
    setWorkflows(workflowData);
  }, []);

  const handleWorkflowSelect = (workflow) => {
    setSelectedWorkflow(workflow);
    setActiveTab('builder');
  };

  const handleToggleWorkflow = (workflowId, enabled) => {
    setWorkflows(workflows.map(wf => 
      wf.id === workflowId 
        ? { ...wf, status: enabled ? 'active' : 'inactive' }
        : wf
    ));
  };

  const handleTestWorkflow = () => {
    setIsTestMode(true);
    // Simulate test execution
    setTimeout(() => {
      setIsTestMode(false);
      alert('Workflow test completed successfully!');
    }, 2000);
  };

  const handlePublishWorkflow = () => {
    if (selectedWorkflow) {
      setWorkflows(workflows.map(wf => 
        wf.id === selectedWorkflow.id 
          ? { ...wf, status: 'active' }
          : wf
      ));
      alert('Workflow published successfully!');
    }
  };

  const handleCreateWorkflow = (template) => {
    const newWorkflow = {
      id: `wf-${Date.now()}`,
      name: template.name,
      description: template.description,
      status: 'draft',
      triggerType: 'Custom',
      triggers: 0,
      lastExecution: 'Never',
      successRate: 0,
      category: 'custom',
      nodes: []
    };
    
    setWorkflows([...workflows, newWorkflow]);
    setSelectedWorkflow(newWorkflow);
    setShowTemplateModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">Automation Workflows</h1>
              <p className="text-text-secondary">
                Create and manage sophisticated business process automation • Powered by 
                <a href="https://developerbikash.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-700 ml-1 font-medium">
                  developerbikash.com
                </a>
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={() => setShowTemplateModal(true)}
                className="btn-secondary flex items-center space-x-2"
              >
                <Icon name="Plus" size={16} />
                <span>Create Workflow</span>
              </button>
              
              {selectedWorkflow && (
                <>
                  <button
                    onClick={handleTestWorkflow}
                    disabled={isTestMode}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-150 ease-out flex items-center space-x-2 ${
                      isTestMode 
                        ? 'bg-warning-100 text-warning-600 cursor-not-allowed' :'bg-warning text-text-inverse hover:bg-warning-600'
                    }`}
                  >
                    <Icon name={isTestMode ? "Loader" : "Play"} size={16} className={isTestMode ? "animate-spin" : ""} />
                    <span>{isTestMode ? 'Testing...' : 'Test Automation'}</span>
                  </button>
                  
                  <button
                    onClick={handlePublishWorkflow}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Icon name="Upload" size={16} />
                    <span>Publish Changes</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Left Panel - Workflow Library */}
            <div className="xl:col-span-1">
              <WorkflowLibrary
                workflows={workflows}
                selectedWorkflow={selectedWorkflow}
                onWorkflowSelect={handleWorkflowSelect}
                onToggleWorkflow={handleToggleWorkflow}
              />
            </div>

            {/* Right Panel - Workflow Builder */}
            <div className="xl:col-span-3">
              {selectedWorkflow ? (
                <div className="card">
                  {/* Builder Header */}
                  <div className="border-b border-border px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-text-primary">{selectedWorkflow.name}</h2>
                        <p className="text-text-secondary text-sm mt-1">{selectedWorkflow.description}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => setActiveTab('builder')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                              activeTab === 'builder' ?'bg-white text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                            }`}
                          >
                            Builder
                          </button>
                          <button
                            onClick={() => setActiveTab('history')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                              activeTab === 'history' ?'bg-white text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                            }`}
                          >
                            History
                          </button>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          selectedWorkflow.status === 'active' ?'bg-success-100 text-success-600'
                            : selectedWorkflow.status === 'draft' ?'bg-warning-100 text-warning-600' :'bg-gray-100 text-text-secondary'
                        }`}>
                          {selectedWorkflow.status.charAt(0).toUpperCase() + selectedWorkflow.status.slice(1)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Builder Content */}
                  <div className="p-6">
                    {activeTab === 'builder' ? (
                      <WorkflowBuilder
                        workflow={selectedWorkflow}
                        onWorkflowUpdate={setSelectedWorkflow}
                      />
                    ) : (
                      <ExecutionHistory
                        workflowId={selectedWorkflow.id}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="card p-8 text-center">
                  <div className="w-16 h-16 bg-secondary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Workflow" size={32} className="text-secondary" />
                  </div>
                  <h3 className="text-lg font-medium text-text-primary mb-2">No Workflow Selected</h3>
                  <p className="text-text-secondary mb-6">
                    Select a workflow from the library to start building or create a new one from templates.
                  </p>
                  <button
                    onClick={() => setShowTemplateModal(true)}
                    className="btn-primary flex items-center space-x-2 mx-auto"
                  >
                    <Icon name="Plus" size={16} />
                    <span>Create Your First Workflow</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Template Selection Modal */}
      {showTemplateModal && (
        <TemplateSelector
          templates={workflowTemplates}
          onClose={() => setShowTemplateModal(false)}
          onSelect={handleCreateWorkflow}
        />
      )}
    </div>
  );
};

export default AutomationWorkflows;