import { APINode } from './APINode';
import { ConditionNode } from './ConditionNode';
import { DatabaseNode } from './DatabaseNode';
import { InputNode } from './InputNode';
import { LLMNode } from './LLMNode';
import { LoggerNode } from './LoggerNode';
import { MathNode } from './MathNode';
import { OutputNode } from './OutputNode';
import { TextNode } from './TextNode';

export const nodeRegistry = {
  customInput: {
    type: 'customInput',
    label: 'Input Node',
    description: 'Add starting values or uploaded content.',
    shortLabel: 'IN',
    icon: '📥',
    accent: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
    color: '#3b82f6',
    component: InputNode,
  },
  customOutput: {
    type: 'customOutput',
    label: 'Output Node',
    description: 'Collect and expose the final result.',
    shortLabel: 'OUT',
    icon: '📤',
    accent: 'linear-gradient(135deg, #f97316, #fb923c)',
    color: '#f97316',
    component: OutputNode,
  },
  text: {
    type: 'text',
    label: 'Text Node',
    description: 'Template prompts with dynamic variables.',
    shortLabel: 'TXT',
    icon: '📝',
    accent: 'linear-gradient(135deg, #10b981, #34d399)',
    color: '#10b981',
    component: TextNode,
  },
  llm: {
    type: 'llm',
    label: 'LLM Node',
    description: 'Generate responses from prompts and context.',
    shortLabel: 'LLM',
    icon: '🤖',
    accent: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    color: '#8b5cf6',
    component: LLMNode,
  },
  math: {
    type: 'math',
    label: 'Math Node',
    description: 'Run lightweight arithmetic transforms.',
    shortLabel: 'MTH',
    icon: '➗',
    accent: 'linear-gradient(135deg, #ec4899, #f472b6)',
    color: '#ec4899',
    component: MathNode,
  },
  api: {
    type: 'api',
    label: 'API Node',
    description: 'Fetch or push data to external services.',
    shortLabel: 'API',
    icon: '🌐',
    accent: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
    color: '#06b6d4',
    component: APINode,
  },
  condition: {
    type: 'condition',
    label: 'Condition Node',
    description: 'Route data based on a condition.',
    shortLabel: 'IF',
    icon: '🔀',
    accent: 'linear-gradient(135deg, #ef4444, #f87171)',
    color: '#ef4444',
    component: ConditionNode,
  },
  database: {
    type: 'database',
    label: 'Database Node',
    description: 'Read and shape structured records.',
    shortLabel: 'DB',
    icon: '🗄',
    accent: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    color: '#f59e0b',
    component: DatabaseNode,
  },
  logger: {
    type: 'logger',
    label: 'Logger Node',
    description: 'Capture execution details for debugging.',
    shortLabel: 'LOG',
    icon: '📜',
    accent: 'linear-gradient(135deg, #64748b, #94a3b8)',
    color: '#64748b',
    component: LoggerNode,
  },
};

export const primaryNodeTypes = Object.keys(nodeRegistry);
