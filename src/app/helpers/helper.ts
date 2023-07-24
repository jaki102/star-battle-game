import { Observable, filter } from "rxjs";

export function filterBoolean() {
  return <T>(source: Observable<T>) => source.pipe(filter((value) => !!value));
}

export function resolveCrewNumber(amount: string): number {
  const crewArray = amount.split("-");
  const crewAmount = crewArray.length > 1 ? crewArray[1] : crewArray[0];
  return +crewAmount.replace(",", "");
}
