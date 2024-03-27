import React from 'react'
import { TListUsersC } from './types'
import './styles.css'
import { Pagination } from '../components'
import { EditIcon, FileIcon, TrashIcon } from '../../common/icons'
import { Link } from 'react-router-dom'
import { ModalDeleteUser } from '../components/ModalDeleteUser'

export const ListUsersC = ({
  data: {users, currentPage, totalPages, titleMap, showModal, userIdToDelete}, 
  handlePageChange,
  deleteUser,
  setShowModal,
  handleDeleteUser
}: TListUsersC) => {
  return (
    <div>
      <div className='boxEnd'>
        <Link to="/create/" className="btn btn-primary">
          Crear usuario
        </Link>
      </div>
      <table className="table table-striped table-manual-styles">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombres y Apellidos</th>
            <th>Foto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((row, index) => (
            <tr key={index}>
              <td>{row.id}</td>
              <td>{titleMap[row.title] || 'Otros'} {row.firstName} {row.lastName}</td>
              <td><img className='img-table' src={row.picture}/></td>
              <td>
                <button type="button" className="btn btn-danger" onClick={() => handleDeleteUser(row.id)}><TrashIcon/></button>
                <Link to={`/create/${row.id}`} className="btn btn-primary">
                  <EditIcon />
                </Link>
                <Link to={`/create/${row.id}?detail=true`} className="btn btn-info">
                  <FileIcon />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination 
        currentPage={currentPage} 
        handlePageChange={handlePageChange} 
        totalPages={totalPages}
      />
      {showModal && <ModalDeleteUser setShowModal={setShowModal} id={userIdToDelete} handelAction={deleteUser}/>}
    </div>
  )
}
