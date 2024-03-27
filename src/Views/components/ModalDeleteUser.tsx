import React from 'react'

export const ModalDeleteUser = ({
    id,
    setShowModal,
    handelAction}:{
        id: string,
        handelAction: (id: string) => Promise<void>
        setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    }) => {
  return (
    <div className="modal fade show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              Desea eliminar al usuario con el ID {id}?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              <button type="button" className="btn btn-danger" onClick={() => handelAction(id)}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
  )
}
