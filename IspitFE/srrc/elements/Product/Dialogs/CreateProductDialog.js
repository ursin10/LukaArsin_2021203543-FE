import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import useAuth from "@/hooks/useAuth";
import {jwtDecode} from "jwt-decode";

const CreateProductDialog = ({isOpen}) => {
    const {dispatch} = useListActions();
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
        mode: "onSubmit"
    });

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
                        {errors && errors.name && (
                            <span className="text-danger">{errors.name.message}</span>
                        )}
                    </Col>
                    <Col md={6}>
                        <input type="number" className="form-control" placeholder="Quantity" {...register("number", {
                            required: "Quantity is required!",
                            maxLength: 50,
                            minLength: 1,
                        })}/>
                        {errors && errors.quantity && (
                            <span className="text-danger">{errors.quantity.message}</span>
                        )}
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className="btn btn-success" type="button" onClick={() => {
                    handleSubmit(async (data) => {


                        data = {...data, user_id: userID};
                        console.log(data)
                        let result = await AxiosAuth.post("/product/create", data);

                        if (result && result.status === 200) {
                            toast.success("Successfully created!");
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

export default CreateProductDialog;