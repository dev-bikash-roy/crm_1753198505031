import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Icon from 'components/AppIcon';
import WorkflowNode from './WorkflowNode';

const WorkflowBuilder = ({ workflow, onWorkflowUpdate }) => {
  const [draggedNodeType, setDraggedNodeType] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showNodeConfig, setShowNodeConfig] = useState(false);

  const nodeTypes = [
    {
      type: 'trigger',
      label: 'Triggers',
      icon: 'Zap',
      color: 'text-accent',
      bgColor: 'bg-accent-50',
      items: [
        { id: 'deal-stage-change', label: 'Deal Stage Change', description: 'When a deal moves to a new stage' },
        { id: 'contact-created', label: 'Contact Created', description: 'When a new contact is added' },
        { id: 'email-opened', label: 'Email Opened', description: 'When contact opens an email' },
        { id: 'form-submitted', label: 'Form Submitted', description: 'When a form is submitted' },
        { id: 'time-based', label: 'Time-based', description: 'Scheduled or recurring trigger' }
      ]
    },
    {
      type: 'condition',
      label: 'Conditions',
      icon: 'GitBranch',
      color: 'text-primary',
      bgColor: 'bg-primary-50',
      items: [
        { id: 'deal-value', label: 'Deal Value', description: 'Check deal amount conditions' },
        { id: 'contact-property', label: 'Contact Property', description: 'Check contact field values' },
        { id: 'time-condition', label: 'Time Condition', description: 'Check date/time criteria' },
        { id: 'tag-condition', label: 'Tag Condition', description: 'Check if contact has specific tags' }
      ]
    },
    {
      type: 'action',
      label: 'Actions',
      icon: 'Play',
      color: 'text-success',
      bgColor: 'bg-success-50',
      items: [
        { id: 'send-email', label: 'Send Email', description: 'Send automated email' },
        { id: 'create-task', label: 'Create Task', description: 'Assign task to team member' },
        { id: 'update-deal', label: 'Update Deal', description: 'Modify deal properties' },
        { id: 'add-tag', label: 'Add Tag', description: 'Tag contact or deal' },
        { id: 'send-sms', label: 'Send SMS', description: 'Send SMS via Twilio integration' },
        { id: 'slack-notification', label: 'Slack Notification', description: 'Send message to Slack channel' }
      ]
    }
  ];

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    // Handle node reordering or adding new nodes
    const { source, destination } = result;
    
    if (source.droppableId === 'toolbox' && destination.droppableId === 'canvas') {
      // Adding new node from toolbox
      const newNode = {
        id: `node-${Date.now()}`,
        type: draggedNodeType,
        title: `New ${draggedNodeType.charAt(0).toUpperCase() + draggedNodeType.slice(1)}`,
        position: { x: 100, y: destination.index * 120 + 100 },
        configured: false
      };

      const updatedWorkflow = {
        ...workflow,
        nodes: [...(workflow.nodes || []), newNode]
      };

      onWorkflowUpdate(updatedWorkflow);
    }
  };

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    setShowNodeConfig(true);
  };

  const handleNodeUpdate = (nodeId, updates) => {
    const updatedNodes = workflow.nodes?.map(node =>
      node.id === nodeId ? { ...node, ...updates, configured: true } : node
    ) || [];

    onWorkflowUpdate({
      ...workflow,
      nodes: updatedNodes
    });
  };

  const handleNodeDelete = (nodeId) => {
    const updatedNodes = workflow.nodes?.filter(node => node.id !== nodeId) || [];
    onWorkflowUpdate({
      ...workflow,
      nodes: updatedNodes
    });
    setSelectedNode(null);
    setShowNodeConfig(false);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-96">
        {/* Node Toolbox */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-medium text-text-primary">Workflow Components</h3>
          
          {nodeTypes.map(nodeType => (
            <div key={nodeType.type} className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className={`w-6 h-6 ${nodeType.bgColor} rounded flex items-center justify-center`}>
                  <Icon name={nodeType.icon} size={14} className={nodeType.color} />
                </div>
                <span className="text-sm font-medium text-text-primary">{nodeType.label}</span>
              </div>
              
              <Droppable droppableId="toolbox">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-1">
                    {nodeType.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                        onStart={() => setDraggedNodeType(nodeType.type)}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-2 bg-surface border border-border rounded text-xs cursor-move hover:border-border-dark transition-colors ${
                              snapshot.isDragging ? 'shadow-lg' : ''
                            }`}
                          >
                            <div className="font-medium text-text-primary">{item.label}</div>
                            <div className="text-text-tertiary">{item.description}</div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>

        {/* Canvas Area */}
        <div className="lg:col-span-3">
          <Droppable droppableId="canvas">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`h-full border-2 border-dashed rounded-lg p-4 transition-colors ${
                  snapshot.isDraggingOver 
                    ? 'border-primary bg-primary-50' :'border-border bg-surface'
                }`}
              >
                {workflow.nodes && workflow.nodes.length > 0 ? (
                  <div className="space-y-4">
                    {workflow.nodes.map((node, index) => (
                      <div key={node.id} className="flex items-center space-x-4">
                        <WorkflowNode
                          node={node}
                          onClick={() => handleNodeClick(node)}
                          onDelete={() => handleNodeDelete(node.id)}
                        />
                        {index < workflow.nodes.length - 1 && (
                          <div className="flex items-center">
                            <Icon name="ArrowDown" size={16} className="text-text-tertiary" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-center">
                    <div>
                      <Icon name="MousePointer2" size={32} className="mx-auto text-text-tertiary mb-2" />
                      <p className="text-text-secondary">Drag components here to build your workflow</p>
                      <p className="text-text-tertiary text-sm mt-1">Start with a trigger, then add conditions and actions</p>
                    </div>
                  </div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>

      {/* Node Configuration Panel */}
      {showNodeConfig && selectedNode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-1200 flex items-center justify-center">
          <div className="bg-surface rounded-lg shadow-xl max-w-lg w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-medium text-text-primary">Configure {selectedNode.type}</h3>
              <button
                onClick={() => setShowNodeConfig(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Node Name
                </label>
                <input
                  type="text"
                  value={selectedNode.title}
                  onChange={(e) => handleNodeUpdate(selectedNode.id, { title: e.target.value })}
                  className="input-field"
                  placeholder="Enter node name"
                />
              </div>

              {selectedNode.type === 'condition' && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Condition Type
                  </label>
                  <select className="input-field">
                    <option>Select condition type</option>
                    <option>Deal value greater than</option>
                    <option>Contact has tag</option>
                    <option>Time elapsed since</option>
                  </select>
                </div>
              )}

              {selectedNode.type === 'action' && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Action Type
                  </label>
                  <select className="input-field">
                    <option>Select action type</option>
                    <option>Send email template</option>
                    <option>Create task</option>
                    <option>Update contact property</option>
                    <option>Send SMS notification</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 p-4 border-t border-border">
              <button
                onClick={() => setShowNodeConfig(false)}
                className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleNodeUpdate(selectedNode.id, { configured: true });
                  setShowNodeConfig(false);
                }}
                className="btn-primary"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </DragDropContext>
  );
};

export default WorkflowBuilder;