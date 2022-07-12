import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Container from "./components/Container/Container";
import Search from "./components/Search/Search";
import Users from "./components/Users/Users";
import Pagination from "./components/Pagination/Pagination";
import BackDrop from "./components/UpdateModal/BackDrop";
import Modal from "./components/UpdateModal/Modal";

const App = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [userToBeUpdated, setUserToBeUpdated] = useState({});

    const userPerPage = 10;

    useEffect(() => {
        const getData = async () => {
            const url =
                "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
            const res = await axios(url);
            const fetchedUsers = res.data;

            fetchedUsers.forEach((user) => {
                user.selected = false;
            });
            setUsers(fetchedUsers);
        };
        getData();
    }, []);

    let searchedUsers = [...users];

    if (search && search.length > 0) {
        searchedUsers = users.filter((user) => {
            return (
                user.name.includes(search) ||
                user.role.includes(search) ||
                user.email.includes(search)
            );
        });
    }

    useEffect(() => {
        setCurrentPage(1);

        const newUsers = [...users];
        newUsers.forEach((user) => {
            user.selected = false;
        });

        setUsers(newUsers);
    }, [setCurrentPage, search]);

    useEffect(() => {
        users.forEach((user) => {
            user.selected = false;
        });
    }, [currentPage]);

    const last = currentPage * userPerPage;
    const first = last - userPerPage;

    const visibleUsers = searchedUsers.slice(first, last);

    useEffect(() => {
        if (visibleUsers.length === 0) {
            setCurrentPage(1);
            setSearch("");
        }
    }, [visibleUsers]);

    const userSelectHandler = (id) => {
        const newUsers = [...users];

        newUsers.forEach((user) => {
            if (user.id === id) {
                user.selected = !user.selected;
            }
        });
        setUsers(newUsers);
    };

    const selectAllHandler = () => {
        let areAllSelected = true;

        const visibleUserIds = [];

        visibleUsers.forEach((user) => {
            visibleUserIds.push(user.id);
            if (!user.selected) {
                areAllSelected = false;
            }
        });

        const newUsers = [...users];

        if (areAllSelected) {
            newUsers.forEach((user) => {
                if (visibleUserIds.includes(user.id)) {
                    user.selected = false;
                }
            });
        } else {
            newUsers.forEach((user) => {
                if (visibleUserIds.includes(user.id)) {
                    user.selected = true;
                }
            });
        }

        setUsers(newUsers);
    };

    const deleteSelected = (id) => {
        const newUsers = users.filter((user) => user.id !== id);
        setUsers(newUsers);
    };

    const deleteAllSelected = () => {
        const newUsers = users.filter((user) => {
            return !user.selected;
        });

        setUsers(newUsers);
    };

    const updateUser = (updatedName, updatedEmail, updatedRole) => {
        const newUsers = [...users];

        newUsers.forEach((user, idx) => {
            if (user.id === userToBeUpdated.id) {
                newUsers[idx].name = updatedName;
                newUsers[idx].email = updatedEmail;
                newUsers[idx].role = updatedRole;
            }
        });

        setUsers(newUsers);
        if (search.length > 0) {
            setSearch("");
        }
        toggleModal();
    };

    const toggleModal = () => {
        setShowModal((prevState) => !prevState);
    };

    const populateModal = (id) => {
        const user = users.filter((user) => user.id === id);
        setUserToBeUpdated(user[0]);
    };

    return (
        <div className='App'>
            {showModal && (
                <BackDrop>
                    <Modal
                        user={userToBeUpdated}
                        toggleModal={toggleModal}
                        updateUser={updateUser}
                    />
                </BackDrop>
            )}
            <Container>
                <Search search={search} setSearch={setSearch} />
                <Pagination
                    totalUsers={searchedUsers.length}
                    userPerPage={userPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <Users
                    users={visibleUsers}
                    userSelectHandler={userSelectHandler}
                    selectAllHandler={selectAllHandler}
                    deleteSelected={deleteSelected}
                    toggleModal={toggleModal}
                    populateModal={populateModal}
                />
                <button onClick={deleteAllSelected} className='delete-all'>
                    Delete Selected
                </button>
            </Container>
        </div>
    );
};

export default App;
