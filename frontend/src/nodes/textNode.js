import { useStore } from '../store';
import { BaseNode } from './baseNode';
import { FieldRow, LabeledInput, HelperText } from './fields';

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const text = data?.text ?? '{{input}}';

  return (
    <BaseNode title="Text" handles={[{ id: `${id}-output`, type: 'source', side: 'right' }]}>
      <FieldRow>
        <LabeledInput
          label="Text"
          value={text}
          onChange={(v) => updateNodeField(id, 'text', v)}
          placeholder="{{variable}}"
        />
      </FieldRow>
      <HelperText>Part 3 will add dynamic variable handles here.</HelperText>
    </BaseNode>
  );
};
