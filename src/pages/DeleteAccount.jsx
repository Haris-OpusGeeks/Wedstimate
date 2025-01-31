
function DeleteAccount() {

    return (
        <>
            <div className={"deletePage privacyContent"}>
                <div className={"container-fluid"}>
                <div className="row">
                    <div className="col-md-12">
            <h2>Delete Your Account</h2>

            <p>We understand that sometimes you may want to delete your account. Before proceeding, please note that account deletion is <strong>permanent</strong> and cannot be undone. Follow the steps below to request account deletion.</p>

            <h3>How to Delete Your Account</h3>

            <ul>
            <li>
            <h4>Open the App</h4>
            <p>Launch the application on your device and ensure you're logged into your account.</p>
            </li>
            <li>
            <h4>Go to Profile Settings</h4>
            <p>Tap on the <strong>Profile</strong> tab located in the navigation menu.</p>
            </li>
            <li>
            <h4>Select "Delete Account"</h4>
            <p>Scroll down to find the <strong>Account Deletion</strong> option and tap on it.</p>
            </li>
            <li>
            <h4>Confirm Your Request</h4>
            <p>A confirmation alert will appear asking if you’re sure about deleting your account.</p>
            <p>Click <strong>"OK"</strong> to proceed.</p>
            </li>
            <li>
            <h4>Account Deletion Request Submitted</h4>
            <p>Once confirmed, your request for account deletion will be processed.</p>
            <p>You will receive a confirmation email regarding the successful deletion of your account.</p>
            </li>
            </ul>

            <p>If you need any assistance, feel free to <a href="mailto:info@wedstimate.com">contact</a> for further help.</p>
                    </div>
                    </div>
                </div>
            </div>   
        </>
    );
}

export default DeleteAccount;