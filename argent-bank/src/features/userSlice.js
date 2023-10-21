import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//Async Logic
const url = "http://localhost:3001/api/v1/";

export const loginRequest = createAsyncThunk(
  "user/loginRequest",
  async (userLogs, { rejectWithValue }) => {
    const postMethod = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        email: userLogs.get("username"),
        password: userLogs.get("password"),
      }),
    };
    const accessToken = await fetch(url + "user/login", postMethod).then(
      (r) => {
        if (!r.ok) {
          return r.json().then((error) => rejectWithValue(error.message));
        } else {
          return r.json().then((json) => json.body.token);
        }
      }
    );
    return accessToken;
  }
);
export const profileRequest = createAsyncThunk(
  "user/profileRequest",
  async (token, { rejectWithValue }) => {
    const postMethod = {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const userProfile = await fetch(url + "user/profile", postMethod).then(
      (r) => {
        if (!r.ok) {
          return r.json().then((error) => rejectWithValue(error.message));
        } else {
          return r.json().then((json) => json.body);
        }
      }
    );
    return userProfile;
  }
);
export const usernameUpdateRequest = createAsyncThunk(
  "user/usernameUpdateRequest",
  async (props, { rejectWithValue }) => {
    const putMethod = {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        userName: props.updatedUsername,
      }),
    };
    const updatedProfile = await fetch(url + "user/profile", putMethod).then(
      (r) => {
        if (!r.ok) {
          return r.json().then((error) => rejectWithValue(error.message));
        } else {
          return r.json().then((json) => json.body);
        }
      }
    );
    return updatedProfile;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    token: JSON.parse(localStorage.getItem("token")) || null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.profile = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
    resetError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginRequest.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem("token", JSON.stringify(state.token));
      })
      .addCase(loginRequest.rejected, (state, action) => {
        state.token = null;
        state.error = action.payload;
      })
      .addCase(profileRequest.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(usernameUpdateRequest.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export default userSlice.reducer;


export const selectToken = (state) => state.user.token;
export const selectProfile = (state) => state.user.profile;
export const selectError = (state) => state.user.error;

export const {logout, resetError} = userSlice.actions