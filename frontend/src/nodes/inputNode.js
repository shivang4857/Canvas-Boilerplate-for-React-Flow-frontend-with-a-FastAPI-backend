import { useStore } from '../store';
import { BaseNode } from './baseNode';
import { FieldRow, LabeledInput, LabeledSelect } from './fields';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const name = data?.inputName ?? id.replace('customInput-', 'input_');
  const inputType = data?.inputType ?? 'Text';

  return (
    <BaseNode
      title="Input"
      icon="↓"
      subtitle="Pass data into your pipeline"
      handles={[{ id: `${id}-value`, type: 'source', side: 'right' }]}
    >
      <FieldRow>
        <LabeledInput
          label="Name"
          value={name}
          onChange={(v) => updateNodeField(id, 'inputName', v)}
        />
        <LabeledSelect
          label="Type"
          value={inputType}
          onChange={(v) => updateNodeField(id, 'inputType', v)}
          options={[
            { value: 'Text', label: 'Text' },
            { value: 'File', label: 'File' },
          ]}
        />
      </FieldRow>
    </BaseNode>
  );
};
