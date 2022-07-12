import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ user, toggleModal, updateUser }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);

    return (
        <div className='update-modal'>
            <h1 className='modal-heading'>Update Record</h1>
            <form className='update-form'>
                <div className='form-group'>
                    <label className='form-label'>Name</label>
                    <input
                        className='form-input'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label'>Email</label>
                    <input
                        className='form-input'
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label'>Role</label>
                    <select
                        className='form-input'
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value='admin'>Admin</option>
                        <option value='member'>Member</option>
                    </select>
                </div>
                <div className='form-action'>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            updateUser(name, email, role);
                        }}
                        className='form-btn'
                        type='submit'
                    >
                        Update
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleModal();
                        }}
                        className='form-btn form-btn-cancel'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Modal;
