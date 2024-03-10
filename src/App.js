import React, { Fragment } from "react";
import { connect } from 'react-redux';
import Home from "./pages/home/Home";
import { ROUTES } from "./constant/routesConstant";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import Headbar from "./components/Headbar";
import Detail from "./pages/detail/Detail";

function App() {
  return (
    <Fragment>
      <Layout>
        <Headbar />
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} exact />
          <Route path={ROUTES.DETAIL} element={<Detail />} exact />
        </Routes>
      </Layout>
    </Fragment>
  );
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
)(App);