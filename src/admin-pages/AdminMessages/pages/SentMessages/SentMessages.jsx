import { useState, useCallback, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import Loader from "../../../../components/Loader";
import { error } from "../../../../components/SwalAlertData";
import { getAllMessages } from "../../../../services/messagesServices";
import DataNotFound from '../../../../components/DataNotFound'
import CreateMessage from "../../CreateMessage";
import { Message } from "../../Message/Message";

export default function SentMessages() {

    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false)
        initMessages()
    };
    // messages
    const [messages, setMessages] = useState([])
    const allMessages = useCallback(
        () => {
            getAllMessages()
                .then((res) => {
                    if (res.length > 0) {
                        // console.log(res)
                        let sent = res.filter(m => m.sent_datetime !== null)
                        let order = sent.reverse()
                        setMessages(order)
                        setLoading(false)
                    } else {
                        throw new Error('Error al obtener mensajes')
                    }
                })
                .catch((err) => {
                    console.error(err);
                    Swal.fire(error('Error al obtener mensajes'))
                    setLoading(false)
                })
        },
        [],
    )
    useEffect(() => {
        allMessages()
    }, [])

    const initMessages = () => {
        setLoading(true)
        allMessages()
    }
    
    return (
        <Container className='p-3'>
            <div className="d-flex justify-content-end w-100">
                <Button variant="primary" onClick={handleShow}>Crear mensaje + </Button>
            </div>
            {loading ? <Loader isActive={loading} />
                : <Container>
                    <h5>Mensajes Enviados <span className="fw-light text-primary">({messages.length})</span></h5>
                    {messages.length > 0 ? messages.map((m, i) => {
                        return (
                            <Message key={m.id} header={m.header} body={m.body} idMessage={m.id} status={m.sent_datetime} initMessages={initMessages}></Message>
                        )
                    })
                        :
                        <DataNotFound text="mensajes enviados" />   
                    }
                </Container>
            }
            {show && <CreateMessage show={show} handleClose={handleClose} action={'create'} />}
        </Container>
    )
}
