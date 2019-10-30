import React, { useState } from 'react'
import axios from 'axios'

import { CommonDocument } from '../CommonDocument';
import './Uploads.css'

const endpoint = 'http://localhost:8080/upload';

const Uploads = () => {

  const ids = ['required1', 'required2', 'optional3', 'optional5', 'optinal5'];
  const initialState = {
    [ids[0]]: '',
    [ids[1]]: '',
    [ids[2]]: '',
    [ids[3]]: '',
    [ids[4]]: '',
    [`loaded${ids[0]}`]: 0,
    [`loaded${ids[1]}`]: 0,
    [`loaded${ids[2]}`]: 0,
    [`loaded${ids[3]}`]: 0,
    [`loaded${ids[4]}`]: 0,
    [`error${ids[0]}`]: '',
    [`error${ids[1]}`]: '',
    [`error${ids[2]}`]: '',
    [`error${ids[3]}`]: '',
    [`error${ids[4]}`]: ''
  }

  const [state, setState] = useState({
    ...initialState
  });

  const isUploadIconEnabled = (id, cssClass) => {
    if (state[id] === '' || state[`loaded${id}`] !== 0) {
      return `${cssClass} icon-disabled`;
    } else {
      return `${cssClass} icon-enabled`;
    }
  }

  const isCancelIconEnabled = (id, cssClass) => {
    if (state[`loaded${id}`] !== 0) {
      return `${cssClass} icon-enabled`;
    } else {
      return `${cssClass} icon-disabled`;
    }
  }

  const handleInputClick = (event, id) => {
    document.getElementById(id).click();
  }

  const handleFileInputChange = (event, id) => {
    if (event.target && event.target.files[0]) {
      setState({
        ...state,
        [id]: event.target.files[0],
        [`loaded${id}`]: 0,
        [`error${id}`]: ''
      })
    }

  }

  const handleCancel = (event, id) => {

    if (!state || !state[id]) {
      return;
    }

    setState({
      ...state,
      [id]: '',
      [`loaded${id}`]: 0,
      [`error${id}`]: ''
    })
  }

  const handleUpload = (e, id) => {

    if (!state || !state[id]) {
      return;
    }

    const data = new FormData()
    data.append('file', state[id], state[id].name)

    axios
      .post(endpoint, data, {
        onUploadProgress: ProgressEvent => {
          console.log((ProgressEvent.loaded / ProgressEvent.total) * 100);
          setState({
            ...state,
            [`loaded${id}`]: ((ProgressEvent.loaded / ProgressEvent.total) * 100).toFixed(),
          })
        },
      })
      .then(res => {
        console.log(res.statusText)
      })
      .catch(error => {
        console.log(error);
        setState({
          ...state,
          [id]: '',
          [`loaded${id}`]: 0,
          [`error${id}`]: error.error ? error.error : 'Something went wrong',
        })
      })
  }

  const handleUploadProgressText = (event, id) => {
    setState({
      ...state,
      [`loaded${id}`]: event.target.value
    })
  }

  const getFileName = (id) => {
    if (state[id].name) {
      return state[id].name;
    } else {
      return '';
    }
  }

  const renderRequiredDocumets = () => {
    return (
      <>
        <CommonDocument
          id={ids[0]}
          loaded={state[`loaded${ids[0]}`]}
          isUploadIconEnabled={isUploadIconEnabled}
          isCancelIconEnabled={isCancelIconEnabled}
          handleCancel={handleCancel}
          handleUpload={handleUpload}
          handleFileInputChange={handleFileInputChange}
          handleInputClick={handleInputClick}
          getFileName={getFileName}
          placeholder={'Document 1*'}
          type={'required'}
          error={state[`error${ids[0]}`]}
        />
        <CommonDocument
          id={ids[1]}
          loaded={state[`loaded${ids[1]}`]}
          isUploadIconEnabled={isUploadIconEnabled}
          isCancelIconEnabled={isCancelIconEnabled}
          handleCancel={handleCancel}
          handleUpload={handleUpload}
          handleFileInputChange={handleFileInputChange}
          handleInputClick={handleInputClick}
          getFileName={getFileName}
          placeholder={'Document 2*'}
          type={'required'}
          error={state[`error${ids[1]}`]}
        />
      </>
    )
  }

  const renderOptionalDocuments = () => {
    return (
      <>
        <CommonDocument
          id={ids[2]}
          loaded={state[`loaded${ids[2]}`]}
          isUploadIconEnabled={isUploadIconEnabled}
          isCancelIconEnabled={isCancelIconEnabled}
          handleCancel={handleCancel}
          handleUpload={handleUpload}
          handleFileInputChange={handleFileInputChange}
          handleInputClick={handleInputClick}
          getFileName={getFileName}
          placeholder={'Document 3*'}
          type={'optional'}
          error={state[`error${ids[2]}`]}
        />
        <CommonDocument
          id={ids[3]}
          loaded={state[`loaded${ids[3]}`]}
          isUploadIconEnabled={isUploadIconEnabled}
          isCancelIconEnabled={isCancelIconEnabled}
          handleCancel={handleCancel}
          handleUpload={handleUpload}
          handleFileInputChange={handleFileInputChange}
          handleInputClick={handleInputClick}
          getFileName={getFileName}
          placeholder={'Document 4*'}
          type={'optional'}
          error={state[`error${ids[3]}`]}
        />
        <CommonDocument
          id={ids[4]}
          loaded={state[`loaded${ids[4]}`]}
          isUploadIconEnabled={isUploadIconEnabled}
          isCancelIconEnabled={isCancelIconEnabled}
          handleCancel={handleCancel}
          handleUpload={handleUpload}
          handleFileInputChange={handleFileInputChange}
          handleInputClick={handleInputClick}
          getFileName={getFileName}
          placeholder={'Document 5*'}
          type={'optional'}
          error={state[`error${ids[4]}`]}
        />
      </>
    )

  }

  return (
    <div className="row">
      <form className="col-md-8 offset-md-2">
        <h6>Upload Required Documents</h6>
        {renderRequiredDocumets()}
        <h6 className="margin-top-2">Select and Upload Optional documents</h6>
        {renderOptionalDocuments()}
      </form>
    </div>
  )
}

export default Uploads;