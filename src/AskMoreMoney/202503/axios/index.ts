export enum MethodsEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type Methods = Uppercase<MethodsEnum> | Lowercase<MethodsEnum>;

export type AxiosConfig = {
  url?: string;
  baseURL?: string;
  method?: Methods;
  data?: any;
  params?: any;
  headers?: any;
  timeout?: number;
  withCredentials?: boolean;
};

const defaultConf = {
  url: '',
  method: MethodsEnum.GET as Methods,
};
type DefaultConf = typeof defaultConf;
type MixDefaultConfig = DefaultConf & Omit<AxiosConfig, keyof DefaultConf>;

class MyAxios {
  defaultConf: MixDefaultConfig;
  constructor(defaultConf: MixDefaultConfig) {
    this.defaultConf = defaultConf;
  }

  request(_config: AxiosConfig) {
    const config = mergeConfig(this.defaultConf, _config);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(config.method, config.url);
      xhr.send(config.data);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
          }
        }
      };
    });
  }
  create(config: AxiosConfig) {
    const mergeConf = { ...this.defaultConf, ...config };
    return new MyAxios(mergeConf);
  }
}

export default new MyAxios(defaultConf);

const mergeConfig = (
  defaultConf: MixDefaultConfig,
  config: AxiosConfig,
): MixDefaultConfig => {
  const mergeConf = { ...defaultConf, ...config };
  const url = mergeConf.url.toLowerCase().includes('http')
    ? mergeConf.url
    : `${mergeConf.baseURL}${mergeConf.url}`;
  return {
    ...mergeConf,
    url,
  };
};
