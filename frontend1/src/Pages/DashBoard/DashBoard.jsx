import Header from '../Header/Header'
import Home from '../HomeDashBoard/Home'
import imageForBlog from '../assest/blog12.jpg'
import '../DashBoard/DashBoard.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogs } from '../../redux/Slice/HomeDashboardSlice'
import Blog from '../Blog/BlogModel/Blog'
import { Link } from 'react-router-dom'
import '../HomeDashBoard/Home.css'
import NativeSelectDemo from '../../Utils/NativeSelectDemo'
import { Card, Container } from '@mui/material'
import { arrangeByLikesSortLowToHigh, getAllBlogsService } from '../Services/blogs.service'
import { viewPostService } from '../Services/blogs.service'
import { setForSearchType } from '../../redux/Slice/HomeDashboardSlice'
import { arrangeByLikesSortHighToLowService } from '../Services/blogs.service'
import NativeSelectDemo1 from '../Utils/NativeSelectDemo1'
import { setrelevanceType } from '../../redux/Slice/HomeDashboardSlice'
import { addTokenToSystem } from '../redux/Slice/Authentications'
function DashBoard() {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const valueOfBlogType = useSelector((c) => {
    return c.allBlogReducer.typeOfBlog
  })

  const [stateForBlogHome, setstateForBlogHome] = useState([])
  const valuOfRelevance = useSelector((c) => {
    return c.allBlogReducer.relevanceType
  })

  const initialValue = async () => {
    const data = await getAllBlogsService()

    dispatch(addTokenToSystem(token))
    setstateForBlogHome(data.data.data)
    dispatch(setrelevanceType("All"))

  }

  const dataForSearch = useSelector((c) => {
    
    return c.allBlogReducer.forSearchType
  })

  const [typeValue, setType] = useState("All")

  const setValueOfTypeInChild = async (value1) => {
    await setType(value1)
    // console.log(typeValue, "in parent");
  }





  const value = async (typeValue) => {
    const data = await getAllBlogsService()
    const data1 = await arrangeByLikesSortLowToHigh()
    const data2 = await arrangeByLikesSortHighToLowService()
    const data3 = (await getAllBlogsService()).data.data.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
   
    if (typeValue == "Other" && valuOfRelevance == "All") {
      await setstateForBlogHome(data.data.data.filter((x) => x.Type == "Other"))
    } else if (typeValue == "Music" && valuOfRelevance == "All") {
      await setstateForBlogHome(data.data.data.filter((x) => x.Type == "Music"))
    } else if (typeValue == "Fitness" && valuOfRelevance == "All") {
      await setstateForBlogHome(data.data.data.filter((x) => x.Type == "Fitness"))
    } else if (typeValue == "Food" && valuOfRelevance == "All") {
      await setstateForBlogHome(data.data.data.filter((x) => x.Type == "Food"))
    }
    else if (typeValue == "Travel" && valuOfRelevance == "All") {
      await setstateForBlogHome(data.data.data.filter((x) => x.Type == "Travel"))
    }
    else if (typeValue == "Sports" && valuOfRelevance == "All") {
      await setstateForBlogHome(data.data.data.filter((x) => x.Type == "Sports"))
    }


    else if (valuOfRelevance == "lowToHigh" && typeValue == "Other") {
      await setstateForBlogHome(data1.data.data.filter((x) => x.Type == "Other"))

    }
    else if (valuOfRelevance == "lowToHigh" && typeValue == "Music") {
      await setstateForBlogHome(data1.data.data.filter((x) => x.Type == "Music"))
    } else if (valuOfRelevance == "lowToHigh" && typeValue == "Fitness") {
      await setstateForBlogHome(data1.data.data.filter((x) => x.Type == "Fitness"))
    } else if (valuOfRelevance == "lowToHigh" && typeValue == "Food") {
      await setstateForBlogHome(data1.data.data.filter((x) => x.Type == "Food"))
    } else if (valuOfRelevance == "lowToHigh" && typeValue == "Travel") {
      await setstateForBlogHome(data1.data.data.filter((x) => x.Type == "Travel"))
    } else if (valuOfRelevance == "lowToHigh" && typeValue == "Sports") {
      await setstateForBlogHome(data1.data.data.filter((x) => x.Type == "Sports"))
    }
    //highToLow
    else if (valuOfRelevance == "highToLow" && typeValue == "Other") {
      await setstateForBlogHome(data2.data.data.filter((x) => x.Type == "Other"))
    }
    else if (valuOfRelevance == "highToLow" && typeValue == "Music") {
      await setstateForBlogHome(data2.data.data.filter((x) => x.Type == "Music"))
    }
    else if (valuOfRelevance == "highToLow" && typeValue == "Fitness") {
      await setstateForBlogHome(data2.data.data.filter((x) => x.Type == "Fitness"))
    }
    else if (valuOfRelevance == "highToLow" && typeValue == "Food") {
      await setstateForBlogHome(data2.data.data.filter((x) => x.Type == "Food"))
    }
    else if (valuOfRelevance == "highToLow" && typeValue == "Travel") {
      await setstateForBlogHome(data2.data.data.filter((x) => x.Type == "Travel"))
    }
    else if (valuOfRelevance == "highToLow" && typeValue == "Sports") {
      await setstateForBlogHome(data2.data.data.filter((x) => x.Type == "Sports"))
    }
    else if (valuOfRelevance == "Latest" && typeValue == "Other") {
      await setstateForBlogHome(data3.filter((x) => x.Type == "Other"))
    }
    else if (valuOfRelevance == "Latest" && typeValue == "Music") {
      await setstateForBlogHome(data3.filter((x) => x.Type == "Music"))
    }
    else if (valuOfRelevance == "Latest" && typeValue == "Fitness") {
      await setstateForBlogHome(data3.filter((x) => x.Type == "Fitness"))
    }
    else if (valuOfRelevance == "Latest" && typeValue == "Food") {
      await setstateForBlogHome(data3.filter((x) => x.Type == "Food"))
    }
    else if (valuOfRelevance == "Latest" && typeValue == "Travel") {
      await setstateForBlogHome(data3.filter((x) => x.Type == "Travel"))
    }
    else if (valuOfRelevance == "Latest" && typeValue == "Sports") {
      await setstateForBlogHome(data3.filter((x) => x.Type == "Sports"))
    }
    else if (valuOfRelevance == "Latest") {
      setstateForBlogHome(data3)
    }

    else if (valuOfRelevance == "lowToHigh") {

      await setstateForBlogHome(data1.data.data)
    }
    else if (valuOfRelevance == "highToLow") {

      await setstateForBlogHome(data2.data.data)
    }
    else if (valuOfRelevance == "All") {

      await setstateForBlogHome(data.data.data)
    }



  }



  const viewPostOnClick = async (id, data, type) => {
    const response = await viewPostService(id, data)
    value()

  }



  useEffect(() => {
    getAllBlogsService()
    // initialValue()
    value(valueOfBlogType)
  }, [valuOfRelevance, valueOfBlogType])
  useEffect(() => {
    getAllBlogsService()
    value()
    initialValue()
  }, [token])

  return (
    <div className="dashBoardhome">

      <Header />

      <div className='dashboard-img-blogs'>
        <img src={imageForBlog} height={'530px'} width={'100%'} />
      </div>
      <div className='dahsboard-bcgrund-img'>

        <div className='home-main'>
          <div className='home-dash'>
            <div style={{ display: 'flex' }}>
              <NativeSelectDemo value={value} setValueOfTypeInChild={setValueOfTypeInChild} />
              <NativeSelectDemo1 value={value} setValueOfTypeInChild={setValueOfTypeInChild} />

            </div>
            {stateForBlogHome.map((x) =>
              


                <Blog
                  obj={x}
                  id={x._id}
                  value={value}
                  Type={x.Type}
                  Id={x._id}
                  Email={x.Email} date={x.createdAt}
                  Title={x.Title}
                  Views={x.Views.length}
                  Likes={x.Likes}
                  Description={x.Description}
                  NumberOfLikes={x.Likes.length}
                />
          

            )}
          </div>
        </div>

      </div>

    </div>
  )
}

export default DashBoard