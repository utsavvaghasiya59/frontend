




import React, { useEffect, useState } from 'react';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeInquiryStatus from '../../componant/ChnageInquiryStatus';
import ReactPaginate from 'react-paginate';

const AllInquiry = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const inquiriesPerPage = 20;

    const fetchAllInquiries = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.getInquiry.url, {
                method: SummaryApi.getInquiry.method,
                credentials: 'include',
            });
            const dataResponse = await response.json();

            if (dataResponse.success) {
                setInquiries(dataResponse.data);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            toast.error("Failed to fetch inquiries. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (inquiry) => {
        setSelectedInquiry(inquiry);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedInquiry(null);
    };

    useEffect(() => {
        fetchAllInquiries();
    }, []);

    // Pagination logic
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * inquiriesPerPage;
    const currentInquiries = inquiries.slice(offset, offset + inquiriesPerPage);

    return (
        <div className="container mx-auto p-4 h-full flex flex-col">
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <p>Loading inquiries...</p>
                </div>
            ) : (
                <div className="overflow-x-auto scrollbar-hide flex-1">
                    <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="p-3 text-center w-full overflow-hidden whitespace-nowrap overflow-ellipsis">Sr No</th>
                                <th className="p-3 text-center w-full overflow-hidden whitespace-nowrap overflow-ellipsis">Name</th>
                                <th className="p-3 text-center w-full overflow-hidden whitespace-nowrap overflow-ellipsis">Email</th>
                                <th className="p-3 text-center w-full overflow-hidden whitespace-nowrap overflow-ellipsis">Mobile</th>
                                <th className="p-3 text-center w-full overflow-hidden whitespace-nowrap overflow-ellipsis">Brand</th>
                                <th className="p-3 text-center w-full overflow-hidden whitespace-nowrap overflow-ellipsis">Model</th>
                                <th className="p-3 text-center w-full overflow-hidden whitespace-nowrap overflow-ellipsis">Status</th>
                                <th className="p-3 text-center w-full overflow-hidden whitespace-nowrap overflow-ellipsis">Created Date</th>
                                <th className="p-3 text-center w-full overflow-hidden whitespace-nowrap overflow-ellipsis">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {currentInquiries.map((inquiry, index) => (
                                <tr key={inquiry._id} className="border-b hover:bg-gray-100">
                                    <td className="p-3 text-center w-full overflow-hidden whitespace-nowrap overflow-ellipsis">{offset + index + 1}</td>
                                    <td className="p-3 text-center w-full overflow-hidden whitespace-nowrap overflow-ellipsis">{inquiry.firstName} {inquiry.lastName}</td>
                                    <td className="p-3 text-center w-full overflow-hidden whitespace-nowrap overflow-ellipsis">{inquiry.email}</td>
                                    <td className="p-3 text-center w-full overflow-hidden whitespace-nowrap overflow-ellipsis">{inquiry.mobile}</td>
                                    <td className="p-3 text-center w-full overflow-hidden whitespace-nowrap overflow-ellipsis">{inquiry.brand}</td>
                                    <td className="p-3 text-center w-full overflow-hidden whitespace-nowrap overflow-ellipsis">{inquiry.model}</td>
                                    <td className="p-3 text-center w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
                                        <span className={`px-2 py-1 rounded-full text-xs ${inquiry.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            inquiry.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                                inquiry.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-700'}`}>
                                            {inquiry.status}
                                        </span>
                                    </td>
                                    <td className="p-3 text-center w-full overflow-hidden whitespace-nowrap overflow-ellipsis">{moment(inquiry.createdAt).format('ll')}</td>
                                    <td className="p-3 text-center w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
                                        <button
                                            onClick={() => handleEditClick(inquiry)}
                                            className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-200"
                                        >
                                            <MdModeEdit size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && selectedInquiry && (
                <ChangeInquiryStatus
                    inquiryId={selectedInquiry._id}
                    currentStatus={selectedInquiry.status}
                    onClose={handleCloseModal}
                    refreshInquiries={fetchAllInquiries}
                />
            )}

            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={Math.ceil(inquiries.length / inquiriesPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"flex justify-center mt-4"}
                pageClassName={"mx-1"}
                pageLinkClassName={"p-2 border rounded-md"}
                previousClassName={"mx-1"}
                nextClassName={"mx-1"}
                activeClassName={""}
                disabledClassName={"text-gray-400"}
            />
        </div>
    );
};

export default AllInquiry;
