import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dateFormat from "dateformat";
function FormReservationsComponent(props) {
    let { id } = useParams();
    const [clients, setClients] = useState([])
    const [chambres, setChambres] = useState([])

    const [formData, setFormData] = useState({
        clientId: "",
        chambreId: "",
        date: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData, "test")
    };

    const getChambres = () => {
        axios.get(`${process.env.REACT_APP_API_SERVER}/services/chambreSoa/_getselect`).then((result) => {
            setChambres(result.data.entries.entry)
        });
    }

    const getClients = () => {
        axios.get(`${process.env.REACT_APP_API_SERVER}/services/clientSoa/_getselect`).then((result) => {
            setClients(result.data.entries.entry)
        });
    }

    // GET BY ID IF EDIT -------------------------------------------------------------------------------------------------------------------------
    const getReservationById = () => {
        axios.get(`${process.env.REACT_APP_API_SERVER}/services/reservationSoa/_getbyid?id=${id}`).then((result) => {
            setFormData({ ...result.data.entries.entry[0], id: id });
            console.log("🚀 ~ file: FormReservationsComponent.js ~ line 37 ~ getReservationById ~ result", result.data.entries.entry[0]);
        });
    };

    useEffect(() => {
        if (id) {
            getReservationById();
        }
        getClients();
        getChambres();
    }, [id]);

    return (
        <div className="container">
            <form>
                <div className="form-group mt-2">
                    <label>Client</label>
                    <select className="form-select" name="clientId" value={formData.clientId || "DEFAULT"} onChange={(e) => handleChange(e)}>
                        <option value="DEFAULT" disabled>-Selectionnez client-</option>
                        {clients && clients.map((client, index) => {
                            return <option key={index} value={client.id}>{client.nom}</option>
                        })}
                    </select>
                </div>
                <div className="form-group mt-2">
                    <label>Chambre</label>
                    <select className="form-select" name="chambreId" value={formData.chambreId || "DEFAULT"} onChange={(e) => handleChange(e)}>
                        <option value="DEFAULT" disabled>-Selectionnez chambre-</option>
                        {chambres && chambres.map((chambre, index) => {
                            return <option key={index} value={chambre.id}>{chambre.numero}</option>
                        })}
                    </select>
                </div>
                <div className="form-group mt-2">
                    <label>Date</label>
                    <input type="date" value={formData.date} className="form-control" name="date" onChange={(e) => handleChange(e)} />
                </div>

                {id ? (
                    <button type="submit" className="btn btn-primary mt-3" onClick={(e) => (e.preventDefault(), props.updateReservation(formData, id))}>
                        Modifier
                    </button>
                ) : (
                    <button type="submit" className="btn btn-primary mt-3" onClick={(e) => (e.preventDefault(), props.postReservation(formData))}>
                        Ajouter
                    </button>
                )}
            </form>
        </div>
    )
}

export default FormReservationsComponent