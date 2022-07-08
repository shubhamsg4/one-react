import React, { Component } from 'react';
import { connect } from "react-redux";
import { Modal, ModalBody } from "reactstrap";
import { updateProduct, addProduct, getProduct } from "../redux/action";
import * as authService from '../helpers/authService';
class ProductModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.productData ? props.productData.title : "",
            description: props.productData ? props.productData.description : "",
            price: props.productData ? props.productData.price : "",
            imageUrl: props.productData ? props.productData.image_url : "",
            productId: props.productData ? props.productData.product_id : "",
            isEdit: props.productData && props.productData.product_id ? true : false,
            errors: {
                required: {
                    title: true,
                    description: true,
                    price: true,
                    imageUrl: true,
                }
            },
        }
    }
    handleChange = (e) => {
        e.preventDefault();
        let errors = {}
        if (e.target.value.length) {
            errors = {
                required: { ...this.state.errors.required, [e.target.name]: false },
            }
        }
        else {
            errors = {
                required: { ...this.state.errors.required, [e.target.name]: true },
            }
        }
        this.setState({
            [e.target.name]: e.target.value,
            errors: { ...this.state.errors, ...errors }

        });

    }
    componentDidMount() {
        if (this.state.isEdit) {
            let errors = {
                required: {
                    title: false,
                    description: false,
                    price: false,
                    imageUrl: false,
                }
            }
            this.setState({
                errors: errors
            })
        }
    }

    componentDidUpdate() {
        if (this.props.productUser.addProductSuccess || this.props.productUser.updateProductSuccess) {

            this.props.updateProductSuccess = "";
            this.props.addProductSuccess = "";
            this.productToggleModal();
            this.props.getProduct();
        }
    }
    isFormInvalid() {
        const { errors } = this.state;
        const { required, valid } = errors;
        const isSomeFieldRequired = Object.keys(required).some(
            (error) => required[error]
        );

        return isSomeFieldRequired;
        // return false;
    }
    saveProduct = () => {
        const { title, description, imageUrl, price, isEdit, productId } = this.state;
        let product = {
            title,
            description,
            price,
            image_url: imageUrl
        }
        if (isEdit) {
            product = { ...product, product_id: productId }
            this.props.updateProduct(product, this.props.history);
        }
        else {
            console.log(authService.getProfile().user.user_id);
            let created_by = authService.getProfile().user.user_id
            product = { ...product, created_by }
            this.props.addProduct(product, this.props.history)
        }
    }
    render() {
        const { loading } = this.props.productUser;
        const { isEdit, title, description, imageUrl, price } = this.state;
        const { isOpen, toggleModal, productData } = this.props;
        return (
            <Modal
                isOpen={isOpen}
                toggle={toggleModal}
                backdrop="static"
                className="dashBoardModal modal-dialog-centered auth-modal"
            >
                <ModalBody className="loginModal plr-0 pt-0 pb-0">
                    <span onClick={toggleModal}>
                        <div className="closeModal plr-1" style={{ float: "right" }}>
                            <img alt="close" src={require('../assets/images/close.png')} />
                        </div>
                    </span>
                    <div className="container" style={{ overflow: 'auto' }}>
                        <div className="main-content">
                            <div className="container-fluid" id="loginSection">
                                <div className="row align-items-center">
                                    <div className={this.props.className}>
                                        <h5 className="mt-3 font-weight-bolder">{isEdit ? "Update Product" : "Add Product"}</h5>
                                        <div className="form-group mb-2">
                                            <label className="registerModal_label" htmlFor="Inputname">Product Title *</label>
                                            <input type="text" className="form-control" name="title" id="Inputname" aria-describedby="name" placeholder="Product Title" value={title} required onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="registerModal_label" htmlFor="exampleInputusername">Product Description *</label>
                                            <input type="username" className="form-control" aria-describedby="username" placeholder="username" name="description" value={description} required onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group mb-2 passwd">
                                            <label className="registerModal_label" htmlFor="InputPassword">Product Thumbnail URL*</label>
                                            <input type="text" name="imageUrl" className="form-control" placeholder="thumbnail link" value={imageUrl} required onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group mb-2 passwd">
                                            <label className="registerModal_label" htmlFor="InputPassword">Product Price *</label>
                                            <input type="text" name="price" className="form-control" placeholder="price" required value={price} onChange={this.handleChange} />
                                        </div>
                                        <button type="button" className="continue mb-4" onClick={this.saveProduct} disabled
                                            disabled={this.isFormInvalid()}
                                        >
                                            <div className={`${loading ? 'd-none' : 'd-block'}`}>Save</div>
                                            <div id="wave" className={`${loading ? 'd-block' : 'd-none'}`}>
                                                <span className="dot"></span>
                                                <span className="dot"></span>
                                                <span className="dot"></span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}

const mapStateToProps = ({ productUser }) => {
    return { productUser };
};

export default connect(
    mapStateToProps,
    {
        updateProduct,
        addProduct,
        getProduct

    }
)(ProductModal);