import { Card } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { useState } from "react";
import UpdatePerson from "../forms/UpdatePerson";
import RemovePerson from "../buttons/RemovePerson";

const getStyles = () => ({
    card: {
        width: '500px'
    }
})

const Person = props =>{

    const [id] = useState(props.id);
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [editMode, setEditMode] = useState(false);

    const styles = getStyles();



    const handleButtonClick = props =>{
        setEditMode(!editMode);
    }

    const updateStateVariable = (variable, value) => {
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

        <div>
            { editMode ? (
                <UpdatePerson 
                 id ={props.id}
                 firstName={props.firstName}
                 lastName={props.lastName}
                 onButtonClick={handleButtonClick}
                 updateStateVariable={updateStateVariable}
                  />

            ): (

                  <Card 
                  style={styles.card}
                  actions={
                     [ <EditOutlined key='edit' onClick={handleButtonClick}/>,  <RemovePerson
                     id={id} firstName={firstName} 
                     lastName={lastName}/>]
                  }
                  >
                  {firstName}{lastName}
          
                  </Card>
            )
            }
           
        </div>
    )
}

export default Person;