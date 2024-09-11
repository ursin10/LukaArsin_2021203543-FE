
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import UpdateProductDialog from "@/elements/Product/Dialogs/UpdateProductDialog";
import CreateProductDialog from "@/elements/Product/Dialogs/CreateProductDialog";
import DeleteProductDialog from "@/elements/Product/Dialogs/DeleteProductDialog";

const AllProductDialogs = ({}) => {
    const {state} = useListActions();

    return (
        <>
            <UpdateProductDialog isOpen={state.type == listAction.UPDATE}/>
            <DeleteProductDialog isOpen={state.type == listAction.DELETE}/>
            <CreateProductDialog isOpen={state.type == listAction.CREATE}/>
        </>
    );
}

export default AllProductDialogs;