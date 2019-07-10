import {SET_SHOUTS, LOADING_DATA, LIKE_SHOUT, UNLIKE_SHOUT, DELETE_SHOUT, POST_SHOUT, LOADING_UI, CLEAR_ERRORS, SET_ERRORS, SET_SHOUT, STOP_LOADING_UI} from '../types';
import axios from 'axios';

export const getShouts = () => (dispatch) => {
  dispatch({type: LOADING_DATA});
  axios.get('/shouts').then((res) => {
    dispatch({
      type: SET_SHOUTS,
      payload: res.data
    })
  }).catch((err) => {
    dispatch({
      type: SET_SHOUTS,
      payload: []
    })
  })
}

export const postShout = (shout) => (dispatch) => {
  console.log('in post shout: ', shout);
  dispatch({type: LOADING_UI});
  axios.post('/shout', shout).then((res) => {
    dispatch({
      type: POST_SHOUT,
      payload: res.data.resShout
    });
    dispatch({
      type: CLEAR_ERRORS
    })
  }).catch((err) => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  })
}

export const likeShout = (shoutId) => (dispatch) => {
  axios.get(`/shout/${shoutId}/like`).then((res) => {
    console.log(res);
    dispatch({
      type: LIKE_SHOUT,
      payload: res.data
    })
  }).catch((err) => {
    console.log(err);
  })
}

export const unlikeShout = (shoutId) => (dispatch) => {
  axios.get(`/shout/${shoutId}/unlike`).then((res) => {
    dispatch({
      type: UNLIKE_SHOUT,
      payload: res.data
    })
  }).catch((err) => {
    console.log(err);
  })
}

export const deleteShout = (shoutId) => (dispatch) => {
  axios.delete(`/shout/${shoutId}`).then(() => {
    dispatch({
      type: DELETE_SHOUT,
      payload: shoutId
    })
  }).catch((err) => {
    console.log(err);
  })
}

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  });
}

export const getShout = (shoutId) => (dispatch) => {
  dispatch({
    type: LOADING_UI
  });
  axios.get(`/shout/${shoutId}`).then((res) => {
    dispatch({
      type: SET_SHOUT,
      payload: res.data.shoutData
    });
    dispatch({
      type: STOP_LOADING_UI
    });
  }).catch((err) => {
    console.log(err);
  })
}
