import './modal.scss';

function ConfirmationModal(props) {

    return (
        <>
            <div className={props.show ? `modal fade show` : `modal fade`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Confirmation</h1>
                            <button type="button" className="btn-close" onClick={props.onClose}></button>
                        </div>
                        <div className="modal-body">
                            <p>Are You Sure?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={props.onClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={props.onConfirm}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConfirmationModal;