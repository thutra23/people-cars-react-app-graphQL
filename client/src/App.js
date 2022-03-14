import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Title from './components/layout/Title';
import PersonForm from './components/forms/PersonForm';
import People from './components/lists/People';
import CarForm from './components/forms/CarForm'


const client = new ApolloClient({
  uri:'http://localhost:4001/graphql', 
  cache: new InMemoryCache()
});

const App = () =>(
  <ApolloProvider client={client}>
    <div className="App">
     <Title />
     <PersonForm />
     <People />
     <CarForm />
    </div>
  </ApolloProvider>
 
)


export default App;
