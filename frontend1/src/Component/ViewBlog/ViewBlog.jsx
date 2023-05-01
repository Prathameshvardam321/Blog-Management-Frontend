import React, { useEffect, useState } from "react";
import "./ViewBlog.css";
// import { Box, Button, TextField, CardContent } from "@mui/material";
import { deleteBlogsService } from "../../Services/blogs.service";
import Header from "../../Header/Header";
import Comments from "../../Comment/Comments";
import App from "../Popper/App";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { sendTypeImage } from "../../Utils/ImageSelectionByType";
import { getPostByIdService } from "../../Services/blogs.service";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Card from "@mui/material/Card";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DateDisplay from "../../Utils/DateDisplay";
import { DeleteForever, Share } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { likeButtonService } from "../../Services/blogs.service";
import iamge from '../../assest/blog12.jpg'
function ViewBlog(props) {
  const [data1, setData1] = useState();
  const [isLiked, setIsLiked] = useState()
  const fetch = async () => {
    const data = await getPostByIdService(id);
    await setData1(data.data.data[0]);
    setObj((prev) => ({
      ...prev,
      Title: data.data.data[0].Title,
      Description: data.data.data[0].Description,
      putImage: sendTypeImage(data.data.data[0].Type),
      Author: data.data.data[0].Email,
      Views: data.data.data[0].Views.length,
      createdAt: data.data.data[0].createdAt,
      underId: data.data.data[0]._id,
      Type: data.data.data[0].Type,
      numberOfLikes: data.data.data[0].Likes.length

    }));
  
  };
  const dataprops = async () => {
    const data = await getPostByIdService(obj.underId)
    return data
  }
  
  const { idParams } = useParams()
  const authorName = localStorage.getItem('author')
  const navigate = useNavigate()
  const onClickDeleteIcon = async () => {
    const data = await deleteBlogsService(idParams)
    console.log(data);
    navigate("/dashboard")
  }

  const [obj, setObj] = useState({
    Title: "",
    Description: "",
    putImage: "",
    Author: "",
    Views: 0,
    createdAt: "",
    underId: "",
    Type: "",
    numberOfLikes: 0
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  const { id } = useParams();

  const likeButton = async () => {
    const data = await likeButtonService(id, authorName)
    console.log("DARARATAF....",data);
    if (data.data.data.Likes.includes(authorName)) {
      setIsLiked(true)
      setObj((prev)=>({
        ...prev,numberOfLikes:obj.numberOfLikes+1
      }))
    } else if (!data.data.data.Likes.includes(authorName)) {
      setIsLiked(false)
      setObj((prev)=>({
        ...prev,numberOfLikes:obj.numberOfLikes-1
      }))
      
    }
    fetch()
  }
  const [visible, setVisible] = useState(false)
  const seeComments = () => {
    setVisible(!visible)
  }
   const checkInitialStateOfLike = async() =>{
    const data = await getPostByIdService(id)
   
    if (await data.data.data[0].Likes.includes(authorName)) {
      setIsLiked(true)
      fetch()
    }
   }

 
  useEffect(() => {
   
    fetch();
    checkInitialStateOfLike()
 
  }, []);
  return (
    <div  style={{ paddingBottom: '30px' }}>
      <Header />
      <div className="mainBody" style={{ paddingTop: "4rem" }}>
        <Card sx={{ maxWidth: 1000, margin: "auto" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              src={require('../../assest/ad123.png')}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {obj.Title}
              </Typography>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                -{obj.Author}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <div className="con-par2" style={{ marginLeft: "23px" }}>
                  {" "}
                  <VisibilityIcon style={{ marginRight: "5px" }} />
                  {obj.Views}
                </div>
                <div>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    {authorName == obj.Author ? <div style={{ display: 'flex' }}>
                      <div > <DeleteForever onClick={onClickDeleteIcon} className='deleteBtnclass' /></div>
                      <Link to={`/editBlog/${obj.underId}`}>
                        <div>
                          <Edit style={{ marginLeft: '5px' }} className='editBtnclass' />
                        </div>
                      </Link>
                    </div> : null}
                  </IconButton>

                </div>
              </div>

              <Typography variant="body2" color="text.secondary">
                {obj.Description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          ><div style={{ marginLeft: "10px", marginBottom: '10px' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#873F1", height: '30px' }}
              >
                {obj.Type}
              </Button>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <Button onClick={likeButton}
                variant="contained"
                style={{ backgroundColor: "#8739F9", height: '30px' }}
              >

                {isLiked ? <FavoriteIcon style={{ fontSize: '25px', color: 'red', fontWeight: 900, cursor: 'pointer' }} /> :

                  <FavoriteBorderIcon style={{ fontSize: '23px', cursor: 'pointer' }} />
                }<div style={{ marginLeft: '3px', marginRight: '3px' }}>
                  {obj.numberOfLikes}
                </div>

                Likes
              </Button>
            </div>
            <div style={{ paddingTop: "10px" }}>
              <Button onClick={seeComments} style={{ height: '31px' }} variant="contained">Comment</Button>


            </div>
            <div style={{ marginTop: '10px', display: 'flex' }}>
              <App id={obj.underId} valueOfType={"viewblog"} />
              <div style={{ marginLeft: '370px' }}>
                <DateDisplay date={obj.createdAt} />
              </div>


            </div>
          </CardActions>
        </Card>
        {visible && <Comments post={dataprops} postAuthor={obj.Author} id={idParams} />}
      </div>

    </div>

  );
}


export default ViewBlog;