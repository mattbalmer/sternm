import * as React from 'react';

export function IconButton ({
  onClick,
  label,
  icon,
  iconPosition = 'left',
} : {
  onClick: () => void,
  label: string,
  icon: JSX.Element,
  iconPosition?: 'left'|'right',
}) {
  return (
    <button className='c-icon-button' onClick={onClick}>
      {iconPosition
        ? <React.Fragment>
            <span className='c-icon-button__icon'>{icon}</span>
            <span className='c-icon-button__label'>{label}</span>
          </React.Fragment>
        : <React.Fragment>
            <span className='c-icon-button__label'>{label}</span>
            <span className='c-icon-button__icon'>{icon}</span>
          </React.Fragment>
      }
    </button>
  )
}