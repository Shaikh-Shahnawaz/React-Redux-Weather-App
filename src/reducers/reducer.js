import { createSlice } from '@reduxjs/toolkit'

// import   {  fetchProductGetRequest, fetchProductById }   from "../thunks/thunk"

const initialState = {
 tempInfoR:{}
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    

    getApiData:(state,action)=>{
        console.log('redux data====>>>>',action.payload)
    
    state.tempInfoR = action.payload

    console.log('redux state data==>>',state.tempInfo)
}


},

//   extraReducers: (builder) => {
//     // Add reducers for additional action types here, and handle loading state as needed
//     builder.addCase(fetchProductGetRequest.fulfilled, (state, action) => {
//       // console.log('actionPayload=-=->>',action.payload)
//         state.allProduct = action.payload
//     })

//     .addCase(fetchProductById.fulfilled, (state,action)=>{
//       // console.log('productby id',action.payload)
//       state.productById = action.payload

//     })
    
//   },


})

// Action creators are generated for each case reducer function
export const {getApiData } = weatherSlice.actions

export default weatherSlice.reducer