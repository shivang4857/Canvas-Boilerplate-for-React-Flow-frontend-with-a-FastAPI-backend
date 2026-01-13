import { useStore } from '../store';
import { BaseNode } from './baseNode';
import { FieldRow, LabeledInput, HelperText } from './fields';

export const DelayNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const ms = data?.ms ?? '250';

  return (
    <BaseNode
      title="Delay"
      icon="⏱"
      subtitle="Wait before continuing"
      handles={[
        { id: `${id}-in`, type: 'target', side: 'left' },
        { id: `${id}-out`, type: 'source', side: 'right' },
      ]}
    >
      <FieldRow>
        <LabeledInput
          label="Milliseconds"
          type="number"
          value={ms}
          onChange={(v) => updateNodeField(id, 'ms', v)}
        />
      </FieldRow>
      <HelperText>Simulates waiting before passing data through.</HelperText>
    </BaseNode>
  );
};
