import { useEffect, useState } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import "../layout/styles.css";
import { Activity } from './models/activity';
import { NavBar } from './NavBar';
import { ActivityDashboard } from '../../features/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
      axios.get<Activity[]>("http://localhost:5124/api/activities")
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

 function handleSelectActivity(id: string) {
  setSelectedActivity(activities.find(x => x.id === id))
 }
  
 function handleCancelSelectActivity() {
   setSelectedActivity(undefined);
 }

 function handleFormOpen(id?: string ) {
   id ? handleSelectActivity(id) : handleCancelSelectActivity();
   setEditMode(true);
 }
 
 function handleFormClose() {
   setEditMode(false);
 }

 function handleCreateOrEditActivity(activity: Activity) {
  activity.id 
  ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
  : setActivities([...activities, {...activity, id: uuid()}]);
  setEditMode(false);
  setSelectedActivity(activity);
 }

 function handleDeleteActivity(id: string ) {
  setActivities([...activities.filter(x => x.id !== id)])
 }

  return (
    <>
    <NavBar openForm={handleFormOpen}/>
    <Container style={{marginTop: "7en"}} >
      <ActivityDashboard 
      activities={activities} 
      openForm={handleFormOpen} 
      closeForm={handleFormClose}
      selectedActivity={selectedActivity} 
      selectActivity={handleSelectActivity}
      editMode = {editMode}
      cancelSelectActivity={handleCancelSelectActivity}
      createOrEdit={handleCreateOrEditActivity}
      deleteActivity={handleDeleteActivity}
      />
       
    </Container>
    </>
  )
}

export default App
