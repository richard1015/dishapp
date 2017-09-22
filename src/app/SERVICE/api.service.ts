import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { UploadService } from './upload.service';
import { LocalStorage } from './local.storage';
declare var layer: any;
@Injectable()
export class ApiService {

    public choiceScenicSpotEvent: EventEmitter<any> = new EventEmitter();

    constructor(private http: Http, private upload: UploadService, private ls: LocalStorage) { }

    private post(data: ParamData): Observable<ResponseInfo> {
        let host = "/serverDianDian";
        let bodyObj = {
            cmd: data.cmd,
            param: JSON.stringify(data.param)
        };
        let body = `cmd=${data.cmd}&param=${JSON.stringify(data.param)}`;
        console.log("send infomation : " + body);

        if (data.loadingState) {
            //加载动画
            layer.load();
        }

        if (data.file) {
            return this.upload.makeFileRequest(host, bodyObj, data.file, data.fieldname)
                .map(res => JSON.parse(res))
                .filter((res: ResponseInfo) => {
                    console.log(res);
                    //隐藏加载动画
                    layer.closeAll('loading');
                    switch (res.State) {
                        case 1:
                        case 2:
                            console.error(res.Msg);
                            layer.msg(res.Msg);
                            break;
                        case 3:
                            console.error(res.Msg);
                            layer.alert(res.Msg, { icon: 2 });
                            window.open('/', '_top');
                            break;
                    }
                    return true;
                });
        } else {
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
            myHeaders.append('guid', this.ls.getObject("USERINFO").Guid);
            return this.http.post(
                host,
                body,
                { headers: myHeaders }
            )
                .map(res => res.json() as ResponseInfo)
                .filter((res: ResponseInfo) => {
                    console.log(res);
                    //隐藏加载动画
                    layer.closeAll('loading');
                    switch (res.State) {
                        case 1:
                        case 2:
                            console.error(res.Msg);
                            layer.msg(res.Msg);
                            break;
                        case 3:
                            console.error(res.Msg);
                            layer.alert(res.Msg, { icon: 2 });
                            window.open('/', '_top');
                            break;
                    }
                    return true;
                });
        }
    }

    //对外
    Post(param: any, cmd: string) {
        return this.post(new ParamData(cmd, param));
    }
}
export class ParamData {
    /**
     *
     */
    constructor(
        public cmd: string,
        public param: any,
        public file?: File[],
        public fieldname: string = "default",
        public errorMsg?: boolean,
        public loadingState?: boolean
    ) {
        this.errorMsg = true;
        this.loadingState = true;
    }
}
export class ResponseInfo {
    /**
    *
    */
    constructor(
        public State?: number,
        public Msg?: string,
        public Value?: any,
        public TotalNumber?: number,
        public TotalString?: any
    ) {
    }
}