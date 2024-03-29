import Table from "../components/Table";
const Order=()=>{
    const tableHeadding = [
        {
            th: "#id"
        },
        {
            th: "Name"
        },
        {
            th: "Age"
        },
        {
            th: "Address"
        },
        {
            th: "Action"
        },
    ];
    const tableValues = [
        {
            id: 10,
            name: "Aravind",
            age: 19,
            address: "sreenandanam muthupilakkadu",
            action: "btn-warning",
        },
        {
            id: 11,
            name: "Siva",
            age: 19,
            address: "Siva bhavan",
            action: "btn-danger",
        },
         
    ];
    const tableCardHeadding=
        {
            tableHeadding:"Order Details",
            // buttonText:"Add Product",
            // link:"/addproduct"
        };
    return(
        <>
         <Table tableCardHeadding={tableCardHeadding} tableHeadding={tableHeadding} tableValues={tableValues} />
        </>
    );
}
export default Order;
