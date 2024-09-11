import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {useForm} from "react-hook-form";

import {useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";
import useAuth from "@/hooks/useAuth";
import {jwtDecode} from "jwt-decode";

const UpdateProductDialog = ({isOpen}) => {
    const {state, dispatch} = useListActions();
    const AxiosAuth = useAuth();

    const toggle = () => dispatch({
        type: listAction.RESET
    });

    const {
        register,
        watch,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm({
        mode: "onSubmit",
        defaultValues: state.row
    });

    useEffect(() => {
        setValue("id", state.row.id);
        setValue("name", state.row.name);
        setValue("number", state.row.number);
    }, [state]);

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
                <Row className="mb-3">
                    <Col md={6} className="mb-1">
                        <input type="text" className="form-control" placeholder="Name" {...register("name", {
                            required: "Name is required!",
                            maxLength: 50,
                            minLength: 3,
                        })} />
                        {errors && errors.firstName && (
                            <span className="text-danger">{errors.firstName.message}</span>
                        )}
                    </Col>
                    <Col md={6}>
                        <input type="number" className="form-control" placeholder="Quantity" {...register("number", {
                            required: "Quantity is required!",
                            maxLength: 50,
                            minLength: 1,
                        })}/>
                        {errors && errors.lastName && (
                            <span className="text-danger">{errors.lastName.message}</span>
                        )}
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className="btn btn-success" type="button" onClick={() => {
                    handleSubmit(async (data) => {
                        data = {...data, user_id: userID};
                        let result = await AxiosAuth.put("/product/update", data);

                        if (result && result.status === 200) {
                            toast.success("Successfully updated!");
                            dispatch({
                                type: listAction.RELOAD
                            });
                        }
                    })();
                }}>
                    Submit
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default UpdateProductDialog;