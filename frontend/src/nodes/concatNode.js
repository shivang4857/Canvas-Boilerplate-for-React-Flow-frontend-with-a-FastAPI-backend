import { useStore } from '../store';
import { BaseNode } from './baseNode';
import { FieldRow, LabeledInput } from './fields';

export const ConcatNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const separator = data?.separator ?? ' ';

  return (
    <BaseNode
      title="Concat"
      icon="⊕"
      subtitle="Join two strings together"
      handles={[
        { id: `${id}-a`, type: 'target', side: 'left', style: { top: '35%' } },
        { id: `${id}-b`, type: 'target', side: 'left', style: { top: '70%' } },
        { id: `${id}-out`, type: 'source', side: 'right' },
      ]}
    >
      <FieldRow>
        <LabeledInput
          label="Separator"
          value={separator}
          onChange={(v) => updateNodeField(id, 'separator', v)}
          placeholder=" "
        />
      </FieldRow>
    </BaseNode>
  );
};
