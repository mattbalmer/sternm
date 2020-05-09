import * as React from 'react';

export function TextField ({
  value,
  onChange,
  label,
  placeholder = '',
  type = 'short',
} : {
  value: string,
  onChange: (value: string) => void,
  label: string,
  placeholder?: string,
  type?: 'short' | 'long'
}) {
  return (
    <div className='c-text-field'>
      <label className='c-text-field__label'>{label}</label>
      {type === 'short' ? <input type='text' placeholder={placeholder} className='c-text-field__input c-text-field__input--short' value={value} onChange={(e) => onChange(e.target.value)} /> : null}
      {type === 'long' ? <textarea rows={5} placeholder={placeholder} className='c-text-field__input c-text-field__input--long' value={value} onChange={(e) => onChange(e.target.value)} /> : null}
    </div>
  )
}