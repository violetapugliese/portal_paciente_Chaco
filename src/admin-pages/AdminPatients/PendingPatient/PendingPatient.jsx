import { useCallback, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { error } from "../../../components/SwalAlertData";
import EnablePatient from "../EnablePatient/EnablePatient";
// import DataNotFound from "../../components/DataNotFound";

export default function PendingPatient({ name, status_id, status_name, id }) {

    const [show, setShow] = useState(false);  //hardcode
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
    return (
        <>
            <Row className="admin-patients__patient" onClick={handleShow} >
                <Col xs={12} md={9}>
                    <p>{name} <span className="fw-lighter ms-1">ID #{id}</span></p>
                </Col>
                    <Col xs={12} md={3}>
                        <div className={`status-container bg-${status_id}`}>
                            <p>{status_name}</p>
                        </div>
                    </Col>
            </Row>
            <EnablePatient show={show} handleClose={handleClose} id={id} />
        </>
    )
}
