import React,{useEffect, useState} from 'react'
import './Recipeitem.css'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Button from '@material-ui/core/Button';
import { Room, Star, StarBorder,PersonPinCircle,LockOpen ,Lock} from "@material-ui/icons";
import { format } from "timeago.js";
import CloseIcon from '@material-ui/icons/Close';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';



const useStyles = makeStyles((theme) => ({
    cards: {
        border:'2px solid #9CBEFF',
        width:'100%',
       
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      
    },
  }));

function Recipeitem({title,image,username,visitDate,comments,description,rating}) {
     const classes = useStyles();
     const [openInst, setOpenInst] = React.useState(false);
     const handleOpenInst = () => {setOpenInst(true);};
     const handleCloseInst = () => {setOpenInst(false);};

     const [openBook, setOpenBook] = React.useState(false);
     const handleOpenBook = () => {
      //  user.currentUser == null ?  setOpenBook(true) 
      
      
      };
     const handleCloseBook = () => {setOpenBook(false);};
     const onMediaFallback = event => event.target.src = "https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2019/01/San-Francisco.jpg";


    return (
          <Card className={classes.cards} >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {username ? username[0] : 'R'}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={username}
              subheader={visitDate}
            />
              <CardActionArea>
                

                
                  <CardMedia
                      component="img"
                      alt={"Image Not Found"}
                      height="230"
                      image={image}
                      onError={onMediaFallback}

                  />
               
                  <CardContent style={{display:'flex', justifyContent: 'space-between'}}>
                  <Typography gutterBottom variant="body2" component="h2">
                    {title}
                  </Typography>
                  <div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={openBook}
                        onClose={handleCloseBook}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                        style={{
                          backdropFilter: 'saturate(180%) blur(10px)',
                      }}
                      >
                    </Modal>
                  </div>
                  </CardContent>
              </CardActionArea>
              <CardActions>
                  <div className="stats">
                      <div className="statitem">
                        <div className="stars">
                          {Array(rating).fill(<Star className="star" />)}
                        </div>
                      </div> 

                <Button variant="contained" color="primary" id="View_btn" onClick={handleOpenInst} >
                  View details
                </Button>
                
              <div className="Recipe_Modal">
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={openInst}
                  onClose={handleCloseInst}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                  style={{
                    // width : '80%',
                    // height : '70%',
                    backdropFilter: 'saturate(180%) blur(10px)',
                }}
                >
                  <Fade in={openInst}>
                  <div className="Recipe_info" > 
                    <div className="close_btn">
                        <CloseIcon onClick={handleCloseInst} style={{ background: 'rgba(0,150,255)', padding: '8px', borderRadius: '50%', color: 'white' }} />
                    </div> 

                       <div className="Nutrients_Info">
                        <h2>About the place: </h2> 
                        <p> {description}</p>
                        <div className="Nutrients_box">

                            {/* <div className="Nutrients_stats">
                              <p>Calories</p>  
                              <div className="Nutrients_values">
                                {Math.round(foodcal)?Math.round(foodcal):""} kcal
                              </div>
                            </div> */}


                        </div>
                      </div> 

                      <div className="Recipe_Instructions">  
                        <h2 style={{paddingBottom:'12px'}}>Comments: </h2>
                        <div className="Instruction">
                        <ol>
                        {/* {foodrecipe?.map((steps) =>  
                            <li key={steps.number}>{steps.step}</li>)} */}
                            {comments}
                        </ol>
                        </div>
                      </div>
                      
                        <div className="Nutrients_info username">
                          <p> Created by <b>{username}</b></p>  
                            <div className="Nutrients_values">
                              {visitDate}
                            </div>
                        </div> 
                                                                       
                    </div>
                  </Fade>
                </Modal>
               </div>
              </div>
            </CardActions>
          </Card>
       )
}

export default Recipeitem;
