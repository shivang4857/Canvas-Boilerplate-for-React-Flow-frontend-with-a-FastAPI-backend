import { useStore } from '../store';
import { BaseNode } from './baseNode';
import { FieldRow, LabeledInput } from './fields';

export const NumberNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const value = data?.value ?? '0';

  return (
    <BaseNode
      title="Number"
      icon="#"
      subtitle="Constant numeric value"
      handles={[{ id: `${id}-value`, type: 'source', side: 'right' }]}
    >
      <FieldRow>
        <LabeledInput
          label="Value"
          type="number"
          value={value}
          onChange={(v) => updateNodeField(id, 'value', v)}
        />
      </FieldRow>
    </BaseNode>
  );
};
