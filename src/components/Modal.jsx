import { useEffect, useRef } from "react"

export default function Modal(props) {
  const { isOpen, onClose, children, dialogRef } = props

  return (
    <dialog ref={dialogRef} className="modal">
      {children}
    </dialog>
  )
}