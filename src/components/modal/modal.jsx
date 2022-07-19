// import BasicDocument from "../../components/PDF/basic-document"
import BasicDocument from "../PDF/basic-document";

import React, { useEffect } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalPdf = ({ open }) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  // console.log(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  // function openModal() {
  //   setIsOpen(true);
  // }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="content-wrapper">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles.content}
        contentLabel="Example Modal"
      >
        <BasicDocument closeModal={closeModal} code={"120356789"} />
      </Modal>
    </div>
  );
};

export default ModalPdf;
