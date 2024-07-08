import { useState, useEffect } from "react";
import { httpRequest } from "../API/api"
const Caretaker = () => {
    const [caretakingList, setCaretakingList] = useState([])
    useEffect(() => {
        httpRequest('get', "api/user/getallCaretaking").then((res) => {
            setCaretakingList(res.data);
            console.log(caretakingList);
        }).catch(error => {
            console.error("Error fetching data:", error);
        });
    }, []);
    console.log(caretakingList);
    const tableHeadding = [{ th: "#id" }, { th: "owner_name" }, { th: "phone_no" }, { th: "id_proof" }, { th: "pickup" }, { th: "deliver" }, { th: "hostel" }, { th: "address" }, { th: "Action" },];
    return (
        <div className="flat-container content-div">
            <div className="card-header">
                <div className="card-headding">Caretaking Services</div>
            </div>
            <div className="">
                <table className="table-container table">
                    <thead>
                        <tr className="table-headding">
                            {
                                tableHeadding.map((eachHeadding, id) =>
                                    <td key={id}>{eachHeadding.th}</td>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {caretakingList.map((caretaker, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{caretaker.owner_name}</td>
                                    <td>{caretaker.phone_no},{caretaker.alt_phone_no}</td>
                                    <td>{caretaker.proof}</td>
                                    <td>{caretaker.pickup}</td>
                                    <td>{caretaker.deliver}</td>
                                    <td>{caretaker.hostel}</td>
                                    <td>{caretaker.address}</td>
                                    <td>Update Status</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Caretaker
