import React, { Fragment, Component } from "react";
import TopNav from "../nav/oneNav";
import { getProduct, deleteProduct } from "../redux/action";
import { connect } from "react-redux";
import ProductModal from "../containers/productModal";
import Permission from '../helpers/permissions';
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productModal: false,
            selectedProduct: "",

        }
    }
    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.props.getProduct();
        }
    }
    productToggleModal = (data) => {

        if (data) {
            this.setState({
                productModal: !this.state.productModal,
                selectedProduct: data
            })
        } else {
            this.setState({
                productModal: !this.state.productModal
            });
        }
    }
    deleteProduct = (id) => {
        this.props.deleteProduct({ product_id: id });
    }
    componentDidUpdate() {

        console.log(this.props);
        if (this.props.productUser.addProductSuccess || this.props.productUser.updateProductSuccess) {

            this.props.productUser.updateProductSuccess = "";
            this.props.productUser.addProductSuccess = "";
            this.productToggleModal();
            this.props.getProduct();
        }
        if (this.props.productUser.deleteProductSuccess) {
            this.props.productUser.deleteProductSuccess = "";
            this.props.getProduct();
        }

    }
    render() {
        const { productModal, selectedProduct } = this.state;
        const { productArray } = this.props.productUser;
        return (
            <Fragment>
                {productModal ? (<ProductModal
                    isOpen={productModal}
                    toggleModal={this.productToggleModal}
                    productData={selectedProduct}
                />) : ""}
                <main className="wrapper-1">
                    <section id="ProductShowSection" >
                        <h1 className="display-inline">Products</h1>
                        <Permission perform="add_product" yes={() => (
                            <button className="save-button" onClick={this.productToggleModal}>Add Product</button>
                        )}>
                        </Permission>
                        <div className="row">

                            {productArray && productArray.length ? productArray.map((data, i) => (
                                <div key={i} className={" col-lg-3 col-md-6 mb-3 pl-2 pr-2"}>
                                    <Permission perform="get_product" yes={() => (
                                        <div className="demo-card ">
                                            <div className="slideBox mr-0">

                                                <img src={data.image_url} alt="image" />
                                                <h4><b>Title- </b>{data.title}</h4>
                                                <p><b>Description- </b>{data.description}</p>
                                                <p><b>Price- ₹</b>{data.price}</p>
                                                <Permission perform="edit_product" yes={() => (
                                                    <button className="continue" onClick={() => this.productToggleModal(data)} >Update</button>
                                                )}>
                                                </Permission>
                                                <Permission perform="edit_product" yes={() => (
                                                    <button className="continue mt-2" onClick={() => this.deleteProduct(data.product_id)} > Delete</button>
                                                )}>
                                                </Permission>
                                            </div>
                                        </div>
                                    )}>
                                    </Permission>
                                </div>
                            )) : <h2>Please add product to view</h2>}
                        </div>
                    </section>
                </main>
            </Fragment>
        )
    }
}
const mapStateToProps = ({ productUser }) => {
    return { productUser };
};

export default connect(
    mapStateToProps,
    {
        getProduct,
        deleteProduct

    }
)(Product);