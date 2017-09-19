import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { UploadService } from './upload.service';

@Injectable()
export class ApiService {

    public choiceScenicSpotEvent: EventEmitter<any> = new EventEmitter();

    constructor(private http: Http, private upload: UploadService) { }

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
            console.log('loading ... ')
        }

        if (data.file) {
            return this.upload.makeFileRequest(host, bodyObj, data.file, data.fieldname)
                .map(res => JSON.parse(res))
                .filter((res: ResponseInfo) => {
                    console.log(res);
                    //隐藏加载动画
                    console.log('loading close! ')
                    switch (res.State) {
                        case 1:
                        case 2:
                            console.error(res.Msg);
                            break;
                        case 3:
                            console.error(res.Msg);
                            window.open('/', '_top');
                            break;
                    }
                    return true;
                });
        } else {
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.post(
                host,
                body,
                { headers: myHeaders }
            )
                .map(res => res.json() as ResponseInfo)
                .filter((res: ResponseInfo) => {
                    console.log(res);
                    //隐藏加载动画
                    console.log('loading close! ')
                    switch (res.State) {
                        case 1:
                        case 2:
                            console.error(res.Msg);
                            break;
                        case 3:
                            console.error(res.Msg);
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
        public TotalNumber?: number
    ) {
    }
}
export class LoginParam {
    public Phone?: number;
    public Code?: number;
}
export class AlbumListParam {
    public PageIndex: number = 1;
    public PageSize: number = 10;
    private Guid: string = localStorage["GUID"] || "";
    public CType?: string;
    public Name?: string = "";
}
export class EditAlbumParam {
    public Name: string = "";
    private Guid: string = localStorage["GUID"] || "";
    public Introduce: string;
    public Id: number;
    public Price: string;
    public CTypeId: number;
    public RId: number;
    public RType: number;
}
export class AlbumInfoParam {
    private Guid: string = localStorage["GUID"] || "";
    public Id: number;
}
export class SearchAlbumParam {
    public KeyWord: string;
    public CType: number;
}
export class AudioAlbumParam {
    public AlbumId: number;
    private Guid: string = localStorage["GUID"] || "";
    public PageIndex: number;
    public PageSize: number;
}
export class UploadAudioParam {
    public RId: number;
    private Guid: string = localStorage["GUID"] || "";
    public Id: number;
    public Name: string;
    public Lang: number;
    public SId: number;
}
export class ScenicSpotParam {
    private Guid: string = localStorage["GUID"] || "";
    public SId: number;
    public AlbumId: number;
}
export class AddScenicSpotParam {
    public SName: string;
    private Guid: string = localStorage["GUID"] || "";
    public Introduce: string;
    public Id: number;
}