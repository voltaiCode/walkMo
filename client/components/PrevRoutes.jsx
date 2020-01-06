import React from 'react';
import { Table } from 'react-bootstrap';


const PrevRoutes = ({ prevRoutes }) => {
    const {
        _id,
        createdAt,
        miles,
        points
    } = info;

    return(
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>DATE</th>
                <th>MILES</th>
                <th>POINTS</th>
                </tr>
            </thead>
            <tbody>
                <tr key={_id}>
                <th>{createdAt}</th>
                <th>{miles}</th>
                <th>{points}</th>
                </tr>
            </tbody>
        </Table>
    )
}
export default PrevRoutes;