import moment from "moment";
import React, { Fragment } from "react";
import { connect } from "react-redux";

function ListContent({ item, key, onClick }) {
  return (
    <>
      {item !== null && (
        <div key={key} style={{ borderTop: "1px solid #999999" }} className="flex flex-row justify-between pt-3 pb-3">
          <div className="flex flex-col text-start gap-1">
            <div
              style={{ font: "normal normal 700 14px Roboto,sans-serif", color: "#0E86D4", cursor: "pointer" }}
              className="hover:underline"
              onClick={(e) => onClick()}
            >
              {item?.title ? item?.title : "-"}
            </div>
            <div style={{ font: "normal normal 500 12px Roboto,sans-serif", color: "#666666", display: "flex", gap: "5px" }}>
              <div>{item?.company ? item?.company : "-"}</div>
              <div>-</div>
              <div style={{ color: item?.type === "Full Time" && "#008000", fontWeight: "700" }}>{item?.type ? item?.type : "-"}</div>
            </div>
          </div>

          <div className="flex flex-col text-end gap-1">
            <div style={{ font: "normal normal 700 12px Roboto,sans-serif", color: "#666666" }}>
              {item?.location ? item?.location : "-"}
            </div>
            <div style={{ font: "normal normal 400 12px Roboto,sans-serif", color: "#666666" }}>
              {item?.created_at ? moment(item.created_at).fromNow() : "-"}
            </div>
          </div>
        </div>
      )}
    </>
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
)(ListContent);