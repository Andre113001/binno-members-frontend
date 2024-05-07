import React from "react";
import useCustomModal from "../../../hooks/useCustomModal";

function SuccessfulUpload() {
  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    CustomModal,
  } = useCustomModal();
  return (
    <>
      <CustomModal
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
        content={
          <Fragment>
            <div className="w-full m-0">
              <center>
                <h1 className="text-3xl font-bold mb-2">
                  Are you sure you want to end partnership?
                </h1>
                <h3 className="text-lg">
                  Your partnership will permanently be ended.
                </h3>
                <div className="flex flex-row">
                  <Button
                    sx={{
                      marginTop: "20px",
                      border: "1px solid #5C9FEF",
                      width: "50%",
                      borderRadius: "10px",
                      padding: "10px 20px",
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#5C9FEF",
                      "&:hover": {
                        background: "#5C9FEF",
                        color: "#fff",
                      },
                    }}
                    onClick={handleCloseModal}
                    // disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{
                      marginTop: "20px",
                      marginLeft: "20px",
                      background: "#EB5858",
                      border: "1px solid #EB5858",
                      padding: "10px 20px",
                      width: "50%",
                      borderRadius: "10px",
                      "&:hover": {
                        background: "#E20000",
                      },
                      color: "#fff",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                    onClick={(e) => {
                      handleDeleteFAQ();
                    }}
                    // disabled={isLoading}
                  >
                    End
                  </Button>
                </div>
              </center>
            </div>
          </Fragment>
        }
      />
    </>
  );
}
export default SuccessfulUpload;
