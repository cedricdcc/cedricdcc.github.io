import {Table} from 'react-bootstrap';
function TaskPage() {
    return (
        <div class="containter" width="90%">
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Task</th>
                    <th>Importance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>0</td>
                    <td>queue system users</td>
                    <td>+++</td>
                    </tr>
                    <tr>
                    <td>1</td>
                    <td>disconnect valorant usr from usr login</td>
                    <td>+++</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>connect valo acc to valo api to get acc info</td>
                    <td>+++</td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td>matchmaker</td>
                    <td>+++</td>
                    </tr>
                    <tr>
                    <td>4</td>
                    <td>auto elo</td>
                    <td>++</td>
                    </tr>
                    <tr>
                    <td>5</td>
                    <td>match history per user</td>
                    <td>+</td>
                    </tr>
                    <tr>
                    <td>6</td>
                    <td>team making</td>
                    <td>+</td>
                    </tr>
                    <tr>
                    <td>7</td>
                    <td>impulsive workschedule plugin</td>
                    <td>+</td>
                    </tr>
                    <tr>
                    <td>8</td>
                    <td>mod role for site user management</td>
                    <td>+</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
    }
    
    export default TaskPage