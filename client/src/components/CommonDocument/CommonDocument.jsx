import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

const CommonDocument = (props) => {

  const theme = useContext(ThemeContext);

  const renderIcons = () => {
    const { isUploadIconEnabled, isCancelIconEnabled, handleCancel, handleUpload, id } = props;
    return (
      <>
        <div className="col-md-1">
          <i className={isUploadIconEnabled(props.id, 'fas fa-circle fa-cloud-upload-alt fa-2x')}
            onClick={e => handleUpload(e, id)}></i>
        </div>
        <div className="col-md-1">
          <i className={isCancelIconEnabled(props.id, 'fas fa-circle fa-window-close fa-2x')}
            onClick={e => handleCancel(e, id)}></i>
        </div>
      </>
    )
  }

  const renderErrorMessage = () => {
    const { error } = props;
    return (
      <h6 className="error-message">{error}</h6>
    )
  }

  const renderOptionalOrRequired = () => {
    const { handleInputClick, getFileName, id, placeholder } = props;
    return props.type === 'required' ?
      (
        <input
          className="form-control form-control-lg"
          readOnly
          type="text"
          placeholder={placeholder}
          onClick={e => handleInputClick(e, id)}
          value={getFileName(props.id)} />
      ) :
      (
        <select
          className="form-control form-control-lg"
          onChange={e => handleInputClick(e, id)}>
          <option>Select</option>
          <option>Document 3</option>
          <option>Document 4</option>
          <option>Document 5</option>
        </select>
      )
  }

  const getUploadProgressBackgroundStyle = () => {
    const { loaded } = props;
    return `linear-gradient(90deg, ${theme.backgroundAndBorder} ${loaded}%, ${theme.background} 0%) !important`;
  }

  return (
    <div className="row form-group">
      <div className="col-md-9">
        <input
          type="file"
          id={props.id}
          style={{ display: 'none' }}
          onChange={e => props.handleFileInputChange(e, props.id)} />
        {
          props.loaded && props.loaded !== 0 ?
            <input
              className="form-control form-control-lg input-loading"
              style={{
                backgroundColor: getUploadProgressBackgroundStyle()
              }}
              value={`${props.loaded}%`}
              type="text"
              placeholder={props.placeholder} /> :
            // onChange={e => handleUploadProgressText(e, ids[0])} /> :
            renderOptionalOrRequired()
        }
        {renderErrorMessage()}
      </div>
      {renderIcons()}

    </div>
  )
}

export default CommonDocument;