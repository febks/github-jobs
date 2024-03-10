import axios from "axios";
import { message } from "antd";

const api = `https://dev6.dansmultipro.com/api/recruitment/positions`;

export async function getListJobs(page, description, location, full_time) {
  const result = { list: [],  error: undefined, ok: false, status: undefined };
  try {
    const response = await axios.get(api + `.json`, { params: { page, description, location, full_time } });
    if (response.status === 200) {
      result.ok = true;
      result.list = response.data;
      result.status = response.status;
    } else {
      result.ok = false;
    }
  } catch (err) {
    result.error = err.response.data.error;
    result.status = err.response.status;
    message.error({ content: err.response.data.error })
  }
  return result;
}

export async function getDetailById(id) {
  const result = { data: {}, error: undefined, ok: false, status: undefined };
  try {
    const response = await axios.get(api + `/${id}`);
    if (response.status === 200) {
      result.ok = true;
      result.data = response.data;
      result.status = response.status;
    } else {
      result.ok = false;
    }
  } catch (err) {
    result.error = err.response.data.error;
    result.status = err.response.status;
    message.error({ content: err.response.data.error })
  }
  return result;
}