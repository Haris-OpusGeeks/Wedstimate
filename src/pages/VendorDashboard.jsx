import {Link} from "react-router-dom";

export default function VendorDashboard() {
  
  return (
    <>
      <div className="vendorDashboard">
        <div className="container-fluid">
          <div className="d-flex">
            <Link to={'/leads'} > 
              <div className="col-lg-4 col-sm-12 leads">
                <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M2.5 11.875C2.5 9.46 4.46 7.5 6.875 7.5H33.125C35.54 7.5 37.5 9.46 37.5 11.875V28.125C37.5 29.2853 37.0391 30.3981 36.2186 31.2186C35.3981 32.0391 34.2853 32.5 33.125 32.5H6.875C5.71468 32.5 4.60188 32.0391 3.78141 31.2186C2.96094 30.3981 2.5 29.2853 2.5 28.125V11.875ZM6.875 10C6.37772 10 5.90081 10.1975 5.54917 10.5492C5.19754 10.9008 5 11.3777 5 11.875V28.125C5 29.16 5.84 30 6.875 30H33.125C33.6223 30 34.0992 29.8025 34.4508 29.4508C34.8025 29.0992 35 28.6223 35 28.125V11.875C35 11.3777 34.8025 10.9008 34.4508 10.5492C34.0992 10.1975 33.6223 10 33.125 10H6.875ZM23.75 15C23.4185 15 23.1005 15.1317 22.8661 15.3661C22.6317 15.6005 22.5 15.9185 22.5 16.25C22.5 16.5815 22.6317 16.8995 22.8661 17.1339C23.1005 17.3683 23.4185 17.5 23.75 17.5H31.25C31.5815 17.5 31.8995 17.3683 32.1339 17.1339C32.3683 16.8995 32.5 16.5815 32.5 16.25C32.5 15.9185 32.3683 15.6005 32.1339 15.3661C31.8995 15.1317 31.5815 15 31.25 15H23.75ZM23.75 22.5C23.4185 22.5 23.1005 22.6317 22.8661 22.8661C22.6317 23.1005 22.5 23.4185 22.5 23.75C22.5 24.0815 22.6317 24.3995 22.8661 24.6339C23.1005 24.8683 23.4185 25 23.75 25H31.25C31.5815 25 31.8995 24.8683 32.1339 24.6339C32.3683 24.3995 32.5 24.0815 32.5 23.75C32.5 23.4185 32.3683 23.1005 32.1339 22.8661C31.8995 22.6317 31.5815 22.5 31.25 22.5H23.75ZM13.1525 19.285C13.598 19.285 14.0392 19.1973 14.4508 19.0268C14.8624 18.8563 15.2363 18.6064 15.5514 18.2914C15.8664 17.9763 16.1163 17.6024 16.2868 17.1908C16.4573 16.7792 16.545 16.338 16.545 15.8925C16.545 15.447 16.4573 15.0058 16.2868 14.5942C16.1163 14.1826 15.8664 13.8087 15.5514 13.4936C15.2363 13.1786 14.8624 12.9287 14.4508 12.7582C14.0392 12.5877 13.598 12.5 13.1525 12.5C12.2528 12.5 11.3899 12.8574 10.7536 13.4936C10.1174 14.1299 9.76 14.9928 9.76 15.8925C9.76 16.7922 10.1174 17.6551 10.7536 18.2914C11.3899 18.9276 12.2528 19.285 13.1525 19.285ZM9.645 20.98C9.07611 20.98 8.53052 21.206 8.12826 21.6083C7.72599 22.0105 7.5 22.5561 7.5 23.125C7.50008 24.056 7.81137 24.9603 8.38438 25.6942C8.9574 26.428 9.75925 26.9492 10.6625 27.175L10.795 27.21C12.345 27.5975 13.9625 27.5975 15.51 27.21L15.645 27.1775C16.5482 26.9517 17.3501 26.4305 17.9231 25.6967C18.4961 24.9628 18.8074 24.0585 18.8075 23.1275C18.8078 22.8456 18.7526 22.5664 18.6449 22.3059C18.5373 22.0453 18.3793 21.8086 18.1801 21.6091C17.9809 21.4097 17.7443 21.2515 17.4839 21.1435C17.2235 21.0356 16.9444 20.98 16.6625 20.98H9.645Z" fill="#274C66"/>
                  </svg>
                </div>
                <div className="translateBox d-flex justify-content-end align-items-start">
                  <div className="lineText">
                    <h4>View</h4>
                    <div className="line"></div>
                  </div>
                  <h2>Your Leads</h2>
                </div>
              </div>
            </Link>
            <Link to={'/create-deal'} >
              <div className="col-lg-4 col-sm-12 deals">
                <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                    <path d="M8.5 22.9096C8.8145 26.452 11.7151 28.9659 16.1309 29.291V31.875H18.3473V29.291C23.171 28.9106 26.163 26.2352 26.163 22.2785C26.163 18.8997 24.1506 16.9447 19.8815 15.844L18.3473 15.4466V7.36737C20.7315 7.60112 22.3401 8.88463 22.746 10.8014H25.8698C25.517 7.40138 22.5973 4.96187 18.3473 4.692V2.125H16.1309V4.74513C12.0105 5.23388 9.18213 7.87312 9.18213 11.4516C9.18213 14.5414 11.2349 16.728 14.8368 17.6502L16.133 17.9945V26.5604C13.6914 26.1991 12.0105 24.8604 11.6046 22.9096H8.5ZM15.7059 14.7581C13.4895 14.1993 12.3059 13.005 12.3059 11.3241C12.3059 9.31813 13.8019 7.837 16.1309 7.43962V14.8665L15.7059 14.7581ZM19.0868 18.7361C21.8216 19.4225 23.0223 20.5615 23.0223 22.4953C23.0223 24.8264 21.267 26.3797 18.3473 26.6156V18.5512L19.0868 18.734V18.7361Z" fill="#274C66"/>
                  </svg>
                </div>
                <div className="translateBox d-flex justify-content-end align-items-start">
                  <div className="lineText">
                    <h4>Create</h4>
                    <div className="line"></div>
                  </div>
                  <h2>Deals</h2>
                </div>
              </div>
            </Link>
            <Link to={'/edit-preference'} >
              <div className="col-lg-4 col-sm-12 preferences">
                <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M7.7125 22.5001C7.97075 21.7682 8.44967 21.1344 9.08325 20.6861C9.71683 20.2378 10.4739 19.9971 11.25 19.9971C12.0261 19.9971 12.7832 20.2378 13.4168 20.6861C14.0503 21.1344 14.5292 21.7682 14.7875 22.5001H27.5V25.0001H14.7875C14.5292 25.7321 14.0503 26.3658 13.4168 26.8141C12.7832 27.2625 12.0261 27.5032 11.25 27.5032C10.4739 27.5032 9.71683 27.2625 9.08325 26.8141C8.44967 26.3658 7.97075 25.7321 7.7125 25.0001H2.5V22.5001H7.7125ZM15.2125 13.7501C15.4708 13.0182 15.9497 12.3844 16.5832 11.9361C17.2168 11.4878 17.9739 11.2471 18.75 11.2471C19.5261 11.2471 20.2832 11.4878 20.9168 11.9361C21.5503 12.3844 22.0292 13.0182 22.2875 13.7501H27.5V16.2501H22.2875C22.0292 16.9821 21.5503 17.6158 20.9168 18.0641C20.2832 18.5125 19.5261 18.7532 18.75 18.7532C17.9739 18.7532 17.2168 18.5125 16.5832 18.0641C15.9497 17.6158 15.4708 16.9821 15.2125 16.2501H2.5V13.7501H15.2125ZM7.7125 5.00013C7.97075 4.26822 8.44967 3.63443 9.08325 3.18612C9.71683 2.73782 10.4739 2.49707 11.25 2.49707C12.0261 2.49707 12.7832 2.73782 13.4168 3.18612C14.0503 3.63443 14.5292 4.26822 14.7875 5.00013H27.5V7.50013H14.7875C14.5292 8.23205 14.0503 8.86584 13.4168 9.31415C12.7832 9.76245 12.0261 10.0032 11.25 10.0032C10.4739 10.0032 9.71683 9.76245 9.08325 9.31415C8.44967 8.86584 7.97075 8.23205 7.7125 7.50013H2.5V5.00013H7.7125ZM11.25 7.50013C11.5815 7.50013 11.8995 7.36844 12.1339 7.13402C12.3683 6.8996 12.5 6.58165 12.5 6.25013C12.5 5.91861 12.3683 5.60067 12.1339 5.36625C11.8995 5.13183 11.5815 5.00013 11.25 5.00013C10.9185 5.00013 10.6005 5.13183 10.3661 5.36625C10.1317 5.60067 10 5.91861 10 6.25013C10 6.58165 10.1317 6.8996 10.3661 7.13402C10.6005 7.36844 10.9185 7.50013 11.25 7.50013ZM18.75 16.2501C19.0815 16.2501 19.3995 16.1184 19.6339 15.884C19.8683 15.6496 20 15.3317 20 15.0001C20 14.6686 19.8683 14.3507 19.6339 14.1163C19.3995 13.8818 19.0815 13.7501 18.75 13.7501C18.4185 13.7501 18.1005 13.8818 17.8661 14.1163C17.6317 14.3507 17.5 14.6686 17.5 15.0001C17.5 15.3317 17.6317 15.6496 17.8661 15.884C18.1005 16.1184 18.4185 16.2501 18.75 16.2501ZM11.25 25.0001C11.5815 25.0001 11.8995 24.8684 12.1339 24.634C12.3683 24.3996 12.5 24.0817 12.5 23.7501C12.5 23.4186 12.3683 23.1007 12.1339 22.8662C11.8995 22.6318 11.5815 22.5001 11.25 22.5001C10.9185 22.5001 10.6005 22.6318 10.3661 22.8662C10.1317 23.1007 10 23.4186 10 23.7501C10 24.0817 10.1317 24.3996 10.3661 24.634C10.6005 24.8684 10.9185 25.0001 11.25 25.0001Z" fill="#274C66"/>
                  </svg>
                </div>
                <div className="translateBox d-flex justify-content-end align-items-start">
                  <div className="lineText">
                    <h4>Update</h4>
                    <div className="line"></div>
                  </div>
                  <h2>Preferences</h2>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}