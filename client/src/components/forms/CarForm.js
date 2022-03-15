import { Form, Input, Button } from 'antd';
import { useState, useEffect } from 'react';
import { ADD_CAR, GET_CARS } from '../../queriesCars';
import { useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';



const CarForm = () =>{
    const [id] = useState(uuidv4())
    const [addCar] = useMutation(ADD_CAR)
    const [form] = Form.useForm();
    const [, forcedUpdate ] = useState();

    useEffect(()=>{
        forcedUpdate({})
    }, []);

    const onFinish = values =>{
        const { year, make, model, price, personId } = values;
        console.log(values)

        addCar({
            variables: {
                id, 
                year: parseInt(year),
                make, 
                model, 
                price: parseFloat(price), 
                personId 
            }, 

            optimisticResponse: {
                __typename: 'Mutation',
                addCar: {
                __typename: 'Car', 
                id, 
                year: parseInt(year),
                make, 
                model, 
                price: parseFloat(price), 
                personId
                }
            }, 

            update: (proxy, {data: { addCar }}) => {
                 const data = proxy.readQuery({query: GET_CARS})
                 proxy.writeQuery({
                     query: GET_CARS,
                     data: {
                         ...data, 
                         cars: [...data.cars, addCar]
                     }
                 })
            }

        })
    }

    
    return(
        <Form 
        form={form} 
        onFinish={onFinish}
        name='add-car-form' 
        layout='inline'
        size='large'
        style={{ marginBottom: '40px'}}
        >
            <Form.Item
             name="year"
             rules={[{required: true, message: "Please input the year!"}]}
            >
                <Input placeholder='i.e. 2019' />
            </Form.Item>

            <Form.Item
            name="make"
            rules={[{required: true, message: "Please input the make!"}]}
            >
                <Input placeholder='i.e. Honda' />
            </Form.Item> 

            <Form.Item
            name="model"
            rules={[{required: true, message: "Please input the model!"}]}
            >
                <Input placeholder='i.e. CRV' />
            </Form.Item> 

            <Form.Item
            name="price"
            rules={[{required: true, message: "Please input the price!"}]}
            >
                <Input placeholder='i.e. 45000' />
            </Form.Item> 

            <Form.Item
            name="personId"
            rules={[{required: true, message: "Please input the personId!"}]}
            >
                <Input placeholder='i.e. 1' />
            </Form.Item> 


            <Form.Item shouldUpdate={true}> 
                {()=>(
                    <Button 
                    type='primary'
                     htmlType='submit'
                     disabled={!form.isFieldsTouched(true) || form.getFieldError().filter(({errors})=>errors.length).length}

                    >Add Car</Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default CarForm;