import React from 'react'
import { Icon } from 'semantic-ui-react'

export default function Stars ({ value }) {
  switch (value) {
    case 1:
      return <Icon color="yellow" name="star" />
    case 2:
      return (
        <>
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
        </>
      )
    case 3:
      return (
        <>
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
        </>
      )
    case 4:
      return (
        <>
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
        </>
      )
    case 5:
      return (
        <>
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
        </>
      )

    default:
      break
  }
}
