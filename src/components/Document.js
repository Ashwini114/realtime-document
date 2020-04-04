import React from "react"

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const Document = ({classes,allUsers}) =>{
    return(
        <div>

        <Card className={classes.documentCard} variant="outlined" >
        <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div>
            <h1>
              Document title
            </h1>
            <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <List>
               {
                allUsers.map((item,index)=>{
                  let color = ((item.online==true)?{color:"green"}:{color:"grey"})
                  let lastSeen = new Date(item.updatedAt)
                  
                  return(
                    <ListItem key={index}>
                    <ListItemText style={color} primary={item.first_name} secondary={(item.online==true)?"Online":"Last seen at :"+lastSeen.toDateString()+" "+lastSeen.toTimeString().split(" ")[0]} />
                  </ListItem>
                  )

                })

               
               }
              </List>
            </div>
          </Grid>
          
          </Grid>

     

        </CardContent>
       
        
     

        </Card>
        </div>
    )
}

export default Document