import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logoFondoBlanco from '../../assets/statics/logo-fondo-blanco-2.jpg'
import * as MdIcon from 'react-icons/md';
import usePatient from '../../hooks/usePatient';
import Loader from '../../components/Loader';


const Main = () => {

    const p = usePatient();

    const links = [
        { id: 1, path: "/usuario/grupo-familiar", namePath: "Grupo Familiar", icon: <MdIcon.MdOutlineGroup className="main__icon" /> },
        { id: 2, path: "/usuario/historia-clinica/hsi", namePath: "Historia de Salud Integrada", icon: <MdIcon.MdOutlineFolderShared className="main__icon" /> },
        { id: 3, path: "/usuario/calendario-vacunacion/historial", namePath: "Calendario de Vacunación", icon: <MdIcon.MdEditCalendar className="main__icon" /> },
        { id: 4, path: "/usuario/historia-clinica/programa-sumar", namePath: "Programa Sumar", icon: <MdIcon.MdAddCircleOutline className="main__icon" /> }
    ]


    return (
        <Container className="main pt-5">
            <Row className="d-flex justify-content-center">
                <Col xs={12} lg={6}>
                    <img className='main__banner' src={logoFondoBlanco} alt="logo fondo rojo - portal del paciente Chaco" />
                </Col>
            </Row>
            {p.loading
                ? <Loader isActive={p.loading}></Loader>
                : <Row className="d-flex justify-content-center p-3 in">
                    {links.map((link) =>
                        <Col key={link.id} xs={12} md={5} className='main__card'>
                            <Link className="btn-outline-primary" to={link.path}>
                                {link.icon}
                                <h5>{link.namePath}</h5>
                            </Link>
                        </Col>
                    )}
                </Row>
            }
        </Container>
    )
}

export default Main;
