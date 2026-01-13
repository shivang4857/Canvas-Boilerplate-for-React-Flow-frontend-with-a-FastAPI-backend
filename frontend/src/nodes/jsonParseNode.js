import { useStore } from '../store';
import { BaseNode } from './baseNode';
import { FieldRow, LabeledSelect, HelperText } from './fields';

export const JsonParseNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const mode = data?.mode ?? 'strict';

  return (
    <BaseNode
      title="JSON Parse"
      icon="{ }"
      subtitle="Parse JSON string to object"
      handles={[
        { id: `${id}-json`, type: 'target', side: 'left' },
        { id: `${id}-object`, type: 'source', side: 'right', style: { top: '40%' } },
        { id: `${id}-error`, type: 'source', side: 'right', style: { top: '75%' } },
      ]}
    >
      <FieldRow>
        <LabeledSelect
          label="Mode"
          value={mode}
          onChange={(v) => updateNodeField(id, 'mode', v)}
          options={[
            { value: 'strict', label: 'strict' },
            { value: 'lenient', label: 'lenient' },
          ]}
        />
      </FieldRow>
      <HelperText>JSON in, parsed object out (or error).</HelperText>
    </BaseNode>
  );
};
