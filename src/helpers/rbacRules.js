export const rules = {
    //1 : Admin
    //2 : Seller
    //3 : Supporter
    //4 : Customer
    1: {
        get_product: true,
        add_product: true,
        edit_product: true,
        delete_product: true
    },
    2: {
        get_product: true,
        add_product: false,
        edit_product: false,
        delete_product: true
    },
    3: {
        get_product: true,
        add_product: true,
        edit_product: true,
        delete_product: false
    },
    4: {
        get_product: true,
        add_product: false,
        edit_product: false,
        delete_product: false
    }
}