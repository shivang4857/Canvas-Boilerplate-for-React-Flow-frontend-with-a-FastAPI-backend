import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useStore } from '../store';
import { BaseNode } from './baseNode';
import { FieldRow, HelperText, LabeledTextarea } from './fields';

const IDENT = '[A-Za-z_$][A-Za-z0-9_$]*';
const VAR_PATTERN = new RegExp(`\\{\\{\\s*(${IDENT}(?:\\.${IDENT})*)\\s*\\}\\}`, 'g');

function parseVariables(text) {
  const vars = new Set();
  if (!text) return [];

  for (const match of text.matchAll(VAR_PATTERN)) {
    const raw = match?.[1]?.trim();
    if (raw) vars.add(raw);
  }

  return Array.from(vars);
}

function handleIdForVar(nodeId, variable) {
  const safe = variable.replaceAll('.', '__');
  return `${nodeId}-var-${safe}`;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const pruneEdgesForNodeHandles = useStore((s) => s.pruneEdgesForNodeHandles);
  const text = data?.text ?? '{{input}}';
  const textareaRef = useRef(null);
  const [textareaHeight, setTextareaHeight] = useState(0);

  const variables = useMemo(() => parseVariables(text), [text]);

  const handles = useMemo(() => {
    const left = variables.map((variable, idx) => {
      const top =
        variables.length <= 1 ? 50 : 22 + (idx * 56) / (variables.length - 1);

      return {
        id: handleIdForVar(id, variable),
        type: 'target',
        side: 'left',
        style: { top: `${top}%` },
      };
    });

    return [
      ...left,
      { id: `${id}-output`, type: 'source', side: 'right' },
    ];
  }, [id, variables]);

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = '0px';
    const next = el.scrollHeight;
    el.style.height = `${next}px`;
    setTextareaHeight(next);
  }, [text]);

  useLayoutEffect(() => {
    const allowedHandleIds = handles.map((h) => h.id);
    pruneEdgesForNodeHandles(id, allowedHandleIds);
  }, [handles, id, pruneEdgesForNodeHandles]);

  const width = useMemo(() => {
    const longest = text.split('\n').reduce((max, line) => Math.max(max, line.length), 0);
    return clamp(240 + longest * 6, 260, 560);
  }, [text]);

  const minHeight = useMemo(() => {
    return clamp(140 + textareaHeight, 160, 520);
  }, [textareaHeight]);

  return (
    <BaseNode
      title="Text"
      icon="📝"
      subtitle="Static or template text"
      width={width}
      minHeight={minHeight}
      handles={handles}
    >
      <FieldRow>
        <LabeledTextarea
          label="Text"
          value={text}
          onChange={(v) => updateNodeField(id, 'text', v)}
          placeholder="{{variable}}"
          rows={1}
          textareaRef={textareaRef}
          style={{ overflow: 'hidden' }}
        />
      </FieldRow>
      <HelperText>
        Type variables like {"{{input_0.text}}"} to create left-side handles.
      </HelperText>
    </BaseNode>
  );
};
