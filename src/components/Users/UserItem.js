import React from "react";
import "./UserItem.css";

const UserItem = ({
    user,
    userSelectHandler,
    deleteSelected,
    toggleModal,
    populateModal,
}) => {
    return (
        <tr className={`${user.selected ? "selected" : ""}`}>
            <td>
                <input
                    onChange={() => {
                        userSelectHandler(user.id);
                    }}
                    type='checkbox'
                    checked={user.selected}
                />
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
                <div className='user-action'>
                    <button
                        onClick={() => {
                            populateModal(user.id);
                            toggleModal();
                        }}
                        className='action-btn action-btn-edit'
                    >
                        <ion-icon name='create-outline'></ion-icon>
                    </button>
                    <button
                        onClick={() => {
                            deleteSelected(user.id);
                        }}
                        className='action-btn action-btn-delete'
                    >
                        <ion-icon name='trash-outline'></ion-icon>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default UserItem;
