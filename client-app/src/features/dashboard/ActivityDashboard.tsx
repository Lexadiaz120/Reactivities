import { Grid, List } from 'semantic-ui-react'
import { Activity } from '../../app/layout/models/activity'
import { ActivityList } from './ActivityList'
import { ActivityDetails } from './activities/ActivityDetails'
import { ActivityForm } from './activities/form/ActivityForm'

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode : boolean;
    openForm : (id: string) => void; 
    closeForm : () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

export const ActivityDashboard = ({activities, selectedActivity, deleteActivity,
    selectActivity, cancelSelectActivity, editMode, openForm, closeForm, createOrEdit } : Props) => {
  return (
     <Grid>
        <Grid.Column width="10">
            <ActivityList activities={activities}
             selectActivity={selectActivity}
             deleteActivity = {deleteActivity}
             /> 
        </Grid.Column>
        <Grid.Column width="6">
            {selectedActivity && !editMode &&
            <><ActivityDetails 
            activity={selectedActivity} 
            openForm={openForm}
            cancelSelectActivity={cancelSelectActivity} />
            <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit} /></>
 }              
        </Grid.Column>
     </Grid>
     )
    }