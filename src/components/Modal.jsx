import { useEffect, useRef } from "react"

export default function Modal(props) {
  const { isOpen, onClose, children, dialogRef } = props

  return (
    <dialog aria-modal="true" ref={dialogRef} className="modal">
      <div className="modal-children">
        {children}
      </div>
      <button
        className="x-button"
        aria-label="Close pop up"
        aria-hidden="true"
        onClick={() => dialogRef.current.close()}
      >
        x
      </button>
    </dialog>
  )
}