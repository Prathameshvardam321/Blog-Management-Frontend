import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PopperPopupState from '../Popper/Popper';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import App from '../Popper/App';
import { viewPostService } from '../../Services/blogs.service';
import './Blog.css'
import { Link } from 'react-router-dom';
import { deleteBlogsService } from '../../Services/blogs.service';
import { sendTypeImage } from '../../Utils/ImageSelectionByType';
import { useParams } from 'react-router-dom';
import { Author } from '../../Pages/LoginPage/Login';
import { useSelector } from 'react-redux';
import { getEmailOfUser } from '../../Services/blogs.service';
import { useDispatch } from 'react-redux';
import { setAuthorName } from '../../redux/Slice/HomeDashboardSlice';
import { likeButtonService } from '../../Services/blogs.service';
import chatImage from '../../assest/speech-bubble.png'
import DateDisplay from '../../Utils/DateDisplay';

function Blog(props) {
  const dispatch = useDispatch()
  const { id } = useParams()
  const authorName = localStorage.getItem('author')
  const authName = useSelector((c)=>
 { console.log(c)
   return c.allBlogReducer.authorName}

  )
  const [isLiked, setIsLiked] = useState()



  const onClickDeleteIcon = async () => {
    const data = await deleteBlogsService(props.Id)
    console.log(data);
    if (props.post) {
      props.fetch()
    } else {
      props.value()
    }

  }


  const likeButton = async (id) => {
    const data = await likeButtonService(id, authorName)
    if (props.post == "MyPost" || props.post == "LikedPost") {
      props.fetch()
    }
    console.log("Likes from props", props.Likes);
    console.log(data.data.data.Likes, "FRom like service");
    if (data.data.data.Likes.includes(authorName)) {
      setIsLiked(true)
      props.value()
    } else if (!data.data.data.Likes.includes(authorName)) {
      setIsLiked(false)
      props.value()
    }
  }


  const checkInitialStateOfLike = () => {


    if (props.Likes.includes(authorName)) {
      setIsLiked(true)
      // console.log("It already liked");
    }

  }

  const onClickOnView = async()=>{
    const data = await viewPostService(props.id,authName,props.obj)
  
  }

  useEffect(() => {

    checkInitialStateOfLike()
  }, [])
  let putImage = sendTypeImage(props.Type)

  return (
    <>
      <div className='blog-main'>
        <Card style={{ marginTop: '30px' }} className='outline-blog'>
          <div className='content-part1'>
            <div className='for-left-top-1'>
              <Link to={`/detailView/${props.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div onClick={onClickOnView} className='for-img-default'>
                  <img src={putImage} height={'100%'} width={'100%'} />
                </div>
              </Link>
              <div className='top-rg233t-content'>

                <div style={{ display: 'flex' }}>


                  <div className='forTitlepart'>
                    {props.Title}
                  </div>
                  {authorName == props.Email ?
                    <div className='iconsdelete-view-edit'>
                      <div className=''>
                        <Link to={`/editBlog/${props.id}`}>
                        <EditIcon className='editBtnclass' />
                        </Link>
                      </div>
                      <div>
                        <DeleteForeverIcon className='deleteBtnclass' onClick={onClickDeleteIcon} style={{ marginLeft: '5px' }} />
                      </div>
                    </div>
                    :
                    <div></div>
                  }


                </div>

                <div className='authorNameOfBlog'>
                  - {props.Email}
                </div>




                <div className='upperBtm'>

                  <div className='descriptionInHome'>
                    {props.Description}
                  </div>

                </div>

              </div>

              <div>

              </div>
            </div>
          </div>

          <div className='content-part2'>
            <Button onClick={() => { likeButton(props.id, props.Email, props.obj) }} className='con-par2'>
              {isLiked ? <FavoriteIcon style={{ fontSize: '23px', color: 'red', fontWeight: 900, cursor: 'pointer' }} /> :

                <FavoriteBorderIcon style={{ fontSize: '23px', cursor: 'pointer' }} />
              }<p style={{ fontWeight: 'bold', color: 'black', fontSize: '14px', marginLeft: '3px' }}>{props.NumberOfLikes}</p>
            </Button>
            <div className='con-par2'><img src={chatImage} height={'30px'} style={{ cursor: 'pointer' }} /></div>
            <div className='con-par2' style={{ marginLeft: '23px' }}> <App id={props.id} /></div>
            <div className='con-par2' style={{ marginLeft: '23px' }}> <VisibilityIcon style={{ marginRight: '5px' }} />{props.Views}</div>
          
            <Link to={`/detailView/${props.id}`}>  
            <Button onClick={onClickOnView}
             variant="outlined" size='small' style={{height:'20px',marginLeft:'15px',marginTop:'8px'}}>View</Button> </Link>
           
            <div className='con-par2'>
              <div>
                <DateDisplay date={props.date} />
              </div>

            </div>
          </div>
        </Card>
      </div>

    </>
  )
}

export default Blog