import { BaseNode } from './baseNode';
import { HelperText } from './fields';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      title="LLM"
      icon="🤖"
      subtitle="Large Language Model"
      handles={[
        { id: `${id}-system`, type: 'target', side: 'left', style: { top: '33%' } },
        { id: `${id}-prompt`, type: 'target', side: 'left', style: { top: '66%' } },
        { id: `${id}-response`, type: 'source', side: 'right' },
      ]}
    >
      <HelperText>Connect system prompt and user prompt on the left. Get AI response on the right.</HelperText>
    </BaseNode>
  );
};
