import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


const initialState = {
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  isLoggedIn: false,
  loading:false,
  toggle:'hidden',
  userData:null,
 
};

export const getUserData= createAsyncThunk("getUserData", async()=>{
  try {
      const result = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/api/user/data",
      {
        withCredentials: true,
      }
    );
    const userData= result.data.userData;
    // console.log("result from getUserData request", userData);
    return userData;
  } catch (error) {
    console.log('error while making requsest for getUserData ',error)
  }
})


export const getAuthState = createAsyncThunk(
  "getAuthState",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/auth/is-auth",
        { withCredentials: true }
      );

      if (data.success) {
        dispatch(setIsLoggedIn(true));
        dispatch(getUserData()) ;

        
      }else{
          dispatch(setIsLoggedIn(false));  
      }
    } catch (error) {
      toast.error(error.message || "Error checking auth state");
      return rejectWithValue(error.message); // rejectWithValues allows us to use custom error as the thunk gives throw keyword to use in the catch bloack if any error occured then thorw error.
    }
  }
);

 
const authReducer = createSlice({
  name: "auth",
  initialState, // we basically initialize multiple state in the form of object above.
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setLoading:(state,action)=>{
      state.loading= action.payload;
    },
     clearUserData: (state) => {  
      state.userData = null;
    },
    setToggle:(state,action)=>{
      state.toggle=action.payload;
    }
  },

  extraReducers:(builder)=>{

    builder.addCase(getUserData.pending,(state)=>{
      state.userData=null;
    
    })

      builder.addCase(getUserData.fulfilled,(state,action)=>{
      state.userData=action.payload;
    
    })

      builder.addCase(getUserData.rejected,(state)=>{
      state.userData=null;
     
    })
  }
});


export const {setIsLoggedIn,clearUserData,setLoading, setToggle} = authReducer.actions;
export default authReducer.reducer;