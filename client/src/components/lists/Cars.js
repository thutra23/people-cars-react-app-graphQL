import { useQuery } from "@apollo/client";
import { List } from "antd";
import { GET_CARS } from "../../queriesCars";
import Car from "../listItems/Car";

const getStyles = () =>({
    list: {
        display: 'flex',
        justifyContent: 'center'
    }
})

const Cars = () =>{
    const styles = getStyles();

    const {loading, error, data} = useQuery(GET_CARS);

    if (loading) return 'Loading...'
    if (error) return `Error1 ${error.message}` 

    return (
        <List grid={{gutter: 20, column: 1}} style={styles.list }
            dataSource = {data.cars}
            renderItem = {item=> 
                <List.Item key={item.id}>
                    <Car key={item.id} year = {item.year} make ={item.make} id={item.id} model={item.model} price={item.price} personId={item.personId} />

                </List.Item>}
        />
    )
}

export default Cars;