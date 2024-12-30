import termsOfServices from '../../public/Wedstimate_Terms_of_Service.pdf';

function TermsOfService() {

    return (
        <>
            <div className={"privacyPage"}>
                <div className={"container-fluid"}>
                    <div>
                        <iframe src={termsOfServices}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TermsOfService;