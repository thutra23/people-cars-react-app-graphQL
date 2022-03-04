import { Card } from "antd";
import { EditOutlined } from '@ant-design/icons';

const getStyles = () => ({
    card: {
        width: '500px'
    }
})

const Person = props =>{

    const styles = getStyles();

    return (
        <Card 
        style={styles.card}
        actions={
           [ <EditOutlined key='edit'/>]
        }>
        {props.firstName}{props.lastName}

        </Card>
    )
}

export default Person;