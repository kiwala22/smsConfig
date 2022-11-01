import React, { createContext, FC, ReactNode, useContext } from "react";
import PropTypes from "prop-types";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IHashMapGeneric } from '../types/IHashMapGeneric';
import { notification } from 'antd';

type IReqVars = IHashMapGeneric<any>

class HttpReq {
  private axios: AxiosInstance;
  
  constructor(baseUrl?: string) {
    this.axios = axios.create({
      baseURL: baseUrl,
      headers: this.headers
    });
  }

  get headers() {
    const csrfToken = document.querySelector('meta[name=csrf-token]');
    const csrfTokenContent = csrfToken?.getAttribute('content')
    return { "X-CSRF-TOKEN": csrfTokenContent }
  }

  get(endpoint: string, variables?: IReqVars) {
    return this.formatReq(this.axios.get(endpoint, {
      params: variables,
    }));
  }

  post(endpoint: string, variables?: IReqVars) {
    return this.formatReq(this.axios.post(endpoint, variables));
  }

  put(endpoint: string, variables?: IReqVars) {
    return this.formatReq(this.axios.put(endpoint, variables));
  }

  patch(endpoint: string, variables?: IReqVars) {
    return this.formatReq(this.axios.patch(endpoint, variables));
  }

  delete(endpoint: string, variables?: IReqVars) {
    return this.formatReq(this.axios.delete(endpoint, {
      params: variables,
    }));
  }

  private formatReq(req: Promise<AxiosResponse>) {
    return req.then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error) => {
      return new Promise(function (_, reject) {
        const msg = error.response ? error.response.data.message : error.message;
        notification.error({ message: msg });
        reject(new Error(msg));
      });
    });
  }
}

const httpReq = new HttpReq();
const ApiContext = createContext<HttpReq>(httpReq);

type ProviderProps = {
  children: ReactNode;
}

const Provider: FC<ProviderProps> = (props) => {
  return (
    <ApiContext.Provider 
      value={httpReq}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useHttpRequest = () => useContext(ApiContext);
export const ApiProvider = Provider;