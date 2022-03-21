import React from 'react'

export default function DisplayResult(props: any) {

  console.log('DISPLAY', props);

  return (
    <div className="display-result">
      <p>{props.value}</p>
    </div>
  )
}
