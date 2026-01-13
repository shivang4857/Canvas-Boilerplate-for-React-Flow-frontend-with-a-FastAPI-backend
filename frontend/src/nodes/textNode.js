import { useStore } from '../store';
import { BaseNode } from './baseNode';
import { FieldRow, LabeledInput, HelperText } from './fields';

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const text = data?.text ?? '{{input}}';

  return (
    <BaseNode
      title="Text"
      icon="📝"
      subtitle="Static or template text"
      handles={[{ id: `${id}-output`, type: 'source', side: 'right' }]}
    >
      <FieldRow>
        <LabeledInput
          label="Text"
          value={text}
          onChange={(v) => updateNodeField(id, 'text', v)}
          placeholder="{{variable}}"
        />
      </FieldRow>
      <HelperText>Use {"{{variable}}"} syntax for dynamic variables.</HelperText>
    </BaseNode>
  );
};
