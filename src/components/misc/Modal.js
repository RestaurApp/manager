import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
// import useClickOutside from '../../hooks/useClickOutside';
import '../../assets/stylesheets/Modal.css'


const ModalContent = ({ 
    title, 
    children,
    description,
    onCloseModal,
    cancelBtnOptions, 
    acceptBtnOptions,
    id, 
    lg,
  }) => {

  const wrapper = useRef(null);

  // useClickOutside(wrapper, onCloseModal);

  return (
    <div className="Modal" id={id}>
      <div className={`Modal-dialog ${lg ? 'Modal-lg' : ''}`} ref={wrapper}>
        <div className="ModalHeader">
          <h2 className="Modal-title">
            {title}
              <div onClick={onCloseModal} id="Modal-icon-close-wrapper">
                <i className="Modal-icon-close icon-cancel c-red"/>
              </div>
          </h2>
        </div>
  

        <div className="Modal-body">
          {description && <p className="Modal-description">{description}</p>}
          {children}
        </div>

        <div className="Modal-buttons-wrapper">
          {cancelBtnOptions && (
            <Button
              id="modal-cancel-button"
              buttonType="secondary"
              outline
              action={cancelBtnOptions.action}
              content={cancelBtnOptions.content}
            />
          )}

          {acceptBtnOptions && (
            <Button
              id="modal-accept-button"
              buttonType="primary"
              action={acceptBtnOptions.action}
              content={acceptBtnOptions.content}
            />
          )}
        </div> 
      </div>
    </div>
  )
}

const Modal = (props) => {
  return props.reactPortal 
    ? ReactDOM.createPortal(<ModalContent {...props}/>, document.getElementById("App"))
    : <ModalContent {...props}/>
}

export default Modal;
