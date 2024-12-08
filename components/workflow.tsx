'use client'

import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type NodeType = 'if' | 'then'

interface WorkflowNode {
  id: string
  type: NodeType
  content: string
  children: WorkflowNode[]
}

export default function WorkflowBuilder() {
  const [workflow, setWorkflow] = useState<WorkflowNode[]>([])

  const addNode = (parentId: string | null, type: NodeType) => {
    const newNode: WorkflowNode = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: '',
      children: [],
    }

    if (parentId === null) {
      setWorkflow([...workflow, newNode])
    } else {
      setWorkflow(updateNodeChildren(workflow, parentId, newNode))
    }
  }

  const updateNodeChildren = (nodes: WorkflowNode[], parentId: string, newNode: WorkflowNode): WorkflowNode[] => {
    return nodes.map(node => {
      if (node.id === parentId) {
        return { ...node, children: [...node.children, newNode] }
      }
      if (node.children.length > 0) {
        return { ...node, children: updateNodeChildren(node.children, parentId, newNode) }
      }
      return node
    })
  }

  const updateNodeContent = (id: string, content: string) => {
    setWorkflow(updateNodeContentHelper(workflow, id, content))
  }

  const updateNodeContentHelper = (nodes: WorkflowNode[], id: string, content: string): WorkflowNode[] => {
    return nodes.map(node => {
      if (node.id === id) {
        return { ...node, content }
      }
      if (node.children.length > 0) {
        return { ...node, children: updateNodeContentHelper(node.children, id, content) }
      }
      return node
    })
  }

  const renderNode = (node: WorkflowNode) => (
    <div key={node.id} className="ml-8 mt-4">
      <div className="flex items-center space-x-2">
        <span className="font-semibold">{node.type === 'if' ? 'If This:' : 'Then That:'}</span>
        <Input
          value={node.content}
          onChange={(e) => updateNodeContent(node.id, e.target.value)}
          className="w-64"
          placeholder={`Enter ${node.type === 'if' ? 'condition' : 'action'}...`}
        />
      </div>
      {renderChildren(node)}
    </div>
  )

  const renderChildren = (node: WorkflowNode) => (
    <div className="mt-2">
      {node.children.map(renderNode)}
      <AddNodeButton parentId={node.id} />
    </div>
  )

  const AddNodeButton = ({ parentId }: { parentId: string | null }) => {
    return (
      <div className="flex items-center space-x-2 mt-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          aria-label="Add node"
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button onClick={() => addNode(parentId, 'if')} variant="secondary" size="sm">
          If This
        </Button>
        <Button onClick={() => addNode(parentId, 'then')} variant="secondary" size="sm">
          Then That
        </Button>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Workflow Builder</h1>
      <div className="space-y-4">
        {workflow.map(renderNode)}
        <AddNodeButton parentId={null} />
      </div>
    </div>
  )
}

