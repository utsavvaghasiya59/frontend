import React, { useEffect, useState } from 'react';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../../componant/ChangeUserRole';

const AllUser = () => {
    const [allUser, setAllUser] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [changeUserDetails, setChangeUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""
    });

    const fetchAllUsers = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            });
            const dataResponse = await fetchData.json();

            if (dataResponse.success) {
                setAllUser(dataResponse?.data);
            } else {
                toast.error(dataResponse?.message);
            }
        } catch (error) {
            toast.error("Failed to fetch users. Please try again later.");
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div className="container mx-auto p-4 h-full flex flex-col">
            <div className="overflow-x-auto flex-1">
                <table className="min-w-full border-collapse bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="p-3 text-left">Sr No</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Role</th>
                            <th className="p-3 text-left">Created Date</th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {allUser.map((el, index) => (
                            <tr key={el._id} className="border-b hover:bg-gray-100">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3 capitalize">{el?.name}</td>
                                <td className="p-3">{el?.email}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded-full text-xs ${el.role === 'ADMIN' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                        {el?.role}
                                    </span>
                                </td>
                                <td className="p-3">{moment(el?.createdAt).format('ll')}</td>
                                <td className="p-3">
                                    <button
                                        className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-200"
                                        onClick={() => {
                                            setChangeUserDetails(el);
                                            setOpenUpdateRole(true);
                                        }}
                                    >
                                        <MdModeEdit size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {openUpdateRole && (
                <ChangeUserRole
                    onClose={() => setOpenUpdateRole(false)}
                    name={changeUserDetails.name}
                    email={changeUserDetails.email}
                    role={changeUserDetails.role}
                    userId={changeUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )}
        </div>
    );
};

export default AllUser;
