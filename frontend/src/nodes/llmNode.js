import { BaseNode } from './baseNode';
import { HelperText } from './fields';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      title="LLM"
      handles={[
        { id: `${id}-system`, type: 'target', side: 'left', style: { top: '33%' } },
        { id: `${id}-prompt`, type: 'target', side: 'left', style: { top: '66%' } },
        { id: `${id}-response`, type: 'source', side: 'right' },
      ]}
    >
      <HelperText>System + Prompt in, Response out.</HelperText>
    </BaseNode>
  );
};
