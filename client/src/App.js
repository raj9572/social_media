import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import RequireUser from './components/RequireUser';
import Profile from './components/profile/Profile'
import Feed from './components/feed/Feed'
import UpdateProfile from './components/updateProfile/UpdateProfile';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar'
import OnlyIfNotLogged from './components/OnlyIfNotLogged';
import toast, { Toaster } from 'react-hot-toast'
import ViewPostDetails from './components/ViewPostDetails/ViewPostDetails';
export const TOAST_SUCCESS = 'toast_success'
export const TOAST_FAILURE = 'toast_failure'


function App() {


  const isLoading = useSelector(state => state.appConfigReducer.isLoading)
  const toastData = useSelector(state => state.appConfigReducer.toastData)
  const loadingRef = useRef(null)

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    }
    else {
      loadingRef.current?.complete()
    }
  }, [isLoading])

  useEffect(() => {
    switch (toastData.type) {
      case TOAST_SUCCESS:
        toast.success(toastData.message)
        break;

      case TOAST_FAILURE:
        toast.error(toastData.message)
        break;

        default : return


    }
  }, [toastData])
  return (
    <div >

      <LoadingBar height={3} color='#f11946' ref={loadingRef} />
      <div><Toaster /></div>
      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />}></Route>
            <Route path="/profile/:userId" element={<Profile />}></Route>
            <Route path="/updateProfile" element={<UpdateProfile />}></Route>
            <Route path="/viewpostdetails/:postId" element={<ViewPostDetails />}></Route>
          </Route>
        </Route>

        <Route element={<OnlyIfNotLogged />}>
          <Route element={<Login />} path='/login'></Route>
          <Route element={<SignUp />} path='/signup'></Route>
        </Route>

      </Routes>

    </div>
  );
}

export default App;
