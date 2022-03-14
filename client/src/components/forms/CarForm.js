import { Form, Input, Button } from 'antd';



const CarForm = () =>{
    return(

        <>


       
        <Form style={{color: 'red'}}>
            
            <Form.Item name="year">
                Year 
                <Input placeholder='i.e. 2000' />
            
            </Form.Item>

            <Form.Item name="make">Make
                <Input placeholder='i.e. Toyota' />

            </Form.Item>

            <Form.Item name="model">Model
                <Input placeholder='i.e. Corolla' />
            </Form.Item>


            <Form.Item name="price">Price
                <Input placeholder='i.e. 40000' />
            </Form.Item>

            
            <Form.Item name="personId">PersonId
                <Input placeholder='i.e. 1' />
            </Form.Item>

        </Form>

        </>
    )

}

export default CarForm;
