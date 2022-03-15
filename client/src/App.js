import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Title from './components/layout/Title';
import PersonForm from './components/forms/PersonForm';
import People from './components/lists/People';
import CarForm from './components/forms/CarForm'
import Cars from './components/lists/Cars';


const client = new ApolloClient({
  uri:'http://localhost:4001/graphql', 
  cache: new InMemoryCache()
});

const App = () =>(
  <ApolloProvider client={client}>
    <div className="App">
     <Title />
     <h2>ADD A PERSON</h2>
     <PersonForm />
     <h2>ADD A CAR</h2>
     <CarForm />
     <People />
     <Cars/>
    </div>
  </ApolloProvider>
 
)


export default App;
