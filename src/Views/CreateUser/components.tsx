import React from 'react'
import { TCreateUserC } from './types'
import './styles.css'
import { Link } from 'react-router-dom'

export const CreateUserC = ({data: {form, titles, selectedTitle,selectedGender, genders, stateDetail},handleGenderChange, handleTitleChange, handleChange, handleSubmit}: TCreateUserC) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {form?.id && ( // Mostrar el campo de ID solo si existe en el objeto form
          <div className="form-group boxContainer">
            <label>Id</label>
            <input value={form.id} name="id" onChange={handleChange} className="form-control" id="id" disabled/>
          </div>
        )}
        <div className="form-group boxContainer">
          <label>Título</label>
          <select disabled={stateDetail} className="form-select" aria-label="Default select example" value={selectedTitle} onChange={handleTitleChange}>
            <option value="">Seleccione el título</option>
            {titles.map((title) => (
              <option key={title.value} value={title.value}>{title.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group boxContainer">
          <label >Nombres</label>
          <input type="text" value={form?.firstName} disabled={stateDetail} name="firstName" onChange={handleChange} className="form-control" id="firstName" />
        </div>
        <div className="form-group boxContainer">
          <label >Apellidos</label>
          <input type="text" value={form?.lastName} name="lastName" disabled={stateDetail} onChange={handleChange} className="form-control" id="lastName" />
        </div>
        <div className="form-group boxContainer">
          <label >Imagen</label>
          <input type="text" value={form?.picture} name="lastName" disabled={stateDetail} onChange={handleChange} className="form-control" id="lastName" />
        </div>
        <div className="form-group boxContainer">
          <label>Genero</label>
          <select disabled={stateDetail} className="form-select" aria-label="Default select example" value={selectedGender} onChange={handleGenderChange}>
            <option value="">Seleccione el genero</option>
            {genders.map((gender) => (
              <option key={gender.value} value={gender.value}>{gender.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group boxContainer">
          <label>Correo electrónico</label>
          <input disabled={stateDetail} type="email" value={form?.email} name="email" onChange={handleChange} className="form-control" id="email" aria-describedby="emailHelp"/>
        </div>
        <div className="form-group boxContainer">
          <label>Fecha de nacimiento</label>
          <input disabled={stateDetail} type="date" value={form?.dateOfBirth ? form.dateOfBirth.toISOString().split('T')[0] : ''} name="dateOfBirth" onChange={handleChange} className="form-control" id="email" aria-describedby="emailHelp"/>
        </div>
        <div className="form-group boxContainer">
          <label>Teléfono</label>
          <input disabled={stateDetail} type="text" value={form?.phone} name="email" onChange={handleChange} className="form-control" id="email" aria-describedby="emailHelp"/>
        </div>
        <div className='boxContainer boxButtons'>
          <button type="submit" className="btn btn-primary" >Guardar</button>
          <div>
            <Link to="/" className="btn btn-primary">
              Cancelar
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
