import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface OverlayProps {
  primary?: boolean
  disabled?: boolean
  warning?: boolean
  danger?: boolean
  message?: string
  children?: ReactNode
}

const Overlay = styled.div<OverlayProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background: ${({ primary = false, danger = false, warning = false }) =>
    (danger && 'red') ||
    (primary && 'rgb(71, 167, 75)') ||
    (warning && 'rgb(255, 193, 7)') ||
    'rgb(211, 211, 211)'};
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: ${({ disabled = false, danger = false, primary = false }) =>
    (disabled && 'rgb(169, 169, 169)') ||
    (danger && '#FFFFFF') ||
    (primary && '#FFFFFF') ||
    'black'};
  transition: 0.5s;
`

const NotificationOverlay = (props: OverlayProps) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Overlay {...props}>
      {props.children ? props.children : props.message}
    </Overlay>
  )
}

export default NotificationOverlay
