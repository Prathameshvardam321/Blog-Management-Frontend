import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../CreateBlog/CreateBlog.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import image from '../../assest/logo_blogger_40px_2x.png'
import toaster from '../../../Toaster'
import { createPostService } from '../../Services/blogs.service';
import SelectSmall from '../../Utils/tab';
import { useNavigate } from 'react-router-dom';
import { Author } from '../../Pages/LoginPage/Login';
import Header from '../../Header/Header';
import { getPostByIdService } from '../../Services/blogs.service';
import { useParams } from 'react-router-dom'
import { updatePostService } from '../../Services/blogs.service';
import { selectTypeOfBlog } from '../../redux/Slice/HomeDashboardSlice';
export default function EditBlog() {

    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()
    const propValue = "Create"
    const titleregex = /^.{3,}$/
   
    const [blog, setBlog] = useState({
        Title: "", Description: "", Type: "Other", picture: ''
    })
    const [Image, setImage] = useState('')
    const [regex, setRegex] = useState({
        titleError: false, descriptionError: false, titleHelper: "", descriptionHelper: ""
    })

    const valueOfType = useSelector((c) => {
        
        return c.allBlogReducer.typeOfBlog
    })

    useEffect(() => {
        setBlog((prev) => ({
            ...prev, Type: valueOfType
        }))

    }, [valueOfType])


    const takeTitle = (e) => {
        setBlog((prev) => ({
            ...prev, Title: e.target.value
        }))
       
    }
    const takeDescription = (e) => {
        setBlog((prev) => ({
            ...prev, Description: e.target.value
        }))
        console.log(e.target.value);
    }

    const onClickPublish = async () => {
        console.log(blog);
        const titleTest = titleregex.test(blog.Title)
        const desTest = titleregex.test(blog.Description)
        if (titleTest) {
            setRegex((prev) => ({
                ...prev, titleError: false, titleHelper: ""
            }))
        }
        else {
            setRegex((prev) => ({
                ...prev, titleError: true, titleHelper: "Blog title must contain at least 3 letters."
            }))
        }

        if (desTest) {
            setRegex((prev) => ({
                ...prev, descriptionError: false, descriptionHelper: ""
            }))
        }
        else {
            setRegex((prev) => ({
                ...prev, descriptionError: true, descriptionHelper: "Blog description must contain at least 3 letters."
            }))
        }


        const response = await updatePostService(id,blog)
      
        if (response.data.code == 200) {
            toaster("info",response.data.message)
            navigate("/dashboard")
        }
    }
    useEffect(() => {
        const fetch = async () => {
            const data = await getPostByIdService(id)

            dispatch(selectTypeOfBlog(data.data.data[0].Type))
            setBlog((prev) => ({
                ...prev, Title: data.data.data[0].Title, Description: data.data.data[0].Description, Type: valueOfType
            }))
           

        }
        fetch()

    }, [])

 
    return (
        <>
            <div className='createblog-ui-main'>
                <Header propValue={propValue} />

                <div className='lower-part'>
                    <div className='createblog-left-content'>
                        <div className='title-box'>

                            <TextField
                                style={{ width: '923px', color: 'orange', marginTop: '10px', marginLeft: '15px' }}
                                required
                                id="filled-required"
                                label="Title"
                                variant="filled"
                                value={blog.Title}
                                onChange={takeTitle}
                                error={regex.titleError}
                                helperText={regex.titleHelper}
                            />


                        </div>

                        <div className='decription-box'>
                            <div>

                                <TextField
                                    id="description"
                                    required
                                    multiline
                                    name="description"
                                    value={blog.Description}
                                    onChange={takeDescription}
                                    rows={15}
                                    error={regex.descriptionError}
                                    helperText={regex.descriptionHelper}
                                    style={{ width: '720px', border: '1px solid whitesmoke' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='rgt-lowerpart'>
                        <div className='button-rgt-part'>
                            <div className='forselctsmall'>
                                <SelectSmall value={blog.Type} />
                                {/* <div>
                                    <input onChange={(e) => {
                                        setImage(e.target.files[0])
                                    }} style={{ marginTop: '50px', height: '50px', marginLeft: '5px' }} type='file' />
                                </div> */}
                            </div>

                            <div className='publishBtm'>
                                <Button onClick={onClickPublish} variant="contained" style={{ backgroundColor: 'orange', height: '42px', marginLeft: '0px', width: '156px' }} endIcon={<SendIcon />}>
                                    Update
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
