import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as MainService from "../../services/MainService";
import { Input, Button, Spin, Checkbox } from "antd";
import { ROUTES } from "../../constant/routesConstant";
import { LeftArrow } from "../../components/Icons";
import defaultImage from "../../components/default-image.png";

const HTMLContent = (html) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: html.html }} />
  )
}

function Detail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [id, setId] = useState(location?.state?.id);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDetailById(id)
  }, [])

  const getDetailById = async (id) => {
    const response = await MainService.getDetailById(id);
    if (response.ok && response.data) {
      setData(response.data);
      setLoading(false);
    } else {
      setLoading(false)
    }
  }
  return (
    <Fragment>
      <div className="p-4">
        <div className="flex flex-row gap-[16px] w-full">
          <div className="flex flex-row w-80 gap-2">
            <div style={{ padding: "2px 0 0" }}><LeftArrow /></div>
            <div
              style={{ font: "normal normal 700 14px Roboto,sans-serif", color: "#0E86D4", cursor: "pointer" }}
              className="hover:underline"
              onClick={() => navigate(ROUTES.HOME)}
            >
              Back
            </div>
          </div>
        </div>

        <div className="border-4 border-zinc-300 w-full mt-5 h-full bg-white">
          {!loading
            ? (
              <div className="flex flex-col p-4 gap-4">
                {/* Header */}
                <div className="flex flex-col gap-0">
                  <div style={{ font: "normal normal 700 12px Roboto,sans-serif", color: "#666666" }}>
                    {data ? `${data?.type} / ${data?.location}` : ""}
                  </div>
                  <div style={{ font: "normal normal 700 23px Roboto,sans-serif" }}>
                    {data ? data.title : ""}
                  </div>
                </div>

                {/* Body */}
                <div
                  style={{ borderTop: "1px solid #999999"}}
                  className="flex flex-row justify-between gap-4 max-h-[70vh]"
                >
                  <div className="w-[65%] mt-1 overflow-y-auto">
                    <HTMLContent html={data ? data?.description : <></>} />
                  </div>

                  
                  <div className="w-[35%] flex flex-col">
                    <div className="border-4 border-zinc-300 w-full mt-2 flex flex-col rounded-md">
                      <div 
                        className="flex flex-row justify-between p-2 font-bold border-b-zinc-300 border-b-2"
                      >
                        {data ? data?.company : "-"}
                        <div className="bg-[#d4d4d8] pl-2 pr-2 rounded-md text-[#0E86D4] cursor-pointer">
                          <Link to={data ? data?.url : "-"} target="_blank" rel="noreferrer noopener">
                            1 other job
                          </Link>
                        </div>
                      </div>
                      <div className="p-2">
                        <img style={{ width: "100%" }}  src={data ? data?.company_logo : defaultImage} alt="" />
                      </div>
                      <div className="pl-2 pr-2 pb-2 hover:underline">
                        <Link to={data ? data?.company_url : "-"} target="_blank" rel="noreferrer noopener">
                          {data?.company_url}
                        </Link>
                      </div>
                    </div>

                    <div className="border-4 border-yellow-100 w-full mt-4 flex flex-col rounded-md">
                      <div className="border-b-yellow-100 border-b-2 p-2 bg-yellow-50 font-bold">
                        How to apply
                      </div>
                      <div className="p-2 bg-yellow-50">
                        <HTMLContent html={data? data?.how_to_apply : <></>} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <Spin margin={8} size="large" />
              </div>
            )}
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    filterData: state.filterData.filterData
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);