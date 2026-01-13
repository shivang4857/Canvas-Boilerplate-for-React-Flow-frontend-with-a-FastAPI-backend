import { useStore } from '../store';
import { BaseNode } from './baseNode';
import { FieldRow, LabeledInput, LabeledSelect, HelperText } from './fields';

export const SwitchNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const operator = data?.operator ?? 'equals';
  const compareTo = data?.compareTo ?? '';

  return (
    <BaseNode
      title="Switch"
      handles={[
        { id: `${id}-value`, type: 'target', side: 'left', style: { top: '35%' } },
        { id: `${id}-compare`, type: 'target', side: 'left', style: { top: '70%' } },
        { id: `${id}-true`, type: 'source', side: 'right', style: { top: '40%' } },
        { id: `${id}-false`, type: 'source', side: 'right', style: { top: '70%' } },
      ]}
    >
      <FieldRow>
        <LabeledSelect
          label="Operator"
          value={operator}
          onChange={(v) => updateNodeField(id, 'operator', v)}
          options={[
            { value: 'equals', label: 'equals' },
            { value: 'contains', label: 'contains' },
            { value: 'startsWith', label: 'startsWith' },
            { value: 'endsWith', label: 'endsWith' },
          ]}
        />
        <LabeledInput
          label="Compare to (fallback)"
          value={compareTo}
          onChange={(v) => updateNodeField(id, 'compareTo', v)}
          placeholder="optional default"
        />
      </FieldRow>
      <HelperText>Routes to True/False based on value vs compare.</HelperText>
    </BaseNode>
  );
};

