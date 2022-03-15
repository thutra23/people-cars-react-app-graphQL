import { useMutation } from "@apollo/client";
import { Form, Input, Button } from "antd";
import { useEffect, useState } from "react"
import { UPDATE_PERSON } from "../../queries";

const UpdatePerson = props =>{
    const [id] = useState(props.id);
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    const [updatePerson] = useMutation(UPDATE_PERSON);

    useEffect(()=>{
        forceUpdate({})
    }, [])

    const onFinish = values =>{
        const {  firstName, lastName } = values;

        updatePerson({
            variables: {
                id, 
                firstName, 
                lastName
            }, 

            optimisticResponse: {
                __typename: 'Mutation',
                updatePerson: {
                __typename: 'Person', 
                id, 
                firstName, 
                lastName
                }
            }, 

        })
        props.onButtonClick();
    }

    const updateStateVariable = (variable, value) => {
        props.updateStateVariable(variable, value);

        switch(variable) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName': 
                setLastName(value);
                break;
            default: 
                break;
        }
    }

    return (
        <Form 
        initialValues={{firstName: firstName, lastName: lastName}}
        form={form} 
        onFinish={onFinish}
        name='update-person-form' 
        layout='inline'
        size='large'
       
        >
            <Form.Item
             name="firstName"
             rules={[{required: true, message: "Please input your first name!"}]}
            >
                <Input placeholder='i.e. John' onChange={e => updateStateVariable('firstName', e.target.value)}  />
            </Form.Item>

            <Form.Item
            name="lastName"
            rules={[{required: true, message: "Please input your last name!"}]}
            >
                <Input placeholder='i.e. Smith' onChange={e => updateStateVariable('lastName', e.target.value)} />
            </Form.Item> 

            <Form.Item shouldUpdate={true}> 
                {()=>(
                    <Button 
                    type='primary'
                     htmlType='submit'
                     disabled={(!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName'))
                        || form.getFieldsError().filter(({errors})=>errors.length).length}

                    >Update Person</Button>
                )}
            </Form.Item>
            <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    )

}

export default UpdatePerson;