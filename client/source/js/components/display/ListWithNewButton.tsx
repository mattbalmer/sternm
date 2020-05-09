import * as React from 'react';

export function ListWithNewButton({
  items,
  buttonLabel,
  onCreate,
  heading,
} : {
  items: JSX.Element[],
  buttonLabel: string,
  onCreate: () => void,
  heading?: JSX.Element,
}) {
  return (
    <div className='c-list-with-new-button'>
      {heading ?
        <div className='c-list-with-new-button__heading'>{heading}</div>
      : null}
      <ul className='c-list-with-new-button__list'>
        {items.map((item: JSX.Element, i) => {
          return (
            <li
              key={i}
              className='c-list-with-new-button__list-item'
            >
              {item}
            </li>
          )
        })}
      </ul>
      <button
        className='c-list-with-new-button__button'
        onClick={() => onCreate()}
      >
        {buttonLabel}
      </button>
    </div>
  )
}