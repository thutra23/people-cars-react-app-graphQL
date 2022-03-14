import { Form, Input, Button } from 'antd';
import { useState, useEffect } from 'react';
import { ADD_PERSON, GET_PEOPLE } from '../../queries';
import { useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';



const PersonForm = () =>{
    const [id] = useState(uuidv4())
    const [addPerson] = useMutation(ADD_PERSON)
    const [form] = Form.useForm();
    const [, forcedUpdate ] = useState();

    useEffect(()=>{
        forcedUpdate({})
    }, []);

    const onFinish = values =>{
        const { firstName, lastName } = values;

        addPerson({
            variables: {
                id, 
                firstName, 
                lastName
            }, 

            optimisticResponse: {
                __typename: 'Mutation',
                addPerson: {
                __typename: 'Person', 
                id, 
                firstName, 
                lastName
                }
            }, 

            update: (proxy, {data: { addPerson }}) => {
                 const data = proxy.readQuery({query: GET_PEOPLE})
                 proxy.writeQuery({
                     query: GET_PEOPLE,
                     data: {
                         ...data, 
                         people: [...data.people, addPerson]
                     }
                 })
            }

        })
    }

    
    return(
        <Form 
        form={form} 
        onFinish={onFinish}
        name='add-person-form' 
        layout='inline'
        size='large'
        style={{ marginBottom: '40px'}}
        >
            <Form.Item
             name="firstName"
             rules={[{required: true, message: "Please input your first name!"}]}
            >
                <Input placeholder='i.e. John' />
            </Form.Item>
            <Form.Item
            name="lastName"
            rules={[{required: true, message: "Please input your last name!"}]}
            >
                <Input placeholder='i.e. Smith' />
            </Form.Item> 

            <Form.Item shouldUpdate={true}> 
                {()=>(
                    <Button 
                    type='primary'
                     htmlType='submit'
                     disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({errors})=>errors.length).length}

                    >Add Person</Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default PersonForm;