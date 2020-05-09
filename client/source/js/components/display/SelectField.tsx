import * as React from 'react';

export type SelectOption = string|{ value: string, text: string };

export function SelectField ({
  value,
  options,
  onChange,
  label,
} : {
  value: string,
  options: SelectOption[],
  onChange: (value: string) => void,
  label: string,
}) {
  return (
    <div className='c-select-field'>
      <label className='c-select-field__label'>{label}</label>
      <select className='c-select-field__input' value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option: SelectOption, i) => {
          const { value, text } = typeof option === 'object' ? option : {
            value: option,
            text: option,
          };
          return <option key={i} value={value}>{text}</option>
        })}
      </select>
    </div>
  )
}