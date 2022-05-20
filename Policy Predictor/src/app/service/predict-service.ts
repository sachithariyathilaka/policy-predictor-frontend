import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PredictService {

  constructor(private http: HttpClient) {}

  predictData() {
    // @ts-ignore
    return this.http.get<>('http://127.0.0.1:5000/predict');
  }
}
