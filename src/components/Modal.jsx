import { useEffect, useRef } from "react"

export default function Modal(props) {
  const { isOpen, onClose, children, dialogRef } = props

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-children">
        {children}
      </div>
      <button onClick={() => dialogRef.current.close()} className="x-button">
        x
      </button>
    </dialog>
  )
}