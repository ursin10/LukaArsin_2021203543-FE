'use client';
import useListData from "@/hooks/useListData";
import DataTable from "react-data-table-component";
import {useEffect, useState} from "react";
import {Button, Card, CardBody, CardHeader, Row, Spinner} from "reactstrap";
import {CiEdit, CiTrash} from "react-icons/ci";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";

import {IoAddCircleOutline} from "react-icons/io5";

import AllProductDialogs from "@/elements/Product/AllProductDialogs";

export const tableColumns = [
    {
        name: 'Product name',
        selector: (row) => `${row.name}`,
        sortable: false
    },
    {
        name: 'Quantity',
        selector: (row) => `${row.number}`,
        sortable: false
    },
    {
        name: 'Options',
        selector: (row) => `${row.lastName}`,
        cell: (row) => {
            const {dispatch} = useListActions();

            return (
                <>
                    <Button className="btn btn-primary me-3" variant="outline-light" onClick={() => {
                        dispatch({
                            type: listAction.UPDATE,
                            payload: row
                        })
                    }}>
                        <CiEdit/>
                    </Button>
                    <Button className="btn btn-danger" variant="outline-light" onClick={() => {
                        dispatch({
                            type: listAction.DELETE,
                            payload: row
                        })
                    }}>
                        <CiTrash/>
                    </Button>
                </>
            );
        },
        sortable: false
    }
]

export default function ProductList() {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const {state, dispatch} = useListActions();

    const {
        getData,
        loading,
        data
    } = useListData(`product/get-page-list?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`);

    useEffect(() => {
        getData(`product/get-page-list?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`);
    }, [pageSize, pageNumber]);

    useEffect(() => {
        if (state.reload) {
            getData(`product/get-page-list?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`);
        }
    }, [state]);

    const handlePageChange = async (page) => {
        setPageNumber(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setPageNumber(page);
        setPageSize(newPerPage);
    };

    return (
        <>
            <Card>
                <CardHeader className="d-flex justify-content-end">
                    <Button className="btn btn-success me-3" variant="outline-light" onClick={() => {
                        dispatch({
                            type: listAction.CREATE
                        })
                    }}>
                        Create Product <IoAddCircleOutline/>
                    </Button>
                </CardHeader>
                <CardBody>
                    {data != null && <DataTable data={data.products}
                                                columns={tableColumns}
                                                striped={true}
                                                noHeader={true}
                                                pagination
                                                paginationServer
                                                progressPending={loading}
                                                paginationTotalRows={data.totalElements}
                                                onChangePage={handlePageChange}
                                                onChangeRowsPerPage={handlePerRowsChange}
                                                progressComponent={<Spinner color="danger">Ocitavanje...</Spinner>}
                                                highlightOnHover
                    />}
                </CardBody>
            </Card>
            <AllProductDialogs/>
        </>
    );
}
