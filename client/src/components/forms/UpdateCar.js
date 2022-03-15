import { useMutation } from "@apollo/client";
import { Form, Input, Button } from "antd";
import { useEffect, useState } from "react"
import { UPDATE_CAR } from "../../queriesCars";

const UpdateCar = props =>{
    const [id] = useState(props.id);
    const [year, setYear] = useState(props.year);
    const [make, setMake] = useState(props.make);
    const [model, setModel] = useState(props.model);
    const [price, setPrice] = useState(props.price);
    const [personId, setPersonId] = useState(props.personId);


    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    const [updateCar] = useMutation(UPDATE_CAR);

    useEffect(()=>{
        forceUpdate({})
    }, [])

    const onFinish = values =>{
        const {  year, make, model, price, personId } = values;

        updateCar({
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
                updateCar: {
                __typename: 'Car', 
                id, 
                year: parseInt(year), 
                make, 
                model, 
                price: parseFloat(price), 
                personId
                }
            }, 

        })
        props.onButtonClick();
    }

    const updateStateVariable = (variable, value) => {
        props.updateStateVariable(variable, value);

        switch(variable) {
            case 'year':
                setYear(value);
                break;
            case 'make': 
                setMake(value);
                break;
            case 'model': 
                setModel(value);
                break;
            case 'price': 
                setPrice(value);
                break;
            case 'personId':
                setPersonId(value);
                break;  


            default: 
                break;
        }
    }

    return (
        <Form 
        initialValues={{year: year, make: make, model: model, price: price, personId: personId}}
        form={form} 
        onFinish={onFinish}
        name='update-car-form' 
        layout='inline'
        size='large'
       
        >
            <Form.Item
             name="year"
             rules={[{required: true, message: "Please input the year of the car!"}]}
            >
                <Input placeholder='i.e. 2019' onChange={e => updateStateVariable('year', e.target.value)}  />
            </Form.Item>

            <Form.Item
            name="make"
            rules={[{required: true, message: "Please input the make of the car!"}]}
            >
                <Input placeholder='i.e. Honda' onChange={e => updateStateVariable('make', e.target.value)} />
            </Form.Item> 

            <Form.Item
            name="model"
            rules={[{required: true, message: "Please input the model of the car!"}]}
            >
                <Input placeholder='i.e. Civic' onChange={e => updateStateVariable('model', e.target.value)} />
            </Form.Item> 

            <Form.Item
            name="price"
            rules={[{required: true, message: "Please input the price of the car!"}]}
            >
                <Input placeholder='i.e. 40000' onChange={e => updateStateVariable('price', e.target.value)} />
            </Form.Item> 

            <Form.Item
            name="personId"
            rules={[{required: true, message: "Please input the personId of the car!"}]}
            >
                <Input placeholder='i.e. 1' onChange={e => updateStateVariable('personId', e.target.value)} />
            </Form.Item> 


            <Form.Item shouldUpdate={true}> 
                {()=>(
                    <Button 
                    type='primary'
                     htmlType='submit'
                    //  disabled={(!form.isFieldTouched('year') && !form.isFieldTouched('make') && !form.isFieldTouched('model') && !form.isFieldTouched('price') && !form.isFieldTouched('personId'))
                    //     || form.getFieldsError().filter(({errors})=>errors.length).length}

                    >Update Car</Button>
                )}
            </Form.Item>
            <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    )
}

export default UpdateCar;