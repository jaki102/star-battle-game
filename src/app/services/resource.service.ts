import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ResourceType, ResourceItem } from "../types";
import { resolveCrewNumber } from "../helpers/helper";

@Injectable({
  providedIn: "root",
})
export class ResourcesService {
  constructor(private http: HttpClient) {}

  public loadAllResources(resource: string): Observable<ResourceType[]> {
    return this.http
      .get<any>(`https://www.swapi.tech/api/${resource}`)
      .pipe(map((res) => res.results));
  }

  public loadResourceItem(url: string): Observable<ResourceItem> {
    return this.http.get<any>(url).pipe(
      map((res) => ({
        name: res.result.properties.name,
        power:
          +res.result.properties.mass ||
          resolveCrewNumber(res.result.properties.crew) ||
          0,
      }))
    );
  }
}
