import policy from '../assets/policy.pdf';

function PrivacyPolicy() {

    return (
        <>
            <div className={"privacyPage"}>
                <div className={"container-fluid"}>
                    <div>
                        <iframe src={policy}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PrivacyPolicy;