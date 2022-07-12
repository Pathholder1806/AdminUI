import React, { Fragment, useEffect, useState } from "react";
import UserItem from "./UserItem";
import "./Users.css";

const Users = ({
    users,
    userSelectHandler,
    selectAllHandler,
    deleteSelected,
    toggleModal,
    populateModal,
}) => {
    const [allSelected, setAllSelected] = useState(true);

    useEffect(() => {
        setAllSelected(true);
        users.forEach((user) => {
            if (!user.selected) {
                setAllSelected(false);
            }
        });
    }, [users]);

    return (
        <Fragment>
            <table className='users-table'>
                <thead>
                    <tr>
                        <th>
                            <input
                                onChange={selectAllHandler}
                                type='checkbox'
                                checked={allSelected}
                            />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <UserItem
                                key={user.id}
                                user={user}
                                userSelectHandler={userSelectHandler}
                                deleteSelected={deleteSelected}
                                toggleModal={toggleModal}
                                populateModal={populateModal}
                            />
                        );
                    })}
                </tbody>
            </table>
        </Fragment>
    );
};

export default Users;
