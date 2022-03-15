import { Card } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { useState } from "react";
import UpdatePerson from "../forms/UpdatePerson";
import RemovePerson from "../buttons/RemovePerson";
import { GET_CARS } from "../../queriesCars";
import { useQuery } from "@apollo/client";
import Car from "./Car";

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
    const {data} = useQuery(GET_CARS);

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
                  {firstName} {lastName}


                  {/* render car card */}
                  {data?.cars.map(car => {
                      if (car.personId === id)  {
                          return (
                              <Car key={car.id} id={car.id} year={car.year} make={car.make} model={car.model} price={car.price} personId={car.personId} />
                          )
                      } else {
                          return null
                      }
                  })}
          
                  </Card>
            )
            }
           
        </div>
    )
}

export default Person;