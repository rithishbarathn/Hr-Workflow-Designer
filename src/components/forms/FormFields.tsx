import type { ChangeEvent, ReactNode } from 'react';

export const fieldStyle: React.CSSProperties = {
  width: '100%',
  padding: '7px 10px',
  borderRadius: 7,
  border: '1.5px solid #2d2b45',
  background: '#16152a',
  color: '#e2e0f0',
  fontSize: 12,
  fontFamily: "'DM Sans', sans-serif",
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
};

export const labelStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  color: '#8b89a8',
  letterSpacing: 0.8,
  marginBottom: 4,
  display: 'block',
};

interface FieldProps {
  label: string;
  children: ReactNode;
  required?: boolean;
}

export function Field({ label, children, required }: FieldProps) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={labelStyle}>
        {label.toUpperCase()}
        {required && <span style={{ color: '#f87171', marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

interface InputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}

export function Input({ value, onChange, placeholder, type = 'text' }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      style={fieldStyle}
      onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
      onBlur={(e) => (e.target.style.borderColor = '#2d2b45')}
    />
  );
}

interface TextareaProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}

export function Textarea({ value, onChange, placeholder, rows = 3 }: TextareaProps) {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
      style={{ ...fieldStyle, resize: 'vertical' }}
      onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
      onBlur={(e) => (e.target.style.borderColor = '#2d2b45')}
    />
  );
}

interface SelectProps {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({ value, onChange, options, placeholder }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
      style={{ ...fieldStyle, cursor: 'pointer' }}
      onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
      onBlur={(e) => (e.target.style.borderColor = '#2d2b45')}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

interface KVEditorProps {
  pairs: { key: string; value: string }[];
  onChange: (pairs: { key: string; value: string }[]) => void;
}

export function KVEditor({ pairs, onChange }: KVEditorProps) {
  const update = (i: number, field: 'key' | 'value', val: string) => {
    const next = [...pairs];
    next[i] = { ...next[i], [field]: val };
    onChange(next);
  };
  const add = () => onChange([...pairs, { key: '', value: '' }]);
  const remove = (i: number) => onChange(pairs.filter((_, idx) => idx !== i));

  return (
    <div>
      {pairs.map((p, i) => (
        <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
          <input
            value={p.key}
            placeholder="key"
            onChange={(e) => update(i, 'key', e.target.value)}
            style={{ ...fieldStyle, flex: 1 }}
          />
          <input
            value={p.value}
            placeholder="value"
            onChange={(e) => update(i, 'value', e.target.value)}
            style={{ ...fieldStyle, flex: 1 }}
          />
          <button
            onClick={() => remove(i)}
            style={{ background: '#2d2b45', border: 'none', color: '#f87171', borderRadius: 6, cursor: 'pointer', padding: '0 8px', fontSize: 14 }}
          >
            ×
          </button>
        </div>
      ))}
      <button
        onClick={add}
        style={{ background: '#1e1d35', border: '1.5px dashed #3d3b58', color: '#a78bfa', borderRadius: 6, cursor: 'pointer', padding: '5px 10px', fontSize: 11, width: '100%' }}
      >
        + Add pair
      </button>
    </div>
  );
}

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: 36,
          height: 20,
          borderRadius: 10,
          background: checked ? '#6366f1' : '#2d2b45',
          position: 'relative',
          transition: 'background 0.2s',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 3,
            left: checked ? 19 : 3,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#fff',
            transition: 'left 0.2s',
          }}
        />
      </div>
      <span style={{ fontSize: 12, color: '#c4c2de' }}>{label}</span>
    </label>
  );
}
