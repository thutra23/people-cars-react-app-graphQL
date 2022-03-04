import { Form } from 'antd';

const CarForm = () =>{
    return(
        <Form>
            <Form.Item name="year">Year</Form.Item>
            <Form.Item name="make">Make</Form.Item>
            <Form.Item name="model">Model</Form.Item>
            <Form.Item name="price">Price</Form.Item>
            <Form.Item name="personId">PersonId</Form.Item>

        </Form>
    )

}

export default CarForm;