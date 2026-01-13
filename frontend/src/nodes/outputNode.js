import { useStore } from '../store';
import { BaseNode } from './baseNode';
import { FieldRow, LabeledInput, LabeledSelect } from './fields';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const name = data?.outputName ?? id.replace('customOutput-', 'output_');
  const outputType = data?.outputType ?? 'Text';

  return (
    <BaseNode
      title="Output"
      handles={[{ id: `${id}-value`, type: 'target', side: 'left' }]}
    >
      <FieldRow>
        <LabeledInput
          label="Name"
          value={name}
          onChange={(v) => updateNodeField(id, 'outputName', v)}
        />
        <LabeledSelect
          label="Type"
          value={outputType}
          onChange={(v) => updateNodeField(id, 'outputType', v)}
          options={[
            { value: 'Text', label: 'Text' },
            { value: 'Image', label: 'Image' },
          ]}
        />
      </FieldRow>
    </BaseNode>
  );
};
