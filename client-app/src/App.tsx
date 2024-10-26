import { useEffect, useState } from 'react'
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'
import { Header } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([])

  console.log(activities);


  useEffect(() => {
      axios.get("http://localhost:5124/api/activities")
      .then((response) => {
        console.log(response);
        setActivities(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])


  

  return (
    <>
      <Header as='h2' icon="users" content="Reactivities">First Header</Header>
    <ul>
      <li>
        {activities.map((activity : any) => (
          <> 
          <ul>
            <li id={activity.id}>
              {activity.title}
            </li>
          </ul>
          </>
        ))}
      </li>
    </ul>
    </>
  )
}

export default App
