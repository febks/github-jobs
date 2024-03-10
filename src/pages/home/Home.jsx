import React, { Fragment, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Input, Button, Spin, Checkbox } from "antd";
import * as MainService from "../../services/MainService";
import { ROUTES } from "../../constant/routesConstant";
import ListContent from '../../components/ListContent';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isFullTime, setIsFullTime] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingScroll, setLoadingScroll] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getListJobs(page, description, location, isFullTime);
  }, [page])

  const getListJobs = async (page, description, location, fullTime) => {
    const response = await MainService.getListJobs(page, description, location, fullTime);
    if (response.ok && response.list) {
      setList(page === 1 && response.status === 200 ? response.list : response.status === 200 && [...list, ...response.list]);
      setLoading(false);
      setLoadingScroll(false);
    } else {
      setList(page === 1 && response.status === 200 ? response.list : response.status === 200 && [...list, ...response.list]);
      setLoading(true);
      setLoadingScroll(false);
    }
  };

  const onClickDetail = (id) => {
    navigate(ROUTES.DETAIL, { state: { id: id } });
  };

  const handlePagination = async () => {
    setPage(page + 1);
    setLoadingScroll(true);
  }

  const handleChangeSearch = (evt, namespace) => {
    const value = evt.target.value;
    if (namespace === "description") {
      setDescription(value);
    } else if (namespace === "location") {
      setLocation(value);
    } else {
      setIsFullTime(!isFullTime);
    }
  }

  const handleSearch = async () => {
    if (description || location || isFullTime) {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
    setLoading(true);
    setPage(1);
    await getListJobs(page, description, location, isFullTime);
  }

  const isDataValid = list && list?.some((item) => item === null);
  const validList = list && list?.filter((item) => item !== null);

  return (
    <Fragment>
      <div className="p-4">
        {/* Header */}
        <div className="flex flex-row gap-[16px] w-full">
          <div className="flex flex-col w-80">
            <div style={{ font: "normal normal 700 14px Roboto,sans-serif" }}>Job Description</div>
            <div>
              <Input
                placeholder='Filter by title, benefits, companies, expertise'
                value={description}
                onChange={(e, namespace) => handleChangeSearch(e, "description")}
              />
            </div>
          </div>

          <div className="flex flex-col w-80">
            <div style={{ font: "normal normal 700 14px Roboto,sans-serif" }}>Location</div>
            <div>
              <Input
                placeholder='Filter by city, state, zip, or country'
                value={location}
                onChange={(e, namespace) => handleChangeSearch(e, "location")}
              />
            </div>
          </div>

          <div className="w-30 pt-5">
            <Checkbox
                value={isFullTime}
                checked={isFullTime}
                onChange={(e, namespace) => handleChangeSearch(e, "isFullTime")}
            >
              <div style={{ font: "normal normal 700 14px Roboto,sans-serif" }}>Full Time Only</div>
            </Checkbox>
          </div>

          <div className="pt-4 w-40">
            <Button
              style={{
                color: "#FFFFFF",
                background: "#999999",
                fontWeight: "500",
                lineHeight: "21px",
                fontSize: "14px",
                padding: "0 21px"
              }}
              onClick={() => handleSearch()}
            >
              Search
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="border-4 border-zinc-300 w-full mt-5 h-full bg-white flex flex-col p-4 gap-4">
          <div style={{ font: "normal normal 700 23px Roboto,sans-serif" }}>
            {
              isSearch && validList.length !== 0
                ? `Showing ${validList.length} Jobs`
                : isSearch && validList.length === 0
                  ? "No Jobs Found"
                  : "Job List"
            }
          </div>
          <div className="max-h-[70vh] overflow-y-auto">
            {
              !loading
                ? list.map((item, index) => (
                  <ListContent key={index} item={item} onClick={(e) => onClickDetail(item?.id)} />
                ))
                : <Spin size="large" margin={8} />
            }
          </div>
          <div>
            {loadingScroll ? (
              <div style={{ paddingLeft: "50%" }}>
                <Spin size="medium" margin={8} />
              </div>
            ) : !isDataValid && (
              <Button
                style={{
                  width: "100%",
                  background: "#0E86D4",
                  color: "#FFFFFF"
                }}
                onClick={() => handlePagination()}
              >
                More Jobs
              </Button>
            )}
          </div>
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
)(Home);