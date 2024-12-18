import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './HomePage.scss';
import { getUserService, getPaginateService } from '../../service/userService';
import ReactPaginate from 'react-paginate';

function Items({ currentItems }) {
    return (
        <div className="items">
            {currentItems && currentItems.map((item) => (
                <div>
                    <h3>Item #{item}</h3>
                </div>
            ))}
        </div>
    );
}

function HomePage(props) {


    let itemsPerPage = 3;
    const items = [...Array(33).keys()];

    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    const [listUsers, setListUsers] = useState([]);
    useEffect(() => {
        getPaginateData(currentPage, currentLimit);
    }, [currentPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
    };



    const getPaginateData = async (pageCount, limit) => {
        let res = await getPaginateService(pageCount, limit);
        if (res && res.data && res.data.DT.totalPages) {
            setTotalPages(res.data.DT.totalPages);
            setListUsers(res.data.DT.users)
        }

    }


    return (
        <div className='homepage-container container'>
            <div className='homepage-content mt-5 '>
                <div className='homepage-title'>Table User</div>
                <div className="button-group mt-3">
                    <button className='btn btn-info'>Refresh</button>
                    <button className='btn btn-primary'>Create</button>
                </div>

                <div class="table-responsive mt-1">
                    <table class="table table-striped 
                    table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>ID</th>
                                <th>email</th>
                                <th>userName</th>
                                <th>Gender</th>
                                <th>phoneNumber</th>
                                <th>Group</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                totalPages > 0 && listUsers && listUsers.map((item, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.userName}</td>
                                                <td>{item.gender ? item.gender : 'null'}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.Group ? item.Group.name : 'null'}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                </div>

                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={4}
                    pageCount={totalPages}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />


            </div>
        </div >
    );
}

export default HomePage;